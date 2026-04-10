import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const stats = db.prepare('SELECT total_participants FROM stats WHERE id = 1').get() as { total_participants: number };
    const results = db.prepare('SELECT * FROM results_stats ORDER BY count DESC').all();
    const traits = db.prepare('SELECT * FROM traits_stats ORDER BY count DESC').all();

    return NextResponse.json({
      totalParticipants: stats?.total_participants || 201312,
      results,
      traits
    });
  } catch (error) {
    console.error('Fetch stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
