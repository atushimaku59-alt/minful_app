import React, { useState } from 'react';
import { UserCheck, Star, Video, Calendar, Search, MapPin, Award, CheckCircle, Clock } from 'lucide-react';

export default function TherapistsView({ onSelectTherapistForBooking }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [activeDoctorModal, setActiveDoctorModal] = useState(null);

  const therapistsData = [
    {
      id: 'dr-sarah',
      name: 'Dr. Sarah Ahmed',
      role: 'Clinical Psychologist',
      specialty: 'Anxiety & Work Stress',
      rating: 4.9,
      reviewsCount: 128,
      experience: '9+ Years Exp.',
      rate: '$80 / session',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
      bio: 'Dr. Sarah specializes in Cognitive Behavioral Therapy (CBT), helping professionals navigate burn-out, generalized anxiety, and life transitions.',
      education: 'Ph.D. in Clinical Psychology, Stanford University',
      available: 'Today 4:00 PM'
    },
    {
      id: 'dr-nusrat',
      name: 'Dr. Nusrat Jehan',
      role: 'Counseling Psychologist',
      specialty: 'Relationships & Self-Esteem',
      rating: 4.8,
      reviewsCount: 94,
      experience: '7+ Years Exp.',
      rate: '$75 / session',
      img: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&q=80&w=300',
      bio: 'Dedicated counselor providing a warm, empathetic space for individuals and couples seeking relationship growth and emotional clarity.',
      education: 'Psy.D., Columbia University',
      available: 'Tomorrow 10:00 AM'
    },
    {
      id: 'dr-arman',
      name: 'Dr. Arman Rahman',
      role: 'Psychiatrist & Therapist',
      specialty: 'Depression & Trauma',
      rating: 4.7,
      reviewsCount: 82,
      experience: '11+ Years Exp.',
      rate: '$95 / session',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
      bio: 'Holistic clinical approach combining psychotherapeutic support with evidence-based mental wellness strategies.',
      education: 'M.D. Psychiatry, Johns Hopkins Medicine',
      available: 'Friday 2:00 PM'
    },
    {
      id: 'dr-elena',
      name: 'Dr. Elena Rostova',
      role: 'Child & Adolescent Psychologist',
      specialty: 'Youth & Family Dynamics',
      rating: 4.9,
      reviewsCount: 110,
      experience: '8+ Years Exp.',
      rate: '$85 / session',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      bio: 'Expert in adolescent mental health, family communication, mindfulness, and academic stress management.',
      education: 'Ph.D., UCLA',
      available: 'Tomorrow 3:00 PM'
    }
  ];

  const filtered = therapistsData.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.role.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-10 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-mindful-purple text-xs font-bold border border-purple-100">
          <UserCheck className="w-4 h-4 text-mindful-purple" />
          <span>Verified Mental Health Experts</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-mindful-textDark">
          Find & Connect with Top Therapists
        </h1>
        <p className="text-sm text-mindful-textMuted leading-relaxed">
          Browse certified clinical psychologists and counselors for confidential 1-on-1 video sessions.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-mindful-textMuted absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-mindful-bg text-xs text-mindful-textDark rounded-full border border-gray-200 focus:outline-none focus:border-mindful-purple"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {['All', 'Clinical', 'Counseling', 'Psychiatrist'].map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                selectedSpecialty === spec
                  ? 'bg-mindful-purple text-white shadow-xs'
                  : 'bg-mindful-bg text-mindful-textMuted hover:bg-mindful-purple-subtle/40'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

      </div>

      {/* Therapists Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="p-6 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-soft hover:shadow-floating transition-all flex flex-col justify-between space-y-6"
          >
            <div className="flex items-start gap-4">
              <img
                src={doc.img}
                alt={doc.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-mindful-purple-subtle flex-shrink-0 shadow-sm"
              />

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-mindful-textDark">{doc.name}</h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{doc.rating}</span>
                  </div>
                </div>

                <p className="text-xs font-bold text-mindful-purple">{doc.role}</p>
                <p className="text-[11px] text-mindful-textMuted">{doc.specialty}</p>

                <div className="flex items-center gap-3 pt-1 text-[11px] font-semibold text-mindful-textMuted">
                  <span>{doc.experience}</span>
                  <span>•</span>
                  <span className="text-mindful-textDark font-bold">{doc.rate}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-mindful-textMuted line-clamp-2 leading-relaxed bg-mindful-bg p-3 rounded-2xl border border-gray-100">
              "{doc.bio}"
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Next Available: {doc.available}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveDoctorModal(doc)}
                  className="px-4 py-2 rounded-full border border-mindful-purple-subtle text-mindful-purple text-xs font-bold hover:bg-mindful-purple-subtle/50 transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => onSelectTherapistForBooking(doc)}
                  className="px-5 py-2 rounded-full bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all"
                >
                  Book Session
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
