import React, { useState } from 'react';
import { 
  Smile, 
  Users, 
  Calendar, 
  Star, 
  ArrowRight, 
  MessageSquare, 
  BookOpen, 
  Heart, 
  UserCheck, 
  CheckCircle,
  Quote,
  Sparkles,
  Send
} from 'lucide-react';
import Brain3DCanvas from '../3d/Brain3DCanvas';

export default function HomeView({ onNavigate, onQuickMoodLog, loggedMoods }) {
  const [selectedQuickMood, setSelectedQuickMood] = useState('good');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedToast, setSubscribedToast] = useState(false);
  const [moodLoggedToast, setMoodLoggedToast] = useState(false);

  const moodOptions = [
    { id: 'very-bad', label: 'Very Bad', emoji: '😡', color: 'bg-red-100 text-red-600 border-red-200 hover:bg-red-200' },
    { id: 'bad', label: 'Bad', emoji: '🙁', color: 'bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200' },
    { id: 'okay', label: 'Okay', emoji: '😐', color: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200' },
    { id: 'good', label: 'Good', emoji: '🙂', color: 'bg-purple-100 text-mindful-purple border-purple-200 hover:bg-purple-200' },
    { id: 'great', label: 'Great', emoji: '😄', color: 'bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200' },
  ];

  const handleTrackMood = () => {
    if (onQuickMoodLog) {
      onQuickMoodLog(selectedQuickMood);
    }
    setMoodLoggedToast(true);
    setTimeout(() => setMoodLoggedToast(false), 3000);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribedToast(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribedToast(false), 3500);
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION matching mockup */}
      <section className="relative pt-6 pb-10 rounded-3xl bg-gradient-to-br from-[#FAF8F5] via-[#F4EFFC] to-[#FFF3F0] px-6 lg:px-12 border border-white/60 shadow-soft overflow-hidden">
        
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-mindful-purple/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-mindful-peach/15 blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-sm text-xs font-bold text-mindful-purple">
              <Sparkles className="w-3.5 h-3.5 text-mindful-peach" />
              <span>3D Interactive Mindful Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-mindful-textDark font-sans leading-[1.15] tracking-tight">
              Mental health <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mindful-purple via-mindful-purple-light to-mindful-peach">
                matters.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-mindful-textMuted max-w-xl leading-relaxed font-medium">
              You don't have to face it alone. We're here to listen, support, and help you feel better every day with compassionate professionals and interactive care tools.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('therapists')}
                className="px-7 py-3.5 rounded-full bg-mindful-purple text-white font-bold text-sm shadow-floating hover:bg-mindful-purple-dark transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Talk to Someone
              </button>

              <button
                onClick={() => {
                  const element = document.getElementById('wellbeing-grid');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full bg-white/80 backdrop-blur-md text-mindful-textDark border border-mindful-purple-subtle font-bold text-sm hover:bg-white hover:border-mindful-purple transition-all flex items-center gap-1.5"
              >
                Explore More
                <ArrowRight className="w-4 h-4 text-mindful-purple" />
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex items-center gap-4 border-t border-mindful-purple-subtle/50">
              <div className="flex -space-x-2.5">
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" alt="User 1" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" alt="User 2" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" alt="User 3" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-mindful-textDark">Trusted by 10K+ people</p>
                <p className="text-mindful-textMuted">around the world</p>
              </div>
            </div>

          </div>

          {/* Right Interactive 3D Canvas Column */}
          <div className="lg:col-span-5 relative">
            <Brain3DCanvas />
          </div>

        </div>
      </section>

      {/* KEY STATS BANNER matching mockup */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { icon: Smile, stat: '10K+', label: 'Happy Users', bg: 'bg-orange-50', iconColor: 'text-orange-500' },
          { icon: Users, stat: '200+', label: 'Licensed Therapists', bg: 'bg-purple-50', iconColor: 'text-mindful-purple' },
          { icon: Calendar, stat: '15K+', label: 'Appointments Booked', bg: 'bg-amber-50', iconColor: 'text-amber-500' },
          { icon: Star, stat: '4.8/5', label: 'User Rating', bg: 'bg-indigo-50', iconColor: 'text-indigo-500' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft hover:shadow-floating transition-all transform hover:-translate-y-1 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.iconColor} flex items-center justify-center flex-shrink-0`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-mindful-textDark">{item.stat}</h3>
              <p className="text-xs font-semibold text-mindful-textMuted">{item.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* EVERYTHING YOU NEED FOR YOUR WELL-BEING (FEATURES GRID) */}
      <section id="wellbeing-grid" className="p-8 sm:p-10 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-8">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-mindful-textDark flex items-center gap-2">
              Everything you need for your well-being
              <Heart className="w-5 h-5 text-mindful-peach fill-mindful-peach" />
            </h2>
            <p className="text-sm text-mindful-textMuted mt-1">Explore our complete set of interactive mental wellness tools.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 'mood',
              icon: Smile,
              title: 'Mood Tracker',
              desc: 'Track your mood and understand your emotions over time.',
              color: 'bg-orange-100 text-orange-600'
            },
            {
              id: 'journal',
              icon: BookOpen,
              title: 'Journal',
              desc: 'Write your thoughts and reflect on your daily feelings securely.',
              color: 'bg-purple-100 text-mindful-purple'
            },
            {
              id: 'community',
              icon: Users,
              title: 'Community Forum',
              desc: 'Connect, share, and support with people just like you.',
              color: 'bg-indigo-100 text-indigo-600'
            },
            {
              id: 'therapists',
              icon: UserCheck,
              title: 'Therapist List',
              desc: 'Find the right certified therapist customized for your needs.',
              color: 'bg-pink-100 text-pink-600'
            },
            {
              id: 'booking',
              icon: Calendar,
              title: 'Appointment Booking',
              desc: 'Book appointments and manage your video therapy sessions easily.',
              color: 'bg-blue-100 text-blue-600'
            },
            {
              id: 'profile',
              icon: Star,
              title: 'Profile',
              desc: 'Manage your profile, emergency contacts, and app preferences.',
              color: 'bg-amber-100 text-amber-600'
            },
          ].map((feature) => (
            <div
              key={feature.id}
              onClick={() => onNavigate(feature.id)}
              className="group p-6 rounded-2xl bg-mindful-bg/60 border border-mindful-purple-subtle/30 hover:bg-white hover:border-mindful-purple/40 hover:shadow-floating transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-mindful-textDark group-hover:text-mindful-purple transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-mindful-textMuted leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              <div className="pt-4 flex items-center gap-1 text-xs font-bold text-mindful-purple group-hover:translate-x-1 transition-transform">
                <span>Go</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* MIDDLE ROW: DAILY INSPIRATION & QUICK MOOD SELECTOR */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Daily Inspiration Card */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-[#FFF3F0] to-[#F5EFFB] border border-white shadow-soft relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-mindful-purple bg-white/70 px-3 py-1 rounded-full border border-white">
              Daily Inspiration
            </span>
            <div className="flex gap-3 pt-2">
              <Quote className="w-8 h-8 text-mindful-purple/40 flex-shrink-0" />
              <blockquote className="text-xl font-serif italic text-mindful-textDark leading-relaxed">
                "It's okay to not be okay. What matters is that you don't give up."
              </blockquote>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
                alt="Illustration character"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <p className="text-xs font-bold text-mindful-textDark">Mindful Daily Affirmations</p>
                <p className="text-[11px] text-mindful-textMuted">Updated every morning</p>
              </div>
            </div>
          </div>
        </div>

        {/* How are you feeling today? Interactive Widget */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-mindful-textDark">How are you feeling today?</h3>
            <p className="text-xs text-mindful-textMuted mt-1">Track your mood and get personalized insights.</p>
          </div>

          {/* Mood Selector Buttons matching screenshot */}
          <div className="grid grid-cols-5 gap-2 sm:gap-4 my-4">
            {moodOptions.map((option) => {
              const isSelected = selectedQuickMood === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedQuickMood(option.id)}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                    isSelected
                      ? `${option.color} border-2 scale-105 shadow-sm`
                      : 'bg-mindful-bg border-gray-100 hover:bg-white text-gray-500'
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-[11px] font-bold">{option.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            {moodLoggedToast ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle className="w-4 h-4" />
                Mood logged! Check your Dashboard.
              </span>
            ) : (
              <span className="text-xs text-mindful-textMuted">
                Selected: <strong className="text-mindful-purple capitalize">{selectedQuickMood}</strong>
              </span>
            )}

            <button
              onClick={handleTrackMood}
              className="px-6 py-2.5 rounded-full bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all"
            >
              Track My Mood
            </button>
          </div>
        </div>

      </section>

      {/* HIGHLIGHTS ROW: Community, Top Therapists, Book Session */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Community Highlights */}
        <div className="lg:col-span-5 p-7 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-mindful-textDark">Community Highlights</h3>
              <p className="text-xs text-mindful-textMuted">See what's trending in the community.</p>
            </div>
            <button
              onClick={() => onNavigate('community')}
              className="text-xs font-bold text-mindful-purple hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Dealing with anxiety at work',
                desc: 'How do you manage daily work stress?',
                replies: '32 replies',
                time: '2h ago',
                user: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
              },
              {
                title: 'Sharing small wins',
                desc: "Let's celebrate together!",
                replies: '18 replies',
                time: '5h ago',
                user: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
              },
            ].map((post, i) => (
              <div
                key={i}
                onClick={() => onNavigate('community')}
                className="p-4 rounded-2xl bg-mindful-bg/60 border border-gray-100 hover:bg-white hover:border-mindful-purple-subtle hover:shadow-sm transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img src={post.user} alt="Author" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-mindful-textDark">{post.title}</h4>
                    <p className="text-[11px] text-mindful-textMuted">{post.desc}</p>
                    <span className="text-[10px] text-mindful-purple font-semibold">{post.replies} • {post.time}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-mindful-textMuted" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated Therapists */}
        <div className="lg:col-span-4 p-7 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-mindful-textDark">Top Rated Therapists</h3>
              <p className="text-xs text-mindful-textMuted">Verified experts for your needs.</p>
            </div>
            <button
              onClick={() => onNavigate('therapists')}
              className="text-xs font-bold text-mindful-purple hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3.5">
            {[
              { name: 'Dr. Sarah Ahmed', role: 'Clinical Psychologist', rating: '4.9', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120' },
              { name: 'Dr. Nusrat Jehan', role: 'Counseling Psychologist', rating: '4.8', img: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&q=80&w=120' },
              { name: 'Dr. Arman Rahman', role: 'Therapist', rating: '4.7', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120' },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-mindful-bg transition-colors">
                <div className="flex items-center gap-3">
                  <img src={doc.img} alt={doc.name} className="w-10 h-10 rounded-full object-cover border border-white shadow-xs" />
                  <div>
                    <h4 className="text-xs font-bold text-mindful-textDark">{doc.name}</h4>
                    <p className="text-[11px] text-mindful-textMuted">{doc.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{doc.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book a Session Card */}
        <div className="lg:col-span-3 p-7 rounded-3xl bg-gradient-to-br from-[#FFF5F2] to-[#F5EFFB] border border-white shadow-soft flex flex-col justify-between text-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold text-mindful-textDark">Book a Session</h3>
            <p className="text-xs text-mindful-textMuted">Take the first step towards feeling better today.</p>
          </div>

          <div className="my-2 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-white p-2 shadow-sm flex items-center justify-center">
              <Calendar className="w-10 h-10 text-mindful-purple" />
            </div>
          </div>

          <button
            onClick={() => onNavigate('booking')}
            className="w-full py-3 rounded-full bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all transform hover:scale-[1.02]"
          >
            Book Now
          </button>
        </div>

      </section>

      {/* NEWSLETTER BANNER matching screenshot */}
      <section className="p-8 sm:p-10 rounded-3xl banner-gradient text-white shadow-floating relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Let's stay in touch</h3>
            <p className="text-xs sm:text-sm text-white/90">
              Get helpful tips, resources, and special offers straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex items-center bg-white rounded-full p-1.5 shadow-lg max-w-md">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-5 py-2 text-xs sm:text-sm text-mindful-textDark placeholder-gray-400 focus:outline-none rounded-full"
              required
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-mindful-purple text-white font-bold text-xs sm:text-sm rounded-full hover:bg-mindful-purple-dark transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

        {subscribedToast && (
          <div className="mt-4 text-center text-xs font-bold bg-white/20 backdrop-blur-md px-4 py-2 rounded-full inline-block animate-in fade-in">
            ✨ Thank you for subscribing to Mindful insights!
          </div>
        )}
      </section>

    </div>
  );
}
