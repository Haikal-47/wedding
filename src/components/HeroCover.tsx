'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';

interface HeroCoverProps {
  guestName: string;
  onOpen: () => void;
}

function FallingPetal({ delay, left, size }: { delay: number; left: string; size: number }) {
  return (
    <motion.div
      className="absolute text-gold/30 pointer-events-none"
      style={{ left, top: '-5%' }}
      initial={{ y: '-10vh', rotate: 0, opacity: 0.7 }}
      animate={{ y: '110vh', rotate: 720, opacity: 0 }}
      transition={{ duration: 8 + Math.random() * 4, delay, repeat: Infinity, ease: 'linear' }}
    >
      <Heart size={size} fill="currentColor" />
    </motion.div>
  );
}

export default function HeroCover({ guestName, onOpen }: HeroCoverProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  const handleOpen = () => {
    setIsVisible(false);
    onOpen();
  };

  const petals = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.8,
    left: `${Math.random() * 100}%`,
    size: 12 + Math.random() * 16,
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-pattern" />

          {/* Falling petals */}
          {petals.map((p, i) => (
            <FallingPetal key={i} {...p} />
          ))}

          {/* Ornamental top border */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-lg">
            {/* The Wedding Of */}
            <motion.p
              className="text-sage text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              The Wedding Of
            </motion.p>

            {/* Couple Names */}
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl text-charcoal mb-2 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Romeo
            </motion.h1>

            <motion.div
              className="flex items-center justify-center gap-4 my-3"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7, type: 'spring' }}
            >
              <div className="w-12 md:w-16 h-px bg-gold/50" />
              <span className="text-gold text-2xl md:text-3xl font-display">&</span>
              <div className="w-12 md:w-16 h-px bg-gold/50" />
            </motion.div>

            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl text-charcoal mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Juliet
            </motion.h1>

            {/* Date */}
            <motion.p
              className="text-sage-dark text-sm md:text-base tracking-[0.15em] mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              20 . 12 . 2026
            </motion.p>

            {/* Guest name */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <p className="text-sage text-xs tracking-[0.2em] uppercase mb-2">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <p className="font-display text-2xl md:text-3xl text-charcoal">
                {guestName || 'Tamu Undangan'}
              </p>
            </motion.div>

            {/* Open Button */}
            <motion.button
              onClick={handleOpen}
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-sage text-cream rounded-full 
                         font-medium tracking-wider text-sm overflow-hidden transition-all duration-300
                         hover:bg-sage-dark hover:shadow-xl hover:shadow-sage/20 active:scale-95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Buka Undangan</span>
              <Heart size={16} className="relative z-10 group-hover:scale-110 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-sage-dark"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

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
                <ChevronDown size={20} className="text-sage/40" />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom ornamental border */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
