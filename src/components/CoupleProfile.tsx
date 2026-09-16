'use client';

import { motion, type Variants } from 'framer-motion';
import { Heart } from 'lucide-react';
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from '@/lib/animationVariants';

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
    name: 'Fikri Haikal',
    nickname: 'Fikri',
    parents: 'Putra dari Bapak & Ibu Haikal',
    photo: '/images/bride.jpg',
    instagram: 'https://instagram.com/mhmdfikri71._',
    igHandle: '@mhmdfikri71._',
  },
  bride: {
    name: 'Diah Sinto Rini',
    nickname: 'Diah',
    parents: 'Putri dari Bapak & Ibu Sinto',
    photo: '/images/groom.jpg',
    instagram: 'https://instagram.com/diahsntrni_',
    igHandle: '@diahsntrni_',
  },
};



function ProfileCard({
  data,
  role,
}: {
  data: typeof coupleData.groom;
  role: string;
}) {
  return (
    <motion.div
      className="glass-card p-8 md:p-10 flex flex-col items-center text-center max-w-sm w-full relative"
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(212,175,55,0.2)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Role badge */}
      <span
        className="px-3.5 py-1 rounded-full text-xs font-medium tracking-wider uppercase mb-6"
        style={{
          background: 'rgba(212, 175, 55, 0.12)',
          color: '#F3E5AB',
          border: '1px solid rgba(212, 175, 55, 0.35)',
        }}
      >
        {role}
      </span>

      {/* Glassmorphism photo frame */}
      <motion.div
        className="relative w-44 h-44 md:w-48 md:h-48 mb-6 rounded-full overflow-hidden"
        style={{
          border: '3px solid rgba(212,175,55,0.5)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.15) inset',
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <img
          src={data.photo}
          alt={data.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Glass shine ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        />
      </motion.div>

      {/* Name */}
      <h3 className="font-display text-2xl md:text-3xl mb-2" style={{ color: '#F8FAFC', fontWeight: 400 }}>
        {data.name}
      </h3>

      {/* Parents */}
      <p className="text-sm leading-relaxed max-w-[220px] mb-6" style={{ color: '#94A3B8', fontFamily: 'var(--font-body)' }}>
        {data.parents}
      </p>

      {/* Instagram */}
      <a
        href={data.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: 'rgba(212,175,55,0.12)',
          border: '1px solid rgba(212,175,55,0.35)',
          color: '#F3E5AB',
          fontFamily: 'var(--font-body)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.25)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.12)';
        }}
      >
        <InstagramIcon size={14} />
        <span>{data.igHandle}</span>
      </a>
    </motion.div>
  );
}

export default function CoupleProfile() {
  return (
    <section id="couple" className="section-container">
      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Bismillah */}
        <p className="text-center font-display text-lg md:text-xl mb-2 italic" style={{ color: '#D4AF37' }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <p className="text-center text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: '#94A3B8' }}>
          Dengan memohon Rahmat dan Ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:
        </p>
      </motion.div>

      {/* Couple cards — stagger container */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <ProfileCard data={coupleData.groom} role="Mempelai Pria" />

        {/* Heart divider */}
        <motion.div
          className="flex flex-col items-center gap-3"
          variants={scaleIn}
        >
          <div className="w-px h-8 hidden md:block" style={{ background: 'rgba(212,175,55,0.5)' }} />
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.35)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={24} fill="currentColor" style={{ color: '#D4AF37' }} />
          </motion.div>
          <div className="w-px h-8 hidden md:block" style={{ background: 'rgba(212,175,55,0.5)' }} />
        </motion.div>

        <ProfileCard data={coupleData.bride} role="Mempelai Wanita" />
      </motion.div>
    </section>
  );
}
