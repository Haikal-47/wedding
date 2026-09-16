'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from '@/lib/animationVariants';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 text-center overflow-hidden">
      {/* Background decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-sage/5 to-transparent" />

      <motion.div
        className="relative z-10 max-w-md mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Thank you message */}
        <motion.p
          className="text-sm mb-4 leading-relaxed"
          style={{ color: '#CBD5E1' }}
          variants={fadeUp}
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
        </motion.p>

        <motion.p
          className="text-sm mb-8"
          style={{ color: '#94A3B8' }}
          variants={fadeUp}
        >
          Atas kehadiran dan doa restunya kami ucapkan terima kasih.
        </motion.p>

        {/* Couple names */}
        <motion.div className="mb-8" variants={scaleIn}>
          <p className="text-xs tracking-[0.2em] uppercase mb-3 font-semibold" style={{ color: '#D4AF37' }}>Kami yang berbahagia</p>
          <h3 className="font-display text-3xl md:text-4xl" style={{ color: '#F8FAFC' }}>
            Fikri Haikal &amp; Diah Sinto Rini
          </h3>
        </motion.div>

        {/* Divider */}
        <div className="ornament-divider">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={12} className="text-gold" fill="currentColor" />
          </motion.div>
        </div>

        {/* Ayat */}
        <motion.div className="mt-6 mb-8" variants={fadeUp}>
          <p className="text-xs italic leading-relaxed max-w-sm mx-auto" style={{ color: '#94A3B8' }}>
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
            pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya,
            dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <p className="text-xs mt-2 font-medium" style={{ color: '#D4AF37' }}>— QS. Ar-Rum: 21</p>
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="text-[10px] tracking-wider"
          style={{ color: 'rgba(148, 163, 184, 0.6)' }}
          variants={fadeUp}
        >
          © 2026 — The Wedding of Fikri Haikal &amp; Diah Sinto Rini
        </motion.p>
      </motion.div>
    </footer>
  );
}
