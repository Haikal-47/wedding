'use client';

import { useActionState, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, User, Users, Check, X, Loader2 } from 'lucide-react';
import { createRSVP, getRSVPs, type RSVPFormState } from '@/app/actions/rsvp';
import type { RSVPSelect } from '@/db/schema';
import confetti from 'canvas-confetti';
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from '@/lib/animationVariants';


interface RsvpGuestbookProps {
  guestName: string;
  initialWishes: RSVPSelect[];
}

export default function RsvpGuestbook({ guestName, initialWishes }: RsvpGuestbookProps) {
  const [state, formAction, isPending] = useActionState<RSVPFormState, FormData>(createRSVP, null);
  const [wishes, setWishes] = useState<RSVPSelect[]>(initialWishes);
  const [attendance, setAttendance] = useState<string>('HADIR');
  const formRef = useRef<HTMLFormElement>(null);

  // Refresh wishes after successful submission
  useEffect(() => {
    if (state?.success) {
      // Multi-burst confetti cannon for celebration
      const duration = 2200;
      const end = Date.now() + duration;
      const colors = ['#D4AF37', '#F3E5AB', '#93C5FD', '#BFDBFE', '#3B82F6', '#FFFFFF', '#FFD700', '#C5A059'];

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors,
          startVelocity: 35,
          gravity: 0.8,
          scalar: 1.2,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors,
          startVelocity: 35,
          gravity: 0.8,
          scalar: 1.2,
        });
        // Center burst
        if (Date.now() < end - 1800) {
          confetti({
            particleCount: 3,
            angle: 90,
            spread: 80,
            origin: { x: 0.5, y: 0.7 },
            colors,
            startVelocity: 45,
            gravity: 0.9,
            ticks: 200,
          });
        }
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Reset form
      formRef.current?.reset();

      // Fetch updated wishes
      getRSVPs().then((data) => setWishes(data));
    }
  }, [state]);


  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section id="rsvp" className="section-container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="section-title font-display">RSVP & Ucapan</h2>
        <div className="ornament-divider">
          <MessageSquare size={16} className="text-gold" />
        </div>
        <p className="section-subtitle">
          Konfirmasi kehadiran Anda dan kirimkan doa serta ucapan untuk kedua mempelai.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        {/* RSVP Form */}
        <motion.div
          className="glass-card p-6 md:p-8 mb-10"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <form ref={formRef} action={formAction} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="rsvp-name" className="block text-sm font-medium text-charcoal mb-2">
                <User size={14} className="inline mr-2 text-gold" />
                Nama Lengkap
              </label>
              <input
                id="rsvp-name"
                name="name"
                type="text"
                defaultValue={guestName}
                placeholder="Masukkan nama Anda"
                required
                className="input-elegant"
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                <Check size={14} className="inline mr-2 text-gold" />
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance('HADIR')}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background: attendance === 'HADIR'
                      ? 'linear-gradient(135deg, #D4AF37 0%, #C5A059 100%)'
                      : 'rgba(15, 30, 66, 0.6)',
                    color: attendance === 'HADIR' ? '#070D1E' : '#94A3B8',
                    fontWeight: attendance === 'HADIR' ? 600 : 500,
                    border: attendance === 'HADIR'
                      ? '1px solid #D4AF37'
                      : '1px solid rgba(212, 175, 55, 0.25)',
                    boxShadow: attendance === 'HADIR' ? '0 4px 15px rgba(212, 175, 55, 0.35)' : 'none',
                  }}
                >
                  <Check size={16} />
                  Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('TIDAK_HADIR')}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background: attendance === 'TIDAK_HADIR'
                      ? 'rgba(239, 68, 68, 0.2)'
                      : 'rgba(15, 30, 66, 0.6)',
                    color: attendance === 'TIDAK_HADIR' ? '#FCA5A5' : '#94A3B8',
                    fontWeight: attendance === 'TIDAK_HADIR' ? 600 : 500,
                    border: attendance === 'TIDAK_HADIR'
                      ? '1px solid rgba(239, 68, 68, 0.5)'
                      : '1px solid rgba(212, 175, 55, 0.25)',
                  }}
                >
                  <X size={16} />
                  Tidak Hadir
                </button>
              </div>
              <input type="hidden" name="attendance" value={attendance} />
            </div>

            {/* Guest count */}
            <AnimatePresence>
              {attendance === 'HADIR' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="rsvp-guests" className="block text-sm font-medium text-charcoal mb-2">
                    <Users size={14} className="inline mr-2 text-sage" />
                    Jumlah Tamu
                  </label>
                  <select
                    id="rsvp-guests"
                    name="guestCount"
                    defaultValue="1"
                    className="input-elegant"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} Orang
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message */}
            <div>
              <label htmlFor="rsvp-message" className="block text-sm font-medium text-charcoal mb-2">
                <MessageSquare size={14} className="inline mr-2 text-sage" />
                Ucapan & Doa
              </label>
              <textarea
                id="rsvp-message"
                name="message"
                rows={4}
                placeholder="Tulis ucapan dan doa terbaik Anda untuk kedua mempelai..."
                required
                className="input-elegant resize-none"
              />
            </div>

            {/* Status message */}
            <AnimatePresence>
              {state && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`px-4 py-3 rounded-xl text-sm ${
                    state.success
                      ? 'bg-sage/10 text-sage-dark border border-sage/20'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {state.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.98 }}
            >
              {isPending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Kirim Ucapan
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Guestbook / Wishes List */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h3 className="font-display text-2xl text-charcoal text-center mb-6">
            Doa & Ucapan ({wishes.length})
          </h3>

          <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-hide pr-1">
            {wishes.length === 0 ? (
              <p className="text-center text-sage/60 text-sm py-8">
                Belum ada ucapan. Jadilah yang pertama! 💌
              </p>
            ) : (
              wishes.map((wish, idx) => (
                <motion.div
                  key={wish.id}
                  className="glass-card p-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                         style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37' }}>
                      <span className="font-display text-sm font-semibold">
                        {wish.name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm" style={{ color: '#F8FAFC' }}>{wish.name}</span>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium"
                          style={{
                            background: wish.attendance === 'HADIR' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: wish.attendance === 'HADIR' ? '#F3E5AB' : '#FCA5A5',
                            border: wish.attendance === 'HADIR' ? '1px solid rgba(212, 175, 55, 0.35)' : '1px solid rgba(239, 68, 68, 0.35)',
                          }}
                        >
                          {wish.attendance === 'HADIR' ? '✓ Hadir' : '✕ Tidak Hadir'}
                          {wish.attendance === 'HADIR' && wish.guestCount > 0 && ` (${wish.guestCount})`}
                        </span>
                      </div>
                      <p className="text-sm mt-1 leading-relaxed" style={{ color: '#CBD5E1', fontFamily: 'var(--font-body)' }}>{wish.message}</p>
                      <span className="text-[10px] mt-2 block" style={{ color: '#94A3B8' }}>
                        {formatDate(wish.createdAt)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
