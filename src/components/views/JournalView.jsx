import React, { useState } from 'react';
import { BookOpen, Lock, Sparkles, Search, Tag, Plus, CheckCircle, Trash2, ShieldCheck } from 'lucide-react';

export default function JournalView({ entries, onAddEntry }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Gratitude');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePrompt, setActivePrompt] = useState('What made you smile or feel deeply peaceful today?');
  const [toastMessage, setToastMessage] = useState(false);

  const prompts = [
    'What made you smile or feel deeply peaceful today?',
    'What is one heavy thought you can safely let go of right now?',
    'What are 3 small things you are genuinely grateful for today?',
    'Describe a moment today where you felt proud of your emotional growth.',
    'If your anxiety could speak, what gentle reassurance would you offer it?'
  ];

  const handleRandomPrompt = () => {
    const nextPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setActivePrompt(nextPrompt);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newEntry = {
      id: Date.now(),
      title,
      content,
      category,
      promptUsed: activePrompt,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: `${Math.ceil(content.split(' ').length / 100)} min read`
    };

    onAddEntry(newEntry);
    setTitle('');
    setContent('');
    setToastMessage(true);
    setTimeout(() => setToastMessage(false), 3000);
  };

  const filteredEntries = entries.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-mindful-purple text-xs font-bold border border-purple-100">
          <ShieldCheck className="w-4 h-4 text-mindful-purple" />
          <span>Encrypted Private Vault</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-mindful-textDark">
          Mindful Reflection Journal
        </h1>
        <p className="text-sm text-mindful-textMuted leading-relaxed">
          Express your thoughts freely in a safe, confidential digital space designed for personal growth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Write Entry Column */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-6">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-mindful-textDark flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-mindful-purple" />
              New Journal Entry
            </h2>

            <button
              onClick={handleRandomPrompt}
              className="px-3.5 py-1.5 rounded-full bg-mindful-purple-subtle/60 text-mindful-purple text-xs font-bold hover:bg-mindful-purple-subtle transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              New Prompt
            </button>
          </div>

          {/* Prompt Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-mindful-purple">Journaling Prompt</span>
            <p className="text-xs font-semibold text-mindful-textDark italic">
              "{activePrompt}"
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-mindful-textMuted mb-1">Entry Title</label>
              <input
                type="text"
                required
                placeholder="Give your thoughts a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-mindful-bg text-sm text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-mindful-textMuted mb-1">Category / Tag</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-mindful-bg text-xs text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple"
                >
                  <option value="Gratitude">Gratitude</option>
                  <option value="Self-Growth">Self-Growth</option>
                  <option value="Anxiety Release">Anxiety Release</option>
                  <option value="Daily Wins">Daily Wins</option>
                  <option value="Therapy Reflections">Therapy Reflections</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-mindful-textMuted mb-1">Reflection Content</label>
              <textarea
                required
                rows={8}
                placeholder="Write your thoughts here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 bg-mindful-bg text-sm text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple resize-none leading-relaxed"
              ></textarea>
            </div>

            <div className="flex items-center justify-between pt-2">
              {toastMessage ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle className="w-4 h-4" />
                  Journal entry saved securely!
                </span>
              ) : (
                <span className="text-xs text-mindful-textMuted flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Private to your account
                </span>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Save Reflection
              </button>
            </div>
          </form>

        </div>

        {/* Past Entries List Column */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-mindful-textDark">Past Journal Reflections</h2>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-mindful-textMuted absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-mindful-bg text-xs text-mindful-textDark rounded-full border border-gray-200 focus:outline-none focus:border-mindful-purple"
              />
            </div>
          </div>

          <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
            {filteredEntries.length === 0 ? (
              <p className="text-xs text-mindful-textMuted text-center py-8">No journal entries found.</p>
            ) : (
              filteredEntries.map((entry) => (
                <div key={entry.id} className="p-5 rounded-2xl bg-mindful-bg border border-gray-100 space-y-2 hover:border-mindful-purple-subtle transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-mindful-purple uppercase tracking-wider bg-purple-100 px-2.5 py-0.5 rounded-md">
                      {entry.category}
                    </span>
                    <span className="text-[10px] text-mindful-textMuted font-medium">{entry.date}</span>
                  </div>

                  <h3 className="text-sm font-bold text-mindful-textDark">{entry.title}</h3>
                  <p className="text-xs text-mindful-textMuted line-clamp-3 leading-relaxed">
                    {entry.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
