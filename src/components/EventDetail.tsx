'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react';
import { generateGoogleCalendarUrl } from '@/lib/utils';
import CountdownTimer from './CountdownTimer';

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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title font-display">Waktu & Tempat</h2>
        <div className="ornament-divider">
          <Calendar size={16} className="text-gold" />
        </div>
        <p className="section-subtitle">
          Dengan penuh kebahagiaan, kami mengundang Anda untuk hadir di acara pernikahan kami.
        </p>
      </motion.div>

      {/* Countdown */}
      <CountdownTimer targetDate={eventDate} />

      {/* Event cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {events.map((event, idx) => (
          <motion.div
            key={event.title}
            className="card-elegant p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            {/* Event icon */}
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-sage/10 flex items-center justify-center text-sage">
              {event.icon}
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-4">{event.title}</h3>

            <div className="space-y-3 text-sm text-sage-dark mb-6">
              <div className="flex items-center justify-center gap-2">
                <Calendar size={14} className="text-gold" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock size={14} className="text-gold" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin size={14} className="text-gold" />
                <span className="font-medium text-charcoal">{event.venue}</span>
              </div>
              <p className="text-xs leading-relaxed">{event.address}</p>
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
                  title: `${event.title} - Pernikahan Romeo & Juliet`,
                  startDate: event.calendarStart,
                  endDate: event.calendarEnd,
                  location: `${event.venue}, ${event.address}`,
                  description: `Undangan ${event.title} pernikahan Romeo & Juliet`,
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
      </div>
    </section>
  );
}
