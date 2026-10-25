import React, { useState } from 'react';
import { Smile, Calendar, CheckCircle2, Tag, Plus, TrendingUp, Sparkles } from 'lucide-react';
import MoodSphere3D from '../3d/MoodSphere3D';

export default function MoodTrackerView({ loggedMoods, onAddMood }) {
  const [currentMood, setCurrentMood] = useState('good');
  const [selectedEmotions, setSelectedEmotions] = useState(['Calm', 'Inspired']);
  const [selectedActivities, setSelectedActivities] = useState(['Meditation', 'Work']);
  const [notes, setNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const moods = [
    { id: 'very-bad', label: 'Very Bad', emoji: '😡', color: 'bg-red-500 text-white' },
    { id: 'bad', label: 'Bad', emoji: '🙁', color: 'bg-orange-500 text-white' },
    { id: 'okay', label: 'Okay', emoji: '😐', color: 'bg-amber-400 text-white' },
    { id: 'good', label: 'Good', emoji: '🙂', color: 'bg-mindful-purple-light text-white' },
    { id: 'great', label: 'Great', emoji: '😄', color: 'bg-mindful-purple text-white' },
  ];

  const emotionList = ['Calm', 'Anxious', 'Inspired', 'Tired', 'Grateful', 'Overwhelmed', 'Hopeful', 'Stressed'];
  const activityList = ['Work', 'Exercise', 'Meditation', 'Socializing', 'Reading', 'Family', 'Nature Walk'];

  const toggleTag = (list, setList, tag) => {
    if (list.includes(tag)) {
      setList(list.filter((item) => item !== tag));
    } else {
      setList([...list, tag]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      mood: currentMood,
      emotions: selectedEmotions,
      activities: selectedActivities,
      notes,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    onAddMood(entry);
    setSavedSuccess(true);
    setNotes('');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-10 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-mindful-purple text-xs font-bold border border-purple-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3D Emotion Analytics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-mindful-textDark">
          3D Mood Tracker & Aura Visualizer
        </h1>
        <p className="text-sm text-mindful-textMuted leading-relaxed">
          Log your emotional state, explore your 3D aura mesh, and track patterns to build healthier mindfulness habits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: 3D Aura Sphere & Controls */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-6">
          <h2 className="text-xl font-bold text-mindful-textDark">1. Select Your Current Emotion</h2>

          {/* 3D Sphere Renderer */}
          <MoodSphere3D currentMood={currentMood} />

          {/* Mood Buttons Selector */}
          <div className="grid grid-cols-5 gap-2 pt-2">
            {moods.map((m) => {
              const isSelected = currentMood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setCurrentMood(m.id)}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    isSelected
                      ? `${m.color} border-transparent scale-105 shadow-md`
                      : 'bg-mindful-bg border-gray-100 hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="text-[11px] font-bold">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Tags, Notes & Log Form */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-6">
          <h2 className="text-xl font-bold text-mindful-textDark">2. Add Context & Tags</h2>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Emotion Chips */}
            <div>
              <label className="block text-xs font-bold text-mindful-textMuted uppercase tracking-wider mb-2">
                What emotions are you feeling?
              </label>
              <div className="flex flex-wrap gap-2">
                {emotionList.map((tag) => {
                  const active = selectedEmotions.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleTag(selectedEmotions, setSelectedEmotions, tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        active
                          ? 'bg-mindful-purple text-white shadow-xs'
                          : 'bg-mindful-bg text-mindful-textMuted hover:bg-mindful-purple-subtle/50'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Activity Chips */}
            <div>
              <label className="block text-xs font-bold text-mindful-textMuted uppercase tracking-wider mb-2">
                What activities influenced your mood?
              </label>
              <div className="flex flex-wrap gap-2">
                {activityList.map((act) => {
                  const active = selectedActivities.includes(act);
                  return (
                    <button
                      type="button"
                      key={act}
                      onClick={() => toggleTag(selectedActivities, setSelectedActivities, act)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        active
                          ? 'bg-mindful-peach text-white shadow-xs'
                          : 'bg-mindful-bg text-mindful-textMuted hover:bg-orange-50'
                      }`}
                    >
                      {act}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reflections Textarea */}
            <div>
              <label className="block text-xs font-bold text-mindful-textMuted uppercase tracking-wider mb-2">
                Personal Reflection / Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What contributed to your mood today? Express your thoughts freely..."
                className="w-full p-4 rounded-2xl bg-mindful-bg border border-gray-200 text-sm text-mindful-textDark focus:outline-none focus:border-mindful-purple h-28 resize-none"
              ></textarea>
            </div>

            <div className="flex items-center justify-between pt-2">
              {savedSuccess ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  Logged successfully into your timeline!
                </span>
              ) : (
                <span className="text-xs text-mindful-textMuted">Confidential entry</span>
              )}

              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all transform hover:scale-[1.02]"
              >
                Log Mood Entry
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* History Log Timeline */}
      <div className="p-8 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-6">
        <h3 className="text-xl font-bold text-mindful-textDark flex items-center gap-2">
          <Calendar className="w-5 h-5 text-mindful-purple" />
          Recent Mood Log History
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loggedMoods.map((log) => (
            <div key={log.id} className="p-5 rounded-2xl bg-mindful-bg border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-mindful-purple uppercase tracking-wider">
                  {log.date} • {log.timestamp}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-mindful-textDark shadow-xs capitalize">
                  {log.mood}
                </span>
              </div>

              {log.notes && (
                <p className="text-xs text-mindful-textDark font-medium italic bg-white/70 p-3 rounded-xl border border-white">
                  "{log.notes}"
                </p>
              )}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {log.emotions?.map((e, idx) => (
                  <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-mindful-purple">
                    {e}
                  </span>
                ))}
                {log.activities?.map((a, idx) => (
                  <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-100 text-mindful-peach">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
