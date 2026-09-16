'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 text-center overflow-hidden">
      {/* Background decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-sage/5 to-transparent" />

      <motion.div
        className="relative z-10 max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Thank you message */}
        <p className="text-sage-dark text-sm mb-4 leading-relaxed">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
        </p>

        <p className="text-sage text-sm mb-8">
          Atas kehadiran dan doa restunya kami ucapkan terima kasih.
        </p>

        {/* Couple names */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs text-sage/60 tracking-[0.2em] uppercase mb-3">Kami yang berbahagia</p>
          <h3 className="font-display text-3xl md:text-4xl text-charcoal">
            Romeo & Juliet
          </h3>
        </motion.div>

        {/* Divider */}
        <div className="ornament-divider">
          <Heart size={12} className="text-gold/60" fill="currentColor" />
        </div>

        {/* Ayat */}
        <motion.div
          className="mt-6 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sage-dark text-xs italic leading-relaxed max-w-sm mx-auto">
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
            pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya,
            dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <p className="text-gold text-xs mt-2 font-medium">— QS. Ar-Rum: 21</p>
        </motion.div>

        {/* Copyright */}
        <p className="text-[10px] text-sage/40 tracking-wider">
          © 2026 — Made with <Heart size={10} className="inline text-gold/50" fill="currentColor" /> by Romeo & Juliet
        </p>
      </motion.div>
    </footer>
  );
}
