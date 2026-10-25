import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Video, 
  Flame, 
  Smile, 
  BookOpen, 
  Clock, 
  CheckSquare, 
  ArrowRight, 
  TrendingUp,
  UserCheck
} from 'lucide-react';

export default function DashboardView({ currentUser, onNavigate, loggedMoods = [] }) {
  const weeklyMoodData = [
    { day: 'Mon', score: 3.5, label: 'Okay', height: '60%', color: 'bg-amber-400' },
    { day: 'Tue', score: 4.0, label: 'Good', height: '75%', color: 'bg-mindful-purple-light' },
    { day: 'Wed', score: 4.5, label: 'Great', height: '90%', color: 'bg-mindful-purple' },
    { day: 'Thu', score: 3.8, label: 'Good', height: '70%', color: 'bg-mindful-purple-light' },
    { day: 'Fri', score: 4.8, label: 'Great', height: '95%', color: 'bg-mindful-purple' },
    { day: 'Sat', score: 4.2, label: 'Good', height: '82%', color: 'bg-mindful-purple-light' },
    { day: 'Sun', score: 4.6, label: 'Great', height: '88%', color: 'bg-mindful-purple' },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-mindful-purple via-mindful-purple-light to-mindful-peach text-white shadow-floating flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalized Wellness Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {currentUser ? currentUser.name : 'Alex'}! 🌿
          </h1>
          <p className="text-sm text-white/90 max-w-xl">
            You're doing great. Your mental wellness streak is strong at <strong>7 days</strong>. Keep nurturing your mind today!
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => onNavigate('mood')}
            className="px-5 py-3 rounded-full bg-white text-mindful-purple text-xs font-bold shadow-md hover:bg-mindful-bg transition-all"
          >
            Log Today's Mood
          </button>
          <button
            onClick={() => onNavigate('booking')}
            className="px-5 py-3 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold hover:bg-white/30 transition-all border border-white/40"
          >
            Book Therapy
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Current Streak', val: '7 Days', sub: 'Personal Record', icon: Flame, color: 'text-orange-500 bg-orange-50' },
          { label: 'Weekly Mood Avg', val: '4.3 / 5', sub: '+12% from last week', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-50' },
          { label: 'Upcoming Sessions', val: '1 Today', sub: 'With Dr. Sarah Ahmed', icon: Calendar, color: 'text-mindful-purple bg-purple-50' },
          { label: 'Journal Reflections', val: '14 Logged', sub: '3 this week', icon: BookOpen, color: 'text-indigo-500 bg-indigo-50' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-mindful-textMuted">{stat.label}</span>
              <div className={`w-9 h-9 rounded-2xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-mindful-textDark">{stat.val}</p>
              <p className="text-[11px] font-medium text-mindful-textMuted mt-0.5">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Mood Graph & Upcoming Session */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Weekly Mood Analytics Graph */}
        <div className="lg:col-span-8 p-8 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-mindful-textDark">Weekly Mood Trend</h2>
              <p className="text-xs text-mindful-textMuted">Visualization of your daily emotion logs</p>
            </div>
            <button
              onClick={() => onNavigate('mood')}
              className="text-xs font-bold text-mindful-purple hover:underline flex items-center gap-1"
            >
              Full Analytics
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 pt-6 flex items-end justify-between gap-3 border-b border-gray-100 pb-4">
            {weeklyMoodData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-[10px] font-bold text-mindful-purple opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.score}
                </div>
                <div className="w-full bg-mindful-bg rounded-t-xl overflow-hidden h-36 flex items-end p-1">
                  <div
                    className={`w-full rounded-t-lg ${item.color} group-hover:brightness-110 transition-all`}
                    style={{ height: item.height }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-mindful-textDark">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-mindful-textMuted">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-mindful-purple"></span>
              Peak Happiness on Friday (4.8)
            </span>
            <span>Target: Maintain &gt; 4.0 Avg</span>
          </div>
        </div>

        {/* Upcoming Session Card */}
        <div className="lg:col-span-4 p-7 rounded-3xl bg-gradient-to-br from-[#F5EFFB] to-[#FAF8F5] border border-white shadow-soft flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-mindful-purple bg-white px-3 py-1 rounded-full shadow-xs">
                Next Appointment
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                In 2 Hours
              </span>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=160"
                alt="Dr. Sarah Ahmed"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-mindful-purple-subtle"
              />
              <div>
                <h3 className="text-sm font-bold text-mindful-textDark">Dr. Sarah Ahmed</h3>
                <p className="text-xs text-mindful-textMuted">Clinical Psychologist</p>
                <div className="flex items-center gap-2 text-[11px] text-mindful-purple font-semibold mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Today • 4:00 PM (45 min)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => alert("Launching Secure Telehealth Video Room...")}
              className="w-full py-3 rounded-2xl bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" />
              Join Video Room
            </button>
            
            <button
              onClick={() => onNavigate('booking')}
              className="w-full py-2.5 rounded-2xl bg-white text-mindful-textMuted hover:text-mindful-textDark text-xs font-bold transition-colors"
            >
              Reschedule Appointment
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Checklist & Quick Journal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Daily Goals Checklist */}
        <div className="p-7 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-4">
          <h3 className="text-lg font-bold text-mindful-textDark flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-mindful-purple" />
            Daily Self-Care Goals
          </h3>
          <div className="space-y-2.5">
            {[
              { label: 'Morning Meditation (10 mins)', done: true },
              { label: 'Log Mood in Mindful App', done: true },
              { label: 'Drink 2 Liters of Water', done: false },
              { label: 'Evening Gratitude Journaling', done: false },
            ].map((goal, idx) => (
              <label key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-mindful-bg border border-gray-100 cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  defaultChecked={goal.done}
                  className="w-4 h-4 text-mindful-purple rounded focus:ring-mindful-purple"
                />
                <span className={`text-xs font-semibold ${goal.done ? 'line-through text-gray-400' : 'text-mindful-textDark'}`}>
                  {goal.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Quick Reflection Prompt */}
        <div className="p-7 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-mindful-textDark flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-mindful-peach" />
              Quick Journal Thought
            </h3>
            <p className="text-xs text-mindful-textMuted">"What made you feel proud of yourself today?"</p>
          </div>

          <textarea
            placeholder="Write a quick reflection..."
            className="w-full p-3 rounded-2xl bg-mindful-bg border border-gray-200 text-xs text-mindful-textDark focus:outline-none focus:border-mindful-purple resize-none h-24"
          ></textarea>

          <button
            onClick={() => onNavigate('journal')}
            className="self-end px-5 py-2.5 rounded-full bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all"
          >
            Save to Journal
          </button>
        </div>

      </div>

    </div>
  );
}
