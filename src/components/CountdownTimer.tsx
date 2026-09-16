'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTimeRemaining } from '@/lib/utils';

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [time, setTime] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
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
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/80 backdrop-blur-sm 
                          border border-gold/15 shadow-sm flex items-center justify-center"
              key={block.value}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="font-display text-2xl md:text-3xl text-charcoal font-semibold">
                {String(block.value).padStart(2, '0')}
              </span>
            </motion.div>
            <span className="text-[10px] md:text-xs text-sage-dark mt-2 tracking-wide uppercase">
              {block.label}
            </span>
          </div>
          {idx < blocks.length - 1 && (
            <span className="text-gold/50 text-xl font-display mb-5">:</span>
          )}
        </div>
      ))}
    </motion.div>
  );
}
