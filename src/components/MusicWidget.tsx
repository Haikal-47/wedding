'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicWidgetProps {
  shouldPlay: boolean;
}

export default function MusicWidget({ shouldPlay }: MusicWidgetProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked - user needs interaction
        setIsPlaying(false);
      });
    }
  }, [shouldPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <AnimatePresence>
      {shouldPlay && (
        <motion.div
          className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Audio element */}
          <audio ref={audioRef} loop preload="auto">
            <source src="/audio/wedding-bgm.mp3" type="audio/mpeg" />
          </audio>

          {/* Mute button */}
          <motion.button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-[#2A2F35]/90 backdrop-blur-sm border border-gray-700 
                       flex items-center justify-center text-[#E8C5C8] hover:bg-[#343A42] 
                       transition-colors shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </motion.button>

          {/* Main play/pause button with disc */}
          <motion.button
            onClick={togglePlay}
            className="relative w-14 h-14 rounded-full bg-[#D48D93] text-[#1F2428] 
                       flex items-center justify-center shadow-lg shadow-black/40 
                       hover:bg-[#E8C5C8] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#1F2428]/30"
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Sound wave indicators */}
            {isPlaying && !isMuted && (
              <div className="absolute -top-1 -right-1 flex items-end gap-[2px]">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] bg-gold rounded-full"
                    animate={{ height: [4, 12, 4] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            )}

            {isPlaying ? <Pause size={18} /> : <Music size={18} />}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
