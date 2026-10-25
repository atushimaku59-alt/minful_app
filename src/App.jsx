import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Views
import HomeView from './components/views/HomeView';
import AuthModal from './components/views/AuthModal';
import AuthRequiredView from './components/views/AuthRequiredView';
import DashboardView from './components/views/DashboardView';
import MoodTrackerView from './components/views/MoodTrackerView';
import JournalView from './components/views/JournalView';
import CommunityView from './components/views/CommunityView';
import TherapistsView from './components/views/TherapistsView';
import BookingView from './components/views/BookingView';
import ProfileView from './components/views/ProfileView';
import AdminPanel from './components/views/AdminPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const [loggedMoods, setLoggedMoods] = useState([
    {
      id: 1,
      mood: 'great',
      emotions: ['Inspired', 'Calm'],
      activities: ['Meditation', 'Nature Walk'],
      notes: 'Had a wonderful morning reflection and peaceful walk.',
      timestamp: '09:30 AM',
      date: 'Aug 28'
    },
    {
      id: 2,
      mood: 'good',
      emotions: ['Hopeful'],
      activities: ['Work'],
      notes: 'Productive work session today.',
      timestamp: '03:15 PM',
      date: 'Aug 27'
    }
  ]);

  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      title: 'Finding Joy in Small Moments',
      content: 'Today I took 15 minutes during lunch to sit outside and listen to the birds. It brought such a profound sense of grounding and clarity.',
      category: 'Gratitude',
      promptUsed: 'What made you smile or feel deeply peaceful today?',
      date: 'Aug 27, 2026',
      readTime: '1 min read'
    },
    {
      id: 2,
      title: 'Reflections after Therapy',
      content: 'Dr. Sarah reminded me that anxiety is just a temporary emotional weather pattern. I do not have to identify with every thought that arises.',
      category: 'Therapy Reflections',
      promptUsed: 'What is one heavy thought you can safely let go of right now?',
      date: 'Aug 20, 2026',
      readTime: '2 min read'
    }
  ]);

  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 1,
      title: 'Dealing with anxiety at work - How do you manage it?',
      category: 'Anxiety & Stress',
      content: 'When deadline pressure builds up, I sometimes feel overwhelmed. What small grounding techniques help you reset during the workday?',
      author: 'Mindful Explorer',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      upvotes: 32,
      repliesCount: 14,
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Sharing small wins - Let\'s celebrate together!',
      category: 'Daily Wins',
      content: 'I managed to stick to my 10-minute morning meditation for 7 straight days! Huge milestone for me.',
      author: 'PeacefulMind99',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      upvotes: 45,
      repliesCount: 18,
      time: '5 hours ago'
    }
  ]);

  // Authentication
  const handleOpenAuth = (mode) => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);

    if (user?.role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setActiveTab('home');
  };

  // Mood tracking
  const handleQuickMoodLog = (mood) => {
    if (!currentUser) {
      handleOpenAuth('login');
      return;
    }

    const newLog = {
      id: Date.now(),
      mood,
      emotions: ['Peaceful'],
      activities: ['Quick Log'],
      notes: `Quick mood entry logged from Home view (${mood}).`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      date: 'Today'
    };

    setLoggedMoods((previous) => [newLog, ...previous]);
  };

  const handleAddMood = (entry) => {
    setLoggedMoods((previous) => [entry, ...previous]);
  };

  const handleAddJournal = (entry) => {
    setJournalEntries((previous) => [entry, ...previous]);
  };

  const handleAddCommunityPost = (post) => {
    setCommunityPosts((previous) => [post, ...previous]);
  };

  const handleUpvotePost = (postId) => {
    setCommunityPosts((previous) =>
      previous.map((post) =>
        post.id === postId
          ? { ...post, upvotes: post.upvotes + 1 }
          : post
      )
    );
  };

  const handleSelectTherapistForBooking = (therapist) => {
    setSelectedTherapist(therapist);

    if (!currentUser) {
      handleOpenAuth('login');
    } else {
      setActiveTab('booking');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation and access control
  const handleNavigate = (tab) => {
    const protectedTabs = [
      'dashboard',
      'profile',
      'journal',
      'mood',
      'booking'
    ];

    if (!currentUser && protectedTabs.includes(tab)) {
      handleOpenAuth('login');
      return;
    }

    if (tab === 'admin' && currentUser?.role !== 'admin') {
      setActiveTab('home');
      return;
    }

    if (currentUser?.role === 'admin' && tab !== 'admin' && tab !== 'home') {
      setActiveTab('admin');
      return;
    }

    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">

      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onQuickMoodLog={handleQuickMoodLog}
            loggedMoods={loggedMoods}
          />
        )}

        {activeTab === 'admin' && (
          currentUser?.role === 'admin' ? (
            <AdminPanel />
          ) : (
            <AuthRequiredView
              onOpenAuth={handleOpenAuth}
              featureName="Admin Panel"
            />
          )
        )}

        {activeTab === 'dashboard' && (
          currentUser ? (
            <DashboardView
              currentUser={currentUser}
              onNavigate={handleNavigate}
              loggedMoods={loggedMoods}
            />
          ) : (
            <AuthRequiredView
              onOpenAuth={handleOpenAuth}
              featureName="Personalized Dashboard"
            />
          )
        )}

        {activeTab === 'mood' && (
          currentUser ? (
            <MoodTrackerView
              loggedMoods={loggedMoods}
              onAddMood={handleAddMood}
            />
          ) : (
            <AuthRequiredView
              onOpenAuth={handleOpenAuth}
              featureName="3D Mood Tracker"
            />
          )
        )}

        {activeTab === 'journal' && (
          currentUser ? (
            <JournalView
              entries={journalEntries}
              onAddEntry={handleAddJournal}
            />
          ) : (
            <AuthRequiredView
              onOpenAuth={handleOpenAuth}
              featureName="Private Reflections Journal"
            />
          )
        )}

        {activeTab === 'community' && (
          <CommunityView
            posts={communityPosts}
            onAddPost={(post) => {
              if (!currentUser) {
                handleOpenAuth('login');
              } else {
                handleAddCommunityPost(post);
              }
            }}
            onUpvotePost={handleUpvotePost}
          />
        )}

        {activeTab === 'therapists' && (
          <TherapistsView
            onSelectTherapistForBooking={handleSelectTherapistForBooking}
          />
        )}

        {activeTab === 'booking' && (
          currentUser ? (
            <BookingView
              selectedTherapist={selectedTherapist}
              onBookingConfirmed={() => {
                setActiveTab('dashboard');
              }}
            />
          ) : (
            <AuthRequiredView
              onOpenAuth={handleOpenAuth}
              featureName="Appointment Booking"
            />
          )
        )}

        {activeTab === 'profile' && (
          currentUser ? (
            <ProfileView currentUser={currentUser} />
          ) : (
            <AuthRequiredView
              onOpenAuth={handleOpenAuth}
              featureName="Account Profile"
            />
          )
        )}

      </main>

      <Footer onNavigate={handleNavigate} />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}