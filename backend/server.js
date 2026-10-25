const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

const JWT_SECRET =
  process.env.JWT_SECRET || 'mindful_dev_secret_change_before_deploy';

const User = require('./models/User');

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mindfulDB')
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(error =>
    console.error('MongoDB connection error:', error.message)
  );

// Health check
app.get('/api/test', (req, res) => {
  res.json({ message: 'Mindful backend connected!' });
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        specialty: user.specialty || null
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      message: 'Login failed'
    });
  }
});

// Registration: public users cannot choose admin role
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role, specialty } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: 'An account already exists with this email'
      });
    }

    const safeRole = role === 'therapist' ? 'therapist' : 'patient';
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: safeRole,
      specialty: safeRole === 'therapist' ? specialty : null
    });

    return res.status(201).json({
      message: 'Account created successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      message: 'Registration failed'
    });
  }
});

// Admin authentication
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Please log in as admin'
    });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({
        message: 'Admin access only'
      });
    }

    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token. Please log in again.'
    });
  }
}

// Admin dashboard statistics
app.get('/api/admin/stats', verifyAdmin, async (req, res) => {
  try {
    const [totalUsers, patients, therapists, admins] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: 'patient' }),
        User.countDocuments({ role: 'therapist' }),
        User.countDocuments({ role: 'admin' })
      ]);

    return res.json({
      totalUsers,
      patients,
      therapists,
      admins,
      // Compatibility fields for dashboard versions
      totalPatients: patients,
      totalTherapists: therapists,
      totalAdmins: admins
    });
  } catch (error) {
    console.error('Admin statistics error:', error);
    return res.status(500).json({
      message: 'Failed to load statistics'
    });
  }
});

// Registered users
app.get('/api/admin/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    return res.json(users);
  } catch (error) {
    console.error('Fetch users error:', error);
    return res.status(500).json({
      message: 'Failed to fetch users'
    });
  }
});

// Unknown API routes return a clear 404 response
app.use('/api', (req, res) => {
  return res.status(404).json({
    message: `API route not found: ${req.method} ${req.originalUrl}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Mindful backend running at http://127.0.0.1:${PORT}`);
});