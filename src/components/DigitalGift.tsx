'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, CreditCard, QrCode } from 'lucide-react';

const bankAccounts = [
  {
    bank: 'Bank Central Asia (BCA)',
    accountNumber: '1234567890',
    accountName: 'Romeo Montague',
    logo: '🏦',
  },
  {
    bank: 'Bank Mandiri',
    accountNumber: '0987654321',
    accountName: 'Juliet Capulet',
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
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

      <div className="max-w-lg mx-auto space-y-4">
        {/* Bank account cards */}
        {bankAccounts.map((account, idx) => (
          <motion.div
            key={idx}
            className="card-elegant p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center">
                <CreditCard size={18} className="text-sage" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">{account.bank}</p>
                <p className="text-xs text-sage-dark">a.n. {account.accountName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 px-4 py-3 bg-cream rounded-xl font-mono text-charcoal tracking-wider text-lg">
                {account.accountNumber}
              </div>
              <motion.button
                onClick={() => copyToClipboard(account.accountNumber, idx)}
                className={`px-4 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all duration-300
                  ${copiedIndex === idx
                    ? 'bg-sage text-cream'
                    : 'bg-sage/10 text-sage hover:bg-sage/20'
                  }`}
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
          className="card-elegant p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={() => setShowQris(!showQris)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 text-gold-dark rounded-xl 
                       font-medium text-sm hover:bg-gold/20 transition-colors w-full justify-center"
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
                <div className="mt-4 p-6 bg-white rounded-xl inline-block">
                  {/* QRIS Placeholder */}
                  <div className="w-48 h-48 bg-gradient-to-br from-sage/10 to-gold/10 rounded-lg flex items-center justify-center mx-auto">
                    <QrCode size={64} className="text-sage/30" />
                  </div>
                  <p className="text-xs text-sage-dark mt-3">Scan QRIS untuk pembayaran</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

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
