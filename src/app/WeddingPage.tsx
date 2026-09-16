'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import type { RSVPSelect } from '@/db/schema';

import HeroCover from '@/components/HeroCover';
import MusicWidget from '@/components/MusicWidget';
import CoupleProfile from '@/components/CoupleProfile';
import EventDetail from '@/components/EventDetail';
import LoveStory from '@/components/LoveStory';
import Gallery from '@/components/Gallery';
import DigitalGift from '@/components/DigitalGift';
import RsvpGuestbook from '@/components/RsvpGuestbook';
import Footer from '@/components/Footer';

// ── Floating botanical SVG ornaments ─────────────────────────────────────────
function FloralOrna({
  style,
  delay = 0,
  duration = 7,
  reverse = false,
}: {
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none opacity-[0.12]"
      style={style}
      animate={{
        y: [0, reverse ? 14 : -14, 0],
        rotate: [0, reverse ? -5 : 5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Botanical SVG – branch with leaves */}
      <svg viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        {/* Main stem */}
        <path d="M60 170 Q55 120 60 90 Q65 60 58 20" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        {/* Leaves left */}
        <path d="M60 140 Q30 120 20 95 Q45 100 60 120" fill="#D4AF37" opacity="0.8"/>
        <path d="M60 105 Q28 88 18 62 Q46 72 62 90" fill="#D4AF37" opacity="0.7"/>
        <path d="M60 75 Q35 55 30 32 Q55 44 62 65" fill="#D4AF37" opacity="0.6"/>
        {/* Leaves right */}
        <path d="M60 130 Q88 112 98 88 Q75 95 60 115" fill="#D4AF37" opacity="0.8"/>
        <path d="M60 95 Q92 80 100 55 Q77 65 60 80" fill="#D4AF37" opacity="0.7"/>
        {/* Blossom top */}
        <circle cx="58" cy="20" r="5" fill="#D4AF37" opacity="0.9"/>
        <circle cx="50" cy="14" r="3.5" fill="#D4AF37" opacity="0.7"/>
        <circle cx="66" cy="14" r="3.5" fill="#D4AF37" opacity="0.7"/>
        <circle cx="58" cy="8" r="3" fill="#F3E5AB" opacity="0.9"/>
      </svg>
    </motion.div>
  );
}

function FloralRing({
  style,
  delay = 0,
  duration = 9,
}: {
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none opacity-[0.10]"
      style={style}
      animate={{ rotate: [0, 360] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 60 + Math.cos(rad) * 44;
          const cy = 60 + Math.sin(rad) * 44;
          return (
            <ellipse
              key={angle}
              cx={cx}
              cy={cy}
              rx="10"
              ry="18"
              transform={`rotate(${angle} ${cx} ${cy})`}
              fill="#D4AF37"
              opacity="0.7"
            />
          );
        })}
        <circle cx="60" cy="60" r="8" fill="#F3E5AB" opacity="0.9"/>
      </svg>
    </motion.div>
  );
}

// ── Section divider ───────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />
  );
}

function WeddingContent({ initialWishes }: { initialWishes: RSVPSelect[] }) {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to')?.replace(/\+/g, ' ') || '';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hero Cover Overlay */}
      <HeroCover guestName={guestName} onOpen={() => setIsOpen(true)} />

      {/* Floating Music Widget */}
      <MusicWidget shouldPlay={isOpen} />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── Opening Quote Section ─────────────────────────────── */}
        <section className="relative py-20 md:py-28 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-pattern" />

          {/* Botanical ornaments for quote section */}
          <FloralOrna style={{ width: 90, left: '-20px', top: '10%' }} delay={0} duration={7} />
          <FloralOrna style={{ width: 70, right: '-10px', top: '20%' }} delay={1.5} duration={8} reverse />
          <FloralRing style={{ width: 80, left: '5%', bottom: '5%' }} delay={0.5} duration={20} />
          <FloralRing style={{ width: 60, right: '5%', bottom: '10%' }} delay={3} duration={16} />

          <motion.div
            className="relative z-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-lg md:text-xl italic leading-relaxed mb-6" style={{ color: '#93C5FD' }}>
              &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu&nbsp;
              pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya,&nbsp;
              dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;
            </p>
            <p className="text-sm font-semibold tracking-wide" style={{ color: '#D4AF37' }}>— QS. Ar-Rum: 21</p>
          </motion.div>
        </section>

        <GoldDivider />

        {/* ── Couple Profile ────────────────────────────────────── */}
        <div className="relative overflow-hidden">
          <FloralOrna style={{ width: 110, right: '-15px', top: '5%' }} delay={2} duration={9} />
          <FloralOrna style={{ width: 80, left: '-10px', bottom: '10%' }} delay={0.5} duration={7} reverse />
          <CoupleProfile />
        </div>

        <GoldDivider />

        {/* ── Event Detail + Countdown ──────────────────────────── */}
        <div className="relative overflow-hidden" style={{ background: 'rgba(15, 30, 66, 0.40)', backdropFilter: 'blur(4px)' }}>
          <FloralRing style={{ width: 100, left: '2%', top: '5%' }} delay={1} duration={25} />
          <FloralRing style={{ width: 75, right: '3%', bottom: '5%' }} delay={4} duration={18} />
          <EventDetail />
        </div>

        <GoldDivider />

        {/* ── Love Story Timeline ───────────────────────────────── */}
        <div className="relative overflow-hidden">
          <FloralOrna style={{ width: 100, left: '-20px', top: '5%' }} delay={1} duration={8} />
          <FloralOrna style={{ width: 85, right: '-15px', bottom: '5%' }} delay={3} duration={10} reverse />
          <LoveStory />
        </div>

        <GoldDivider />

        {/* ── Photo Gallery ─────────────────────────────────────── */}
        <div className="relative overflow-hidden" style={{ background: 'rgba(15, 30, 66, 0.40)', backdropFilter: 'blur(4px)' }}>
          <FloralRing style={{ width: 90, right: '2%', top: '5%' }} delay={2} duration={22} />
          <Gallery />
        </div>

        <GoldDivider />

        {/* ── Digital Gift / Amplop ─────────────────────────────── */}
        <div className="relative overflow-hidden">
          <FloralOrna style={{ width: 95, left: '-15px', top: '10%' }} delay={0.8} duration={7} />
          <FloralOrna style={{ width: 70, right: '-10px', bottom: '10%' }} delay={2.5} duration={9} reverse />
          <DigitalGift />
        </div>

        <GoldDivider />

        {/* ── RSVP & Guestbook ──────────────────────────────────── */}
        <div className="relative overflow-hidden" style={{ background: 'rgba(15, 30, 66, 0.40)', backdropFilter: 'blur(4px)' }}>
          <FloralRing style={{ width: 80, left: '3%', top: '3%' }} delay={1.5} duration={20} />
          <FloralRing style={{ width: 65, right: '2%', bottom: '5%' }} delay={5} duration={15} />
          <RsvpGuestbook guestName={guestName} initialWishes={initialWishes} />
        </div>

        <GoldDivider />

        {/* ── Footer ───────────────────────────────────────────── */}
        <Footer />
      </motion.main>
    </>
  );
}

export default function WeddingPage({ initialWishes }: { initialWishes: RSVPSelect[] }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A1128] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    }>
      <WeddingContent initialWishes={initialWishes} />
    </Suspense>
  );
}
