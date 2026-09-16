'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react';
import { generateGoogleCalendarUrl } from '@/lib/utils';
import CountdownTimer from './CountdownTimer';
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from '@/lib/animationVariants';

const eventDate = new Date('2026-12-20T08:00:00+07:00');

const events = [
  {
    title: 'Akad Nikah',
    icon: <Calendar size={20} />,
    date: 'Minggu, 20 Desember 2026',
    time: '08:00 - 10:00 WIB',
    venue: 'Masjid Istiqlal',
    address: 'Jl. Taman Wijaya Kusuma, Ps. Baru, Kecamatan Sawah Besar, Jakarta Pusat',
    mapsUrl: 'https://maps.app.goo.gl/example1',
    calendarStart: new Date('2026-12-20T08:00:00+07:00'),
    calendarEnd: new Date('2026-12-20T10:00:00+07:00'),
  },
  {
    title: 'Resepsi',
    icon: <Clock size={20} />,
    date: 'Minggu, 20 Desember 2026',
    time: '11:00 - 14:00 WIB',
    venue: 'Balai Kartini',
    address: 'Jl. Gatot Subroto Kav. 37, RT.2/RW.1, Kuningan Barat, Jakarta Selatan',
    mapsUrl: 'https://maps.app.goo.gl/example2',
    calendarStart: new Date('2026-12-20T11:00:00+07:00'),
    calendarEnd: new Date('2026-12-20T14:00:00+07:00'),
  },
];

export default function EventDetail() {
  return (
    <section id="event" className="section-container">
      {/* Section heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="section-title font-display">Waktu &amp; Tempat</h2>
        <div className="ornament-divider">
          <Calendar size={16} className="text-gold" />
        </div>
        <p className="section-subtitle">
          Dengan penuh kebahagiaan, kami mengundang Anda untuk hadir di acara pernikahan kami.
        </p>
      </motion.div>

      {/* Countdown */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <CountdownTimer targetDate={eventDate} />
      </motion.div>

      {/* Event cards — stagger */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 mt-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {events.map((event) => (
          <motion.div
            key={event.title}
            className="glass-card p-8 text-center"
            variants={fadeUp}
            whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(212,175,55,0.15)' }}
          >
            {/* Event icon */}
            <div className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center"
                 style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.35)' }}>
              <span style={{ color: '#D4AF37' }}>{event.icon}</span>
            </div>

            <h3 className="font-display text-2xl md:text-3xl mb-4" style={{ color: '#F8FAFC', fontWeight: 400 }}>{event.title}</h3>

            <div className="space-y-3 text-sm mb-6" style={{ color: '#CBD5E1', fontFamily: 'var(--font-body)' }}>
              <div className="flex items-center justify-center gap-2">
                <Calendar size={14} style={{ color: '#D4AF37' }} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock size={14} style={{ color: '#D4AF37' }} />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin size={14} style={{ color: '#D4AF37' }} />
                <span className="font-medium" style={{ color: '#F8FAFC' }}>{event.venue}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>{event.address}</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs"
              >
                <MapPin size={14} />
                Buka Google Maps
                <ExternalLink size={12} />
              </a>
              <a
                href={generateGoogleCalendarUrl({
                  title: `${event.title} - Pernikahan Fikri Haikal & Diah Sinto Rini`,
                  startDate: event.calendarStart,
                  endDate: event.calendarEnd,
                  location: `${event.venue}, ${event.address}`,
                  description: `Undangan ${event.title} pernikahan Fikri Haikal & Diah Sinto Rini`,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs"
              >
                <CalendarPlus size={14} />
                Simpan Tanggal
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
