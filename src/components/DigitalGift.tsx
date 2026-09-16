'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, CreditCard, QrCode, Download } from 'lucide-react';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/animationVariants';


const bankAccounts = [
  {
    bank: 'Bank Central Asia (BCA)',
    accountNumber: '1234567890',
    accountName: 'Fikri Haikal',
    logo: '🏦',
  },
  {
    bank: 'Bank Mandiri',
    accountNumber: '0987654321',
    accountName: 'Diah Sinto Rini',
    logo: '🏦',
  },
];

export default function DigitalGift() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showQris, setShowQris] = useState(false);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <section id="gift" className="section-container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="section-title font-display">Amplop Digital</h2>
        <div className="ornament-divider">
          <Gift size={16} className="text-gold" />
        </div>
        <p className="section-subtitle">
          Tanpa mengurangi rasa hormat, bagi yang ingin memberikan tanda kasih untuk kedua mempelai
          dapat melalui:
        </p>
      </motion.div>

      <motion.div
        className="max-w-lg mx-auto space-y-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Bank account cards */}
        {bankAccounts.map((account, idx) => (
          <motion.div
            key={idx}
            className="glass-card p-6 md:p-7"
            variants={fadeUp}
            whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(212,175,55,0.12)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37' }}>
                <CreditCard size={18} />
              </div>
              <div>
                <p className="font-medium text-sm" style={{ color: '#F8FAFC' }}>{account.bank}</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>a.n. {account.accountName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 px-4 py-3 rounded-xl font-mono tracking-wider text-base md:text-lg"
                   style={{
                     background: 'rgba(7, 13, 30, 0.85)',
                     border: '1px solid rgba(212, 175, 55, 0.35)',
                     color: '#F3E5AB',
                   }}>
                {account.accountNumber}
              </div>
              <motion.button
                onClick={() => copyToClipboard(account.accountNumber, idx)}
                className="px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-300"
                style={{
                  background: copiedIndex === idx
                    ? '#10B981'
                    : 'linear-gradient(135deg, #D4AF37 0%, #C5A059 100%)',
                  color: copiedIndex === idx ? '#FFFFFF' : '#070D1E',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.35)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                {copiedIndex === idx ? (
                  <>
                    <Check size={16} />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Salin</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}

        {/* QRIS Section */}
        <motion.div
          className="glass-card p-6 md:p-7 text-center"
          variants={fadeUp}
        >
          <button
            onClick={() => setShowQris(!showQris)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 w-full justify-center"
            style={{
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              color: '#F3E5AB',
            }}
          >
            <QrCode size={18} />
            {showQris ? 'Sembunyikan' : 'Tampilkan'} QRIS
          </button>

          <AnimatePresence>
            {showQris && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-5 p-6 rounded-2xl inline-block max-w-xs"
                     style={{
                       background: 'rgba(15, 30, 66, 0.95)',
                       border: '1px solid rgba(212, 175, 55, 0.40)',
                       boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
                     }}>
                  <div className="w-52 h-52 bg-white rounded-xl flex items-center justify-center mx-auto overflow-hidden p-2 border border-[#D4AF37]/40 shadow-inner">
                    <img
                      src="/images/qris.png"
                      alt="QRIS Pernikahan Fikri & Diah"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-xs font-medium mt-3" style={{ color: '#F8FAFC' }}>Scan QRIS Semua Pembayaran</p>
                  <p className="text-[11px] mb-4" style={{ color: '#94A3B8' }}>GOPAY, OVO, DANA, ShopeePay, BCA, Mandiri, dll</p>
                  
                  <a
                    href="/images/qris.png"
                    download="QRIS_Fikri_Diah.png"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors"
                    style={{
                      background: 'rgba(212, 175, 55, 0.15)',
                      color: '#F3E5AB',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                    }}
                  >
                    <Download size={14} />
                    <span>Unduh QRIS</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Toast notification */}
      <AnimatePresence>
        {copiedIndex !== null && (
          <motion.div
            className="toast-notification"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            ✅ Nomor rekening berhasil disalin!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
