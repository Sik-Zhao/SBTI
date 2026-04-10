import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { resultType, traits } = await req.json();

    // Increment total participants
    db.prepare('UPDATE stats SET total_participants = total_participants + 1 WHERE id = 1').run();

    // Increment specific result type
    if (resultType) {
      db.prepare(`
        INSERT INTO results_stats (type, count) VALUES (?, 1)
        ON CONFLICT(type) DO UPDATE SET count = count + 1
      `).run(resultType);
    }

    // Increment trait choices
    if (traits && Array.isArray(traits)) {
      const stmt = db.prepare(`
        INSERT INTO traits_stats (trait, count) VALUES (?, 1)
        ON CONFLICT(trait) DO UPDATE SET count = count + 1
      `);
      const transaction = db.transaction((t: string[]) => {
        for (const trait of t) {
          stmt.run(trait);
        }
      });
      transaction(traits);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
