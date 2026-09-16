'use server';

import { db } from '@/db';
import { rsvps } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type RSVPFormState = {
  success: boolean;
  message: string;
} | null;

export async function createRSVP(
  _prevState: RSVPFormState,
  formData: FormData
): Promise<RSVPFormState> {
  try {
    const name = formData.get('name') as string;
    const attendance = formData.get('attendance') as string;
    const guestCount = parseInt(formData.get('guestCount') as string) || 1;
    const message = formData.get('message') as string;

    if (!name || !attendance || !message) {
      return { success: false, message: 'Mohon lengkapi semua field yang diperlukan.' };
    }

    if (attendance !== 'HADIR' && attendance !== 'TIDAK_HADIR') {
      return { success: false, message: 'Status kehadiran tidak valid.' };
    }

    await db.insert(rsvps).values({
      name,
      attendance,
      guestCount: attendance === 'HADIR' ? guestCount : 0,
      message,
    });

    revalidatePath('/');

    return { success: true, message: 'Terima kasih! Ucapan Anda telah berhasil dikirim.' };
  } catch (error) {
    console.error('Error creating RSVP:', error);
    return { success: false, message: 'Terjadi kesalahan. Silakan coba lagi.' };
  }
}

export async function getRSVPs() {
  try {
    const results = await db.select().from(rsvps).orderBy(desc(rsvps.createdAt));
    return results;
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return [];
  }
}
