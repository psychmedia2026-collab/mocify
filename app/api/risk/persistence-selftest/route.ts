import{NextResponse}from"next/server";import{runPersistenceSelfTest}from"../../../../lib/risk/persistence-selftest";
export async function GET(){const result=runPersistenceSelfTest();return NextResponse.json({warning:"Development-only persistence architecture test. No production database is connected yet.",...result},{status:result.passed?200:500});}
