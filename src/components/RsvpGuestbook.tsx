'use client';

import { useActionState, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, User, Users, Check, X, Loader2 } from 'lucide-react';
import { createRSVP, getRSVPs, type RSVPFormState } from '@/app/actions/rsvp';
import type { RSVPSelect } from '@/db/schema';
import confetti from 'canvas-confetti';

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
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E8C5C8', '#D48D93', '#94A388', '#637257', '#FDF9F6', '#4A3B3C'],
      });

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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
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
          className="card-elegant p-6 md:p-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form ref={formRef} action={formAction} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="rsvp-name" className="block text-sm font-medium text-charcoal mb-2">
                <User size={14} className="inline mr-2 text-sage" />
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
                <Check size={14} className="inline mr-2 text-sage" />
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance('HADIR')}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2
                    ${attendance === 'HADIR'
                      ? 'bg-sage text-cream shadow-md shadow-sage/20'
                      : 'bg-cream border border-sage/20 text-sage-dark hover:border-sage/40'
                    }`}
                >
                  <Check size={16} />
                  Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('TIDAK_HADIR')}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2
                    ${attendance === 'TIDAK_HADIR'
                      ? 'bg-red-800/80 text-cream shadow-md'
                      : 'bg-cream border border-sage/20 text-sage-dark hover:border-sage/40'
                    }`}
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
                  className="card-elegant p-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sage font-display text-sm font-semibold">
                        {wish.name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-charcoal text-sm">{wish.name}</span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium
                            ${wish.attendance === 'HADIR'
                              ? 'bg-sage/10 text-sage-dark'
                              : 'bg-red-50 text-red-600'
                            }`}
                        >
                          {wish.attendance === 'HADIR' ? '✓ Hadir' : '✕ Tidak Hadir'}
                          {wish.attendance === 'HADIR' && wish.guestCount > 0 && ` (${wish.guestCount})`}
                        </span>
                      </div>
                      <p className="text-sage-dark text-sm mt-1 leading-relaxed">{wish.message}</p>
                      <span className="text-[10px] text-sage/50 mt-2 block">
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
