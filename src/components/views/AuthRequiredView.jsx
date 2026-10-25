import React from 'react';
import { Lock, Brain, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function AuthRequiredView({ onOpenAuth, featureName = 'Dashboard' }) {
  return (
    <div className="max-w-xl mx-auto py-12 px-6 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-purple-50 border border-purple-100 text-mindful-purple flex items-center justify-center mx-auto shadow-soft">
        <Lock className="w-10 h-10 animate-bounce" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-mindful-purple text-xs font-bold border border-purple-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Authentication Required</span>
        </div>
        <h1 className="text-3xl font-extrabold text-mindful-textDark">
          Access Your {featureName}
        </h1>
        <p className="text-sm text-mindful-textMuted leading-relaxed">
          Please log in or create a confidential Mindful account to view your personalized dashboard, track moods, and manage sessions.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-mindful-purple-subtle/50 shadow-soft text-xs text-mindful-purple font-semibold flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-mindful-purple" />
        <span>100% Confidential & HIPAA-compliant protected space</span>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onOpenAuth('login')}
          className="px-7 py-3 rounded-full border-2 border-mindful-purple text-mindful-purple text-xs font-bold hover:bg-mindful-purple-subtle/40 transition-all"
        >
          Log In to Account
        </button>

        <button
          onClick={() => onOpenAuth('register')}
          className="px-7 py-3 rounded-full bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all flex items-center gap-2"
        >
          <span>Create Account</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
