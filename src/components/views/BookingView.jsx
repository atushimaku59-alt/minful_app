import React, { useState } from 'react';
import { Calendar as CalendarIcon, Video, Phone, MessageSquare, Clock, CheckCircle2, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

export default function BookingView({ selectedTherapist, onBookingConfirmed }) {
  const [step, setStep] = useState(1);
  const [chosenTherapist, setChosenTherapist] = useState(selectedTherapist || {
    name: 'Dr. Sarah Ahmed',
    role: 'Clinical Psychologist',
    rate: '$80 / session',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
  });
  const [sessionType, setSessionType] = useState('video'); // 'video', 'voice', 'chat'
  const [selectedDate, setSelectedDate] = useState('Tomorrow, Aug 29');
  const [selectedTime, setSelectedTime] = useState('4:00 PM');
  const [isBooked, setIsBooked] = useState(false);

  const dates = ['Today, Aug 28', 'Tomorrow, Aug 29', 'Sat, Aug 30', 'Sun, Aug 31', 'Mon, Sep 01'];
  const times = ['09:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM', '07:00 PM'];

  const handleFinalBooking = () => {
    setIsBooked(true);
    if (onBookingConfirmed) {
      onBookingConfirmed({
        therapist: chosenTherapist.name,
        date: selectedDate,
        time: selectedTime,
        type: sessionType
      });
    }
  };

  return (
    <div className="space-y-10 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 text-mindful-purple text-xs font-bold border border-purple-100">
          <CalendarIcon className="w-4 h-4 text-mindful-purple" />
          <span>Seamless Appointment Wizard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-mindful-textDark">
          Book Your Therapy Session
        </h1>
        <p className="text-sm text-mindful-textMuted leading-relaxed">
          Select your preferred therapist, session format, and convenient date & time slot.
        </p>
      </div>

      {!isBooked ? (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-mindful-purple-subtle/40 shadow-soft p-8 space-y-8">
          
          {/* Progress Indicator Bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6 text-xs font-bold">
            <span className={step >= 1 ? 'text-mindful-purple' : 'text-gray-400'}>1. Therapist</span>
            <span className="text-gray-300">→</span>
            <span className={step >= 2 ? 'text-mindful-purple' : 'text-gray-400'}>2. Session Type</span>
            <span className="text-gray-300">→</span>
            <span className={step >= 3 ? 'text-mindful-purple' : 'text-gray-400'}>3. Date & Time</span>
            <span className="text-gray-300">→</span>
            <span className={step >= 4 ? 'text-mindful-purple' : 'text-gray-400'}>4. Confirm</span>
          </div>

          {/* STEP 1: Therapist Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-mindful-textDark">Selected Mental Health Professional</h2>
              
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-mindful-bg border border-mindful-purple-subtle">
                <img src={chosenTherapist.img} alt={chosenTherapist.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-mindful-textDark">{chosenTherapist.name}</h3>
                  <p className="text-xs text-mindful-purple font-semibold">{chosenTherapist.role}</p>
                  <p className="text-xs text-mindful-textMuted font-bold">{chosenTherapist.rate}</p>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-2xl bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all flex items-center justify-center gap-1.5"
              >
                <span>Continue to Session Format</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Session Format */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-mindful-textDark">Choose Preferred Session Mode</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'video', icon: Video, label: 'HD Video Call', desc: 'Face-to-face encrypted video' },
                  { id: 'voice', icon: Phone, label: 'Voice Consultation', desc: 'Audio-only session' },
                  { id: 'chat', icon: MessageSquare, label: 'Live Text Chat', desc: 'Real-time messaging' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSessionType(mode.id)}
                    className={`p-5 rounded-2xl border text-left space-y-2 transition-all ${
                      sessionType === mode.id
                        ? 'border-mindful-purple bg-purple-50 text-mindful-purple shadow-sm'
                        : 'border-gray-200 bg-mindful-bg text-mindful-textDark hover:bg-white'
                    }`}
                  >
                    <mode.icon className="w-6 h-6 text-mindful-purple" />
                    <h3 className="text-xs font-bold">{mode.label}</h3>
                    <p className="text-[11px] text-mindful-textMuted">{mode.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-2xl border border-gray-200 text-xs font-bold text-mindful-textMuted hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 rounded-2xl bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Picker */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-mindful-textDark">Select Available Slot</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-mindful-textMuted uppercase mb-2">Available Dates</label>
                  <div className="flex flex-wrap gap-2">
                    {dates.map((d) => (
                      <button
                        key={d}
                        onClick={() => setSelectedDate(d)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                          selectedDate === d
                            ? 'bg-mindful-purple text-white shadow-xs'
                            : 'bg-mindful-bg text-mindful-textDark border border-gray-200 hover:bg-white'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-mindful-textMuted uppercase mb-2">Time Slot (EST)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedTime === t
                            ? 'bg-mindful-peach text-white shadow-xs'
                            : 'bg-mindful-bg text-mindful-textDark border border-gray-200 hover:bg-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-2xl border border-gray-200 text-xs font-bold text-mindful-textMuted hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 py-3 rounded-2xl bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Review Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Confirm */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-mindful-textDark">Booking Summary</h2>

              <div className="p-6 rounded-2xl bg-mindful-bg border border-mindful-purple-subtle space-y-4 text-xs">
                <div className="flex justify-between border-b border-gray-200/60 pb-3">
                  <span className="text-mindful-textMuted">Therapist:</span>
                  <strong className="text-mindful-textDark">{chosenTherapist.name} ({chosenTherapist.role})</strong>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-3">
                  <span className="text-mindful-textMuted">Format:</span>
                  <strong className="text-mindful-purple capitalize">{sessionType} Consultation (45 min)</strong>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-3">
                  <span className="text-mindful-textMuted">Scheduled Time:</span>
                  <strong className="text-mindful-textDark">{selectedDate} at {selectedTime}</strong>
                </div>
                <div className="flex justify-between font-bold text-sm text-mindful-textDark pt-1">
                  <span>Total Fee:</span>
                  <span className="text-mindful-purple">{chosenTherapist.rate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-2xl bg-purple-50 text-[11px] text-mindful-purple font-medium border border-purple-100">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Free cancellation up to 24 hours prior to appointment time.</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-2xl border border-gray-200 text-xs font-bold text-mindful-textMuted hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleFinalBooking}
                  className="flex-1 py-3 rounded-2xl bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm & Reserve Appointment
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Confirmation Screen */
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white border border-mindful-purple-subtle/40 shadow-floating text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-mindful-textDark">Appointment Confirmed!</h2>
            <p className="text-xs text-mindful-textMuted">
              Your session with <strong>{chosenTherapist.name}</strong> has been successfully booked for <strong>{selectedDate} at {selectedTime}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-mindful-bg border border-gray-100 text-xs space-y-1">
            <p className="font-bold text-mindful-purple">Calendar invite & Video link sent to your email.</p>
            <p className="text-mindful-textMuted">You can join the session directly from your Dashboard.</p>
          </div>

          <button
            onClick={() => setIsBooked(false)}
            className="px-6 py-2.5 rounded-full bg-mindful-purple text-white text-xs font-bold shadow-soft hover:bg-mindful-purple-dark transition-all"
          >
            Book Another Session
          </button>
        </div>
      )}

    </div>
  );
}
