'use client';

import { motion, type Variants } from 'framer-motion';
import { Heart } from 'lucide-react';

function InstagramIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const coupleData = {
  groom: {
    name: 'Romeo Montague',
    nickname: 'Romeo',
    parents: 'Putra dari Bapak Lord Montague & Ibu Lady Montague',
    photo: '/images/groom.jpg',
    instagram: 'https://instagram.com/romeo',
    igHandle: '@romeo',
  },
  bride: {
    name: 'Juliet Capulet',
    nickname: 'Juliet',
    parents: 'Putri dari Bapak Lord Capulet & Ibu Lady Capulet',
    photo: '/images/bride.jpg',
    instagram: 'https://instagram.com/juliet',
    igHandle: '@juliet',
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.2, ease: 'easeOut' as const },
  }),
};

function ProfileCard({
  data,
  index,
}: {
  data: typeof coupleData.groom;
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={index}
    >
      {/* Photo */}
      <motion.div
        className="relative w-48 h-48 md:w-56 md:h-56 mb-6 rounded-full overflow-hidden 
                    border-4 border-gold/20 shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-sage-light/30 to-gold/20 flex items-center justify-center">
          <span className="font-display text-6xl text-sage">{data.nickname[0]}</span>
        </div>
        {/* Decorative ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/15 m-1" />
      </motion.div>

      {/* Name */}
      <h3 className="font-display text-3xl md:text-4xl text-charcoal mb-2">{data.name}</h3>

      {/* Parents */}
      <p className="text-sage-dark text-sm leading-relaxed max-w-[200px] mb-4">{data.parents}</p>

      {/* Instagram */}
      <a
        href={data.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-dark/50 
                   text-sage-dark text-sm hover:bg-sage hover:text-cream transition-all duration-300"
      >
        <InstagramIcon size={16} />
        <span>{data.igHandle}</span>
      </a>
    </motion.div>
  );
}

export default function CoupleProfile() {
  return (
    <section id="couple" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Bismillah */}
        <p className="text-center font-display text-lg md:text-xl text-sage mb-2 italic">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <p className="text-center text-sage-dark text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Dengan memohon Rahmat dan Ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:
        </p>
      </motion.div>

      {/* Couple cards */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-24">
        <ProfileCard data={coupleData.groom} index={0} />

        {/* Heart divider */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
        >
          <div className="w-px h-8 bg-gold/30 hidden md:block" />
          <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
            <Heart size={24} className="text-gold" fill="currentColor" />
          </div>
          <div className="w-px h-8 bg-gold/30 hidden md:block" />
        </motion.div>

        <ProfileCard data={coupleData.bride} index={1} />
      </div>
    </section>
  );
}
