'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { id: 1, alt: 'Pre-wedding 1', color: 'from-sage/20 to-gold/10' },
  { id: 2, alt: 'Pre-wedding 2', color: 'from-gold/20 to-sage/10' },
  { id: 3, alt: 'Pre-wedding 3', color: 'from-sage-light/20 to-cream-dark' },
  { id: 4, alt: 'Pre-wedding 4', color: 'from-gold/15 to-sage-light/15' },
  { id: 5, alt: 'Pre-wedding 5', color: 'from-sage-dark/10 to-gold/15' },
  { id: 6, alt: 'Pre-wedding 6', color: 'from-cream-dark to-sage/10' },
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title font-display">Galeri Foto</h2>
        <div className="ornament-divider">
          <Camera size={16} className="text-gold" />
        </div>
        <p className="section-subtitle">
          Momen-momen indah perjalanan cinta kami yang terabadikan.
        </p>
      </motion.div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => openLightbox(idx)}
          >
            {/* Placeholder gradient */}
            <div className={`w-full h-full bg-gradient-to-br ${photo.color} flex items-center justify-center`}>
              <div className="text-center">
                <Camera size={28} className="text-sage/30 mx-auto mb-2" />
                <span className="text-xs text-sage/40 font-medium">Foto {photo.id}</span>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center">
              <motion.div
                className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
              >
                <Camera size={16} className="text-charcoal" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

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
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm 
                         flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={closeLightbox}
            >
              <X size={20} />
            </button>

            {/* Nav buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm 
                         flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm 
                         flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight size={20} />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              className="relative max-w-3xl max-h-[80vh] w-full aspect-square rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-full h-full bg-gradient-to-br ${photos[selectedIndex].color} flex items-center justify-center`}>
                <div className="text-center">
                  <Camera size={48} className="text-sage/30 mx-auto mb-3" />
                  <span className="text-sage/40 font-medium">{photos[selectedIndex].alt}</span>
                </div>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {selectedIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
