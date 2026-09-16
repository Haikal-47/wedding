'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTimeRemaining } from '@/lib/utils';

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTime(getTimeRemaining(targetDate));
    const interval = setInterval(() => {
      setTime(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const blocks = [
    { value: time.days, label: 'Hari' },
    { value: time.hours, label: 'Jam' },
    { value: time.minutes, label: 'Menit' },
    { value: time.seconds, label: 'Detik' },
  ];

  return (
    <motion.div
      className="flex items-center justify-center gap-3 md:gap-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {blocks.map((block, idx) => (
        <div key={block.label} className="flex items-center gap-3 md:gap-5">
          <div className="flex flex-col items-center">
            <motion.div
              className="glass-card w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
              key={block.value}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="font-display text-2xl md:text-3xl font-semibold text-gradient-gold">
                {mounted ? String(block.value).padStart(2, '0') : '00'}
              </span>
            </motion.div>
            <span className="text-[10px] md:text-xs text-[#94A3B8] mt-2.5 tracking-widest uppercase font-medium">
              {block.label}
            </span>
          </div>
          {idx < blocks.length - 1 && (
            <span className="text-[#D4AF37] text-xl font-display mb-6 font-light">:</span>
          )}
        </div>
      ))}
    </motion.div>
  );
}
