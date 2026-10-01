import { NextRequest, NextResponse } from 'next/server';
import { createArtist, listAdminArtists } from '@/lib/server/artists';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({ ok: true, artists: await listAdminArtists() });
  } catch (error) {
    console.error('Admin artist list failed', error);
    return NextResponse.json({ ok: false, error: 'Artist database query failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const displayName = typeof body.displayName === 'string' ? body.displayName.trim() : '';
    const allowedPlans = new Set(['ARTIST_FREE','ARTIST_PRO','ARTIST_MAX']);
    const plan = allowedPlans.has(body.plan) ? body.plan : 'ARTIST_FREE';
    const countryCode = typeof body.countryCode === 'string' && /^[A-Za-z]{2}$/.test(body.countryCode)
      ? body.countryCode.toUpperCase() : null;

    if (!email || !displayName || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Valid email and displayName are required' }, { status: 400 });
    }

    const created = await createArtist({ email, displayName, plan, countryCode });
    return NextResponse.json({ ok: true, artist: created }, { status: 201 });
  } catch (error: unknown) {
    console.error('Admin artist create failed', error);
    const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';
    if (code === '23505') return NextResponse.json({ ok: false, error: 'Email or public ID already exists' }, { status: 409 });
    return NextResponse.json({ ok: false, error: 'Artist creation failed' }, { status: 500 });
  }
}
