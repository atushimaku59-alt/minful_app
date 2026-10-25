import React, { useState } from 'react';
import { User, Shield, Bell, Lock, Heart, Calendar, Settings, Sparkles, CheckCircle2, PhoneCall } from 'lucide-react';

export default function ProfileView({ currentUser, bookings = [] }) {
  const [profile, setProfile] = useState({
    name: currentUser ? currentUser.name : 'Alex Rivera',
    email: currentUser ? currentUser.email : 'alex@mindful.org',
    emergencyContact: '+1 (555) 234-5678 (Dr. Marcus)',
    notificationsEnabled: true,
    highQuality3D: true,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-10 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-mindful-purple text-xs font-bold border border-purple-100">
          <User className="w-4 h-4 text-mindful-purple" />
          <span>User Profile & Security Settings</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-mindful-textDark">
          Account Profile & Preferences
        </h1>
        <p className="text-sm text-mindful-textMuted leading-relaxed">
          Manage your personal details, emergency crisis contacts, 3D graphics rendering, and session history.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Personal Information & Settings */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-6">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-mindful-purple to-mindful-peach text-white flex items-center justify-center font-bold text-2xl shadow-soft">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-mindful-textDark">{profile.name}</h2>
              <p className="text-xs text-mindful-textMuted">{profile.email}</p>
              <span className="inline-block mt-1 text-[10px] font-bold text-mindful-purple bg-purple-50 px-2.5 py-0.5 rounded-md">
                Verified Mindful Member
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-mindful-textDark mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-mindful-bg text-xs text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-mindful-textDark mb-1">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-mindful-bg text-xs text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-mindful-textDark mb-1">Emergency Crisis Contact</label>
              <div className="relative">
                <PhoneCall className="w-4 h-4 text-mindful-coral absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={profile.emergencyContact}
                  onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-mindful-bg text-xs text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-2 space-y-3 border-t border-gray-100">
              <label className="flex items-center justify-between p-3 rounded-2xl bg-mindful-bg border border-gray-100 cursor-pointer">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-mindful-textDark">High-Quality 3D Graphics</span>
                  <p className="text-[10px] text-mindful-textMuted">Enable real-time Three.js particle brain mesh</p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.highQuality3D}
                  onChange={(e) => setProfile({ ...profile, highQuality3D: e.target.checked })}
                  className="w-4 h-4 text-mindful-purple rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-mindful-bg border border-gray-100 cursor-pointer">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-mindful-textDark">Therapy Session Reminders</span>
                  <p className="text-[10px] text-mindful-textMuted">Receive SMS / Email notifications before appointments</p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.notificationsEnabled}
                  onChange={(e) => setProfile({ ...profile, notificationsEnabled: e.target.checked })}
                  className="w-4 h-4 text-mindful-purple rounded"
                />
              </label>
            </div>

            <div className="flex items-center justify-between pt-2">
              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  Profile changes saved!
                </span>
              )}
              <button
                type="submit"
                className="ml-auto px-6 py-2.5 rounded-full bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Session History & Saved Therapists */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Past Sessions History */}
          <div className="p-7 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-4">
            <h3 className="text-base font-bold text-mindful-textDark flex items-center gap-2">
              <Calendar className="w-4 h-4 text-mindful-purple" />
              Appointment & Session History
            </h3>

            <div className="space-y-3">
              {[
                { therapist: 'Dr. Sarah Ahmed', date: 'Aug 20, 2026', time: '04:00 PM', type: 'Video Call', status: 'Completed' },
                { therapist: 'Dr. Nusrat Jehan', date: 'Aug 12, 2026', time: '11:00 AM', type: 'Voice Call', status: 'Completed' },
              ].map((sess, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-mindful-bg border border-gray-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-mindful-textDark">{sess.therapist}</strong>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">
                      {sess.status}
                    </span>
                  </div>
                  <p className="text-mindful-textMuted">{sess.date} • {sess.time} ({sess.type})</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Crisis Resources Card */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 space-y-3">
            <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
              <Shield className="w-5 h-5" />
              <span>Immediate 24/7 Crisis Support</span>
            </div>
            <p className="text-xs text-mindful-textDark leading-relaxed">
              If you or someone you know is experiencing a mental health emergency, please reach out to national helplines immediately:
            </p>
            <div className="p-3 rounded-2xl bg-white text-xs font-bold text-red-600 space-y-1 shadow-xs border border-red-100">
              <p>📞 National Suicide & Crisis Lifeline: Call or Text 988</p>
              <p>💬 Crisis Text Line: Text HOME to 741741</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
