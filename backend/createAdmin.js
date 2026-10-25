const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mindfulDB');

    const email = 'admin@mindful.com';
    const password = 'MindfulAdmin2026!';

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('Admin role updated successfully!');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name: 'Mindful Admin',
        email,
        password: hashedPassword,
        role: 'admin',
        specialty: null
      });

      console.log('Admin account created successfully!');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();