'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from '@/lib/animationVariants';


const photos = [
  { id: 1, alt: 'Momen bersama di kafe', src: '/images/prewed-1.jpg' },
  { id: 2, alt: 'Mirror selfie berdua', src: '/images/prewed-2.jpg' },
  { id: 3, alt: 'Momen kebersamaan', src: '/images/prewed-3.jpg' },
  { id: 4, alt: 'Mirror selfie elegan', src: '/images/prewed-4.jpg' },
  { id: 5, alt: 'Momen romantis berdua', src: '/images/prewed-5.jpg' },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section id="gallery" className="section-container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="section-title font-display">Galeri Foto</h2>
        <div className="ornament-divider">
          <Camera size={16} className="text-gold" />
        </div>
        <p className="section-subtitle">
          Momen-momen indah perjalanan cinta kami yang terabadikan.
        </p>
      </motion.div>

      {/* Photo Grid — stagger */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300${
              idx === photos.length - 1 && photos.length % 3 === 2
                ? ' md:col-start-2'
                : idx === photos.length - 1 && photos.length % 2 === 1
                ? ' col-span-2 md:col-span-1 md:col-start-2 max-w-xs mx-auto w-full'
                : ''
            }`}
            variants={scaleIn}
            whileHover={{ scale: 1.03 }}
            onClick={() => openLightbox(idx)}
          >
            {/* Real photo image */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />

            {/* Hover overlay with glass icon */}
            <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <motion.div
                className="w-11 h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-charcoal"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Camera size={18} className="text-sage-dark" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md 
                         flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
              onClick={closeLightbox}
            >
              <X size={22} />
            </button>

            {/* Nav buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md 
                         flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md 
                         flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              className="relative max-w-4xl max-h-[85vh] w-full rounded-2xl overflow-hidden shadow-2xl bg-black/40 flex items-center justify-center"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                className="max-h-[80vh] w-auto object-contain rounded-xl mx-auto"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/80 text-xs tracking-wider">
              {selectedIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
