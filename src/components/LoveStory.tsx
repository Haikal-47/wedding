'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Gem, PartyPopper } from 'lucide-react';
import { staggerContainer, fadeUp, slideLeft, slideRight, viewportOnce } from '@/lib/animationVariants';

const stories = [
  {
    date: 'Maret 2020',
    title: 'Awal Pertemuan',
    description:
      'Kami pertama kali bertemu di sebuah acara komunitas. Saat itu pandangan pertama langsung membuat kami saling tertarik dan penasaran satu sama lain.',
    icon: <Sparkles size={20} />,
  },
  {
    date: 'September 2021',
    title: 'Menjalin Hubungan',
    description:
      'Setelah lebih dari setahun saling mengenal, akhirnya kami memutuskan untuk memulai hubungan yang lebih serius dan berkomitmen satu sama lain.',
    icon: <Heart size={20} />,
  },
  {
    date: 'Februari 2026',
    title: 'Lamaran',
    description:
      'Di sebuah momen yang tak terlupakan, akhirnya sebuah pertanyaan suci diucapkan dan jawaban "Ya" yang membahagiakan pun terucap.',
    icon: <Gem size={20} />,
  },
  {
    date: 'Desember 2026',
    title: 'Pernikahan',
    description:
      'InsyaAllah kami akan menyatukan langkah dalam ikatan suci pernikahan. Doakan kami menuju kehidupan yang berkah dan bahagia.',
    icon: <PartyPopper size={20} />,
  },
];

export default function LoveStory() {
  return (
    <section id="story" className="section-container bg-pattern">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="section-title font-display">Our Love Story</h2>
        <div className="ornament-divider">
          <Heart size={16} className="text-gold" fill="currentColor" />
        </div>
        <p className="section-subtitle">
          Perjalanan cinta kami yang penuh keindahan dan rasa syukur.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
             style={{ background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.4) 15%, rgba(212,175,55,0.4) 85%, transparent)' }} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 
                          md:gap-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              variants={idx % 2 === 0 ? slideLeft : slideRight}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: '#0A1128',
                    border: '2px solid rgba(212, 175, 55, 0.6)',
                    color: '#D4AF37',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)',
                  }}
                  whileInView={{ scale: [0.5, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 + 0.2 }}
                >
                  {story.icon}
                </motion.div>
              </div>

              {/* Content card */}
              <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <motion.div
                  className="glass-card p-5 md:p-6 transition-all duration-300"
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(212,175,55,0.15)' }}
                >
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase mb-3"
                    style={{
                      background: 'rgba(212, 175, 55, 0.12)',
                      color: '#F3E5AB',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                    }}
                  >
                    {story.date}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl mb-2" style={{ color: '#F8FAFC', fontWeight: 400 }}>
                    {story.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}>
                    {story.description}
                  </p>
                </motion.div>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
