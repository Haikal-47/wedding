'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import type { RSVPSelect } from '@/db/schema';

import HeroCover from '@/components/HeroCover';
import MusicWidget from '@/components/MusicWidget';
import CoupleProfile from '@/components/CoupleProfile';
import EventDetail from '@/components/EventDetail';
import LoveStory from '@/components/LoveStory';
import Gallery from '@/components/Gallery';
import DigitalGift from '@/components/DigitalGift';
import RsvpGuestbook from '@/components/RsvpGuestbook';
import Footer from '@/components/Footer';

function WeddingContent({ initialWishes }: { initialWishes: RSVPSelect[] }) {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to')?.replace(/\+/g, ' ') || '';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hero Cover Overlay */}
      <HeroCover guestName={guestName} onOpen={() => setIsOpen(true)} />

      {/* Floating Music Widget */}
      <MusicWidget shouldPlay={isOpen} />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Hero / Opening section with quote */}
        <section className="relative py-20 md:py-28 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-pattern" />
          <motion.div
            className="relative z-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-lg md:text-xl text-sage italic leading-relaxed mb-6">
              &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu 
              pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, 
              dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;
            </p>
            <p className="text-gray-700 text-sm font-medium">— QS. Ar-Rum: 21</p>
          </motion.div>
        </section>

        {/* Section divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent" />

        {/* Couple Profile */}
        <CoupleProfile />

        <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent" />

        {/* Event Detail + Countdown */}
        <div className="bg-[#CBCCD1]/30">
          <EventDetail />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent" />

        {/* Love Story Timeline */}
        <LoveStory />

        <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent" />

        {/* Photo Gallery */}
        <div className="bg-[#CBCCD1]/30">
          <Gallery />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent" />

        {/* Digital Gift / Amplop */}
        <DigitalGift />

        <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent" />

        {/* RSVP & Guestbook */}
        <div className="bg-[#CBCCD1]/30">
          <RsvpGuestbook guestName={guestName} initialWishes={initialWishes} />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent" />

        {/* Footer */}
        <Footer />
      </motion.main>
    </>
  );
}

export default function WeddingPage({ initialWishes }: { initialWishes: RSVPSelect[] }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-sage/30 border-t-sage rounded-full animate-spin" />
      </div>
    }>
      <WeddingContent initialWishes={initialWishes} />
    </Suspense>
  );
}
