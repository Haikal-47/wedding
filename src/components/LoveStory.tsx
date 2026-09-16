'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Gem, PartyPopper } from 'lucide-react';

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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
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
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold/20 md:-translate-x-px" />

        {stories.map((story, idx) => (
          <motion.div
            key={idx}
            className={`relative flex items-start gap-6 mb-12 last:mb-0 
                        md:gap-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
              <motion.div
                className="w-12 h-12 rounded-full bg-cream border-2 border-gold/30 
                            flex items-center justify-center text-gold shadow-sm"
                whileInView={{ scale: [0.5, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 + 0.2 }}
              >
                {story.icon}
              </motion.div>
            </div>

            {/* Content card */}
            <div className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
              <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold-dark text-xs font-medium mb-3">
                {story.date}
              </span>
              <h3 className="font-display text-xl md:text-2xl text-charcoal mb-2">{story.title}</h3>
              <p className="text-sage-dark text-sm leading-relaxed">{story.description}</p>
            </div>

            {/* Spacer for the other side */}
            <div className="hidden md:block md:w-[calc(50%-3rem)]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
