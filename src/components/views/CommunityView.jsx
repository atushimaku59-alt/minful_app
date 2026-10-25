import React, { useState } from 'react';
import { Users, MessageSquare, ThumbsUp, Plus, Shield, Sparkles, Filter, X, Send } from 'lucide-react';

export default function CommunityView({ posts, onAddPost, onUpvotePost }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Anxiety & Stress');
  const [newContent, setNewContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const categories = ['All', 'Anxiety & Stress', 'Self-Care & Growth', 'Work-Life Balance', 'Depression Support', 'Daily Wins'];

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const post = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      content: newContent,
      author: isAnonymous ? 'Anonymous Mindful Member' : 'Alex Rivera',
      authorAvatar: isAnonymous
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      upvotes: 1,
      repliesCount: 0,
      time: 'Just now',
      replies: []
    };

    onAddPost(post);
    setShowNewPostModal(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="space-y-10 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-mindful-purple text-xs font-bold border border-purple-100">
          <Users className="w-4 h-4 text-mindful-purple" />
          <span>Safe Peer Community</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-mindful-textDark">
          Community Forum & Support Groups
        </h1>
        <p className="text-sm text-mindful-textMuted leading-relaxed">
          Share your journey, ask questions anonymously, and receive encouragement from a compassionate peer network.
        </p>
      </div>

      {/* Filter Tabs & New Post CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft">
        
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-mindful-purple text-white shadow-xs'
                  : 'bg-mindful-bg text-mindful-textMuted hover:bg-mindful-purple-subtle/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-6 py-2.5 rounded-full bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          New Discussion
        </button>

      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft hover:shadow-floating transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover border border-mindful-purple-subtle"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-mindful-textDark">{post.author}</h3>
                    <span className="text-[10px] text-mindful-purple font-semibold bg-purple-50 px-2 py-0.5 rounded-md">
                      Verified Member
                    </span>
                  </div>
                  <span className="text-[10px] text-mindful-textMuted">{post.time}</span>
                </div>
              </div>

              <span className="text-xs font-bold text-mindful-purple bg-mindful-purple-subtle/60 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-base font-bold text-mindful-textDark">{post.title}</h2>
              <p className="text-xs text-mindful-textMuted leading-relaxed">{post.content}</p>
            </div>

            <div className="flex items-center gap-4 pt-2 border-t border-gray-100 text-xs">
              <button
                onClick={() => onUpvotePost(post.id)}
                className="flex items-center gap-1.5 text-mindful-textMuted hover:text-mindful-purple font-bold transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.upvotes} Upvotes</span>
              </button>

              <div className="flex items-center gap-1.5 text-mindful-textMuted font-bold">
                <MessageSquare className="w-4 h-4" />
                <span>{post.repliesCount} Replies</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mindful-textDark/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-white shadow-floating overflow-hidden p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-mindful-textDark">Create New Community Discussion</h3>
              <button onClick={() => setShowNewPostModal(false)} className="p-1 rounded-full text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-mindful-textDark mb-1">Post Title</label>
                <input
                  type="text"
                  required
                  placeholder="What would you like to discuss?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-mindful-bg text-xs text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-mindful-textDark mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-mindful-bg text-xs text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-mindful-textDark mb-1">Details</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Share details or ask your question..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-4 bg-mindful-bg text-xs text-mindful-textDark rounded-2xl border border-gray-200 focus:outline-none focus:border-mindful-purple resize-none"
                ></textarea>
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-mindful-textDark cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-mindful-purple rounded"
                />
                <span>Post anonymously for privacy</span>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                Publish Discussion
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
