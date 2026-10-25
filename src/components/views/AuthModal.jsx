import React, { useState } from 'react';
import { X, Brain, Lock, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialty: 'Clinical Psychologist',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (mode === 'login') {
      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          alert("Login Successful!");
          localStorage.setItem('token', data.token);
localStorage.setItem('user', JSON.stringify(data.user));

onAuthSuccess({
  name: data.user.name,
  email: data.user.email,
  role: data.user.role,
  specialty: data.user.specialty || null,
});
          onClose();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
        alert("Server connection failed. Is the backend running?");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      try {
        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: role,
            specialty: role === 'therapist' ? formData.specialty : null,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Account created successfully!");
          setMode('login');
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
        alert("Server connection failed. Is the backend running?");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mindful-textDark/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-white shadow-floating overflow-hidden relative">
        <div className="p-6 bg-gradient-to-r from-mindful-purple to-mindful-purple-light text-white relative">
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">
                {mode === 'login' ? 'Welcome Back to Mindful' : 'Create Your Mindful Account'}
              </h2>
              <p className="text-xs text-white/80">
                {mode === 'login' ? 'Access your confidential wellness space.' : 'Start your journey to better mental well-being.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex border-b border-gray-100 bg-mindful-bg px-6 pt-3">
          <button onClick={() => setMode('login')} className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-all ${mode === 'login' ? 'border-mindful-purple text-mindful-purple bg-white rounded-t-2xl shadow-xs' : 'border-transparent text-mindful-textMuted hover:text-mindful-purple'}`}>
            Log In
          </button>
          <button onClick={() => setMode('register')} className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-all ${mode === 'register' ? 'border-mindful-purple text-mindful-purple bg-white rounded-t-2xl shadow-xs' : 'border-transparent text-mindful-textMuted hover:text-mindful-purple'}`}>
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-1 rounded-2xl bg-mindful-bg border border-gray-200/60 flex text-xs font-bold">
            <button type="button" onClick={() => setRole('patient')} className={`flex-1 py-2 rounded-xl transition-all ${role === 'patient' ? 'bg-white text-mindful-purple shadow-xs' : 'text-mindful-textMuted hover:text-mindful-textDark'}`}>
              Member / Patient
            </button>
            <button type="button" onClick={() => setRole('therapist')} className={`flex-1 py-2 rounded-xl transition-all ${role === 'therapist' ? 'bg-white text-mindful-purple shadow-xs' : 'text-mindful-textMuted hover:text-mindful-textDark'}`}>
              Licensed Therapist
            </button>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-mindful-textDark mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-mindful-textMuted absolute left-3.5 top-3" />
                <input type="text" required placeholder="e.g. Alex Rivera" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-10 pr-4 py-2.5 bg-mindful-bg text-sm text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-mindful-textDark mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-mindful-textMuted absolute left-3.5 top-3" />
              <input type="email" required placeholder="name@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-10 pr-4 py-2.5 bg-mindful-bg text-sm text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-mindful-textDark mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-mindful-textMuted absolute left-3.5 top-3" />
              <input type="password" required placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full pl-10 pr-4 py-2.5 bg-mindful-bg text-sm text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple" />
            </div>
          </div>

          {mode === 'register' && role === 'therapist' && (
            <div>
              <label className="block text-xs font-bold text-mindful-textDark mb-1">Clinical Specialization</label>
              <select value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="w-full px-4 py-2.5 bg-mindful-bg text-sm text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple">
                <option value="Clinical Psychologist">Clinical Psychologist</option>
                <option value="Counseling Psychologist">Counseling Psychologist</option>
                <option value="Cognitive Behavioral Therapist">Cognitive Behavioral Therapist (CBT)</option>
                <option value="Psychiatrist">Psychiatrist</option>
              </select>
            </div>
          )}

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-purple-50 text-[11px] text-mindful-purple font-medium border border-purple-100">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>100% Confidential & HIPAA-compliant encryption standards.</span>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-2xl bg-mindful-purple text-white text-sm font-bold shadow-soft hover:bg-mindful-purple-dark transition-all flex items-center justify-center gap-2">
            {isSubmitting ? <span>Processing...</span> : <><span >{mode === 'login' ? 'Log In' : 'Create Account'}</span><ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}