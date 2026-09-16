import { Suspense } from 'react';
import { getRSVPs } from './actions/rsvp';
import WeddingPage from './WeddingPage';

export default async function Home() {
  const wishes = await getRSVPs();

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-sage/30 border-t-sage rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sage text-sm">Memuat undangan...</p>
        </div>
      </div>
    }>
      <WeddingPage initialWishes={wishes} />
    </Suspense>
  );
}
