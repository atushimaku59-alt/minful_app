import React, { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  Menu, 
  X, 
  User, 
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenAuth, currentUser, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const mainNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard', badge: 'Hub', protected: true },
    { id: 'therapists', label: 'Therapists' },
    { id: 'community', label: 'Community' },
    { id: 'journal', label: 'Journal', protected: true },
    { id: 'mood', label: 'Mood Tracker', protected: true },
    { id: 'booking', label: 'Book Session', protected: true },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-mindful-purple-subtle/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching screenshot */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-mindful-purple to-mindful-purple-light flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-mindful-textDark font-sans flex items-center gap-1">
              Mindful
              <Sparkles className="w-4 h-4 text-mindful-peach" />
            </span>
            <p className="text-[11px] text-mindful-textMuted font-medium -mt-1 tracking-wide">
              Better minds, better lives.
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/80 shadow-soft">
          {mainNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-mindful-purple shadow-md'
                    : 'text-mindful-textMuted hover:text-mindful-purple hover:bg-mindful-purple-subtle/40'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-mindful-peach/20 text-mindful-coral'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Profile */}
        <div className="hidden lg:flex items-center gap-3 relative">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full border bg-white border-mindful-purple-subtle hover:border-mindful-purple transition-all shadow-xs"
              >
                <div className="w-7 h-7 rounded-full bg-mindful-purple text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-mindful-textDark">{currentUser.name}</span>
                <ChevronDown className="w-4 h-4 text-mindful-textMuted" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-mindful-purple-subtle shadow-floating py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-mindful-textDark">{currentUser.name}</p>
                    <p className="text-[11px] text-mindful-textMuted">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-mindful-textDark hover:bg-mindful-bg transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavClick('profile')}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-mindful-textDark hover:bg-mindful-bg transition-colors"
                  >
                    Profile & Settings
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-mindful-purple hover:bg-mindful-purple-subtle/50 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-mindful-purple hover:bg-mindful-purple-dark shadow-soft hover:shadow-floating transition-all transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-2xl bg-white text-mindful-textDark shadow-soft border border-mindful-purple-subtle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-mindful-purple-subtle px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`p-3 rounded-2xl text-left text-sm font-bold transition-all ${
                  activeTab === item.id
                    ? 'bg-mindful-purple text-white'
                    : 'bg-mindful-bg text-mindful-textDark hover:bg-mindful-purple-subtle/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleNavClick('profile')}
                  className="w-full py-3 rounded-2xl bg-mindful-purple-subtle text-mindful-purple font-bold text-sm text-center"
                >
                  My Profile ({currentUser.name})
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                  className="w-full py-2.5 rounded-2xl bg-red-50 text-red-600 font-bold text-xs text-center"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth('login'); }}
                  className="flex-1 py-3 rounded-2xl border border-mindful-purple text-mindful-purple font-bold text-sm text-center"
                >
                  Login
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth('register'); }}
                  className="flex-1 py-3 rounded-2xl bg-mindful-purple text-white font-bold text-sm text-center shadow-md"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
