import { NextResponse } from 'next/server';
import { getAdminDashboardSummary } from '@/lib/server/admin-data';
export const runtime='nodejs'; export const dynamic='force-dynamic';
export async function GET(){try{return NextResponse.json({ok:true,summary:await getAdminDashboardSummary()});}catch(error){console.error('Admin overview failed',error);return NextResponse.json({ok:false,error:'Overview query failed'},{status:500});}}
