'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';

interface HeroCoverProps {
  guestName: string;
  onOpen: () => void;
}

// ── Ambient falling petals (always visible on cover) ──────────────────────────
const PETALS = [
  { delay: 0,   left: '8%',  size: 16, duration: 9   },
  { delay: 1.2, left: '22%', size: 22, duration: 11  },
  { delay: 2.4, left: '38%', size: 14, duration: 8.5 },
  { delay: 0.6, left: '52%', size: 20, duration: 10  },
  { delay: 3.1, left: '68%', size: 18, duration: 9.5 },
  { delay: 1.8, left: '82%', size: 24, duration: 12  },
  { delay: 4.2, left: '92%', size: 15, duration: 8   },
  { delay: 2.9, left: '14%', size: 20, duration: 10.5},
  { delay: 5.0, left: '44%', size: 17, duration: 9   },
  { delay: 3.7, left: '76%', size: 21, duration: 11.5},
  { delay: 4.8, left: '30%', size: 15, duration: 10  },
  { delay: 1.5, left: '60%', size: 19, duration: 9.8 },
];

function FallingPetal({ delay, left, size, duration }: { delay: number; left: string; size: number; duration: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top: '-5%', color: 'rgba(212, 175, 55, 0.40)' }}
      initial={{ y: '-10vh', rotate: 0, opacity: 0.8 }}
      animate={{ y: '110vh', rotate: 720, opacity: 0 }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      <Heart size={size} fill="currentColor" />
    </motion.div>
  );
}

// ── Burst confetti particle types ─────────────────────────────────────────────
type Shape = 'heart' | 'circle' | 'petal';
interface Particle {
  id: number;
  x: number;      // vw from center
  y: number;      // vh from center
  color: string;
  shape: Shape;
  size: number;
  rotate: number;
  duration: number;
  delay: number;
}

const COLORS = ['#D4AF37', '#F3E5AB', '#93C5FD', '#BFDBFE', '#E5C158', '#3B82F6', '#FFFFFF', '#C5A059'];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * 360;
    const distance = 20 + Math.random() * 65; // vw/vh spread
    const rad = (angle * Math.PI) / 180;
    const shapes: Shape[] = ['heart', 'heart', 'circle', 'petal', 'petal'];
    return {
      id: i,
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance - 10, // slight upward bias
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: 8 + Math.random() * 16,
      rotate: Math.random() * 720 - 360,
      duration: 0.8 + Math.random() * 1.0,
      delay: Math.random() * 0.3,
    };
  });
}

function BurstParticle({ p }: { p: Particle }) {
  return (
    <motion.div
      key={p.id}
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        color: p.color,
        zIndex: 100,
      }}
      initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        x: `${p.x}vw`,
        y: `${p.y}vh`,
        opacity: 0,
        rotate: p.rotate,
        scale: [1, 1.3, 0.5],
      }}
      transition={{ duration: p.duration, delay: p.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {p.shape === 'heart' && (
        <Heart size={p.size} fill="currentColor" stroke="none" />
      )}
      {p.shape === 'circle' && (
        <div
          style={{ width: p.size, height: p.size, borderRadius: '50%', backgroundColor: p.color }}
        />
      )}
      {p.shape === 'petal' && (
        <div
          style={{
            width: p.size * 0.6,
            height: p.size,
            borderRadius: '50% 0 50% 0',
            backgroundColor: p.color,
            transform: `rotate(${Math.random() * 180}deg)`,
          }}
        />
      )}
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function HeroCover({ guestName, onOpen }: HeroCoverProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showBurst, setShowBurst] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Clean up timeout on unmount
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const handleOpen = useCallback(() => {
    // 1. Generate burst particles immediately
    const ps = generateParticles(80);
    setParticles(ps);
    setShowBurst(true);

    // 2. After short pause for particles to show, slide the cover up
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      onOpen();
    }, 700);
  }, [onOpen]);


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #070D1E 0%, #0A1128 50%, #0F1E42 100%)' }}
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-pattern" />

          {/* Ambient falling petals */}
          {PETALS.map((p, i) => (
            <FallingPetal key={i} {...p} />
          ))}

          {/* Burst particles */}
          {showBurst && particles.map((p) => <BurstParticle key={p.id} p={p} />)}

          {/* Ornamental top border */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-xl w-full">
            {/* Monogram badge */}
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-full p-[2px] shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #F3E5AB, #D4AF37, #AA820A)',
                boxShadow: '0 8px 32px rgba(212,175,55,0.3)',
              }}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
            >
              <div className="w-full h-full rounded-full flex items-center justify-center"
                   style={{ background: '#0A1128', border: '1px solid rgba(212,175,55,0.4)' }}>
                <span className="font-display text-lg font-bold tracking-widest text-gradient-gold">
                  F &amp; D
                </span>
              </div>
            </motion.div>

            {/* The Wedding Of */}
            <motion.p
              className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3 font-semibold"
              style={{ color: '#93C5FD', fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Wedding Of
            </motion.p>

            {/* Couple Names */}
            <motion.h1
              className="font-display text-4xl sm:text-5xl md:text-6xl mb-1 leading-tight"
              style={{ color: '#F8FAFC', fontWeight: 300 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Fikri Haikal
            </motion.h1>

            <motion.div
              className="flex items-center justify-center gap-4 my-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7, type: 'spring' }}
            >
              <div className="w-12 md:w-16 h-px" style={{ background: 'rgba(212,175,55,0.5)' }} />
              <span className="text-xl md:text-2xl font-display" style={{ color: '#D4AF37' }}>&amp;</span>
              <div className="w-12 md:w-16 h-px" style={{ background: 'rgba(212,175,55,0.5)' }} />
            </motion.div>

            <motion.h1
              className="font-display text-4xl sm:text-5xl md:text-6xl mb-4 leading-tight whitespace-nowrap"
              style={{ color: '#F8FAFC', fontWeight: 300 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Diah Sinto Rini
            </motion.h1>

            {/* Date */}
            <motion.p
              className="text-xs md:text-sm tracking-[0.2em] mb-5 font-medium"
              style={{ color: '#D4AF37', fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              20 . 12 . 2026
            </motion.p>

            {/* Guest name */}
            <motion.div
              className="mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}>
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <p className="font-display text-xl md:text-2xl" style={{ color: '#F8FAFC' }}>
                {guestName || 'Tamu Undangan'}
              </p>
            </motion.div>

            {/* Open Button */}
            <motion.button
              id="buka-undangan-btn"
              onClick={handleOpen}
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full 
                         font-semibold tracking-wider text-sm overflow-hidden transition-all duration-300
                         active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #C5A059 100%)',
                color: '#070D1E',
                boxShadow: '0 6px 30px rgba(212,175,55,0.45)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 font-bold">Buka Undangan</span>
              <Heart size={16} className="relative z-10 group-hover:scale-110 transition-transform text-[#070D1E]" fill="currentColor" />
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 100%)' }}
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={20} style={{ color: 'rgba(212,175,55,0.6)' }} />
            </motion.div>
          </motion.div>

          {/* Bottom ornamental border */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
