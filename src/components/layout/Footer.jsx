import React from 'react';
import { Brain, Heart, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-white border-t border-mindful-purple-subtle/50 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-100">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-mindful-purple text-white flex items-center justify-center shadow-soft">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-mindful-textDark">Mindful</span>
                <p className="text-xs text-mindful-textMuted font-medium">Better minds, better lives.</p>
              </div>
            </div>

            <p className="text-sm text-mindful-textMuted max-w-sm leading-relaxed">
              We're here to support you on your journey to better mental well-being. Confidential, compassionate, and accessible therapy and community tools.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'YouTube' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  aria-label={item.label}
                  className="w-9 h-9 rounded-full bg-mindful-bg text-mindful-purple flex items-center justify-center hover:bg-mindful-purple hover:text-white transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-bold text-mindful-textDark uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-mindful-textMuted">
              <li><button onClick={() => onNavigate('home')} className="hover:text-mindful-purple transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('therapists')} className="hover:text-mindful-purple transition-colors">Our Services</button></li>
              <li><button onClick={() => onNavigate('therapists')} className="hover:text-mindful-purple transition-colors">Therapists</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-mindful-purple transition-colors">Contact Us</button></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-bold text-mindful-textDark uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm text-mindful-textMuted">
              <li><a href="#help" className="hover:text-mindful-purple transition-colors">Help Center</a></li>
              <li><a href="#faqs" className="hover:text-mindful-purple transition-colors">FAQs</a></li>
              <li><a href="#privacy" className="hover:text-mindful-purple transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-mindful-purple transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Resources & Community Links */}
          <div>
            <h4 className="text-sm font-bold text-mindful-textDark uppercase tracking-wider mb-4">Community</h4>
            <ul className="space-y-2.5 text-sm text-mindful-textMuted">
              <li><button onClick={() => onNavigate('community')} className="hover:text-mindful-purple transition-colors">Forum</button></li>
              <li><button onClick={() => onNavigate('journal')} className="hover:text-mindful-purple transition-colors">Journal Prompts</button></li>
              <li><button onClick={() => onNavigate('mood')} className="hover:text-mindful-purple transition-colors">Mood Analytics</button></li>
              <li><button onClick={() => onNavigate('booking')} className="hover:text-mindful-purple transition-colors">Book Sessions</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-mindful-textMuted">
          <p>© 2026 Mindful. All rights reserved. Crafted with care for mental well-being.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-mindful-coral fill-mindful-coral" />
            <span>for a healthier mind.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
