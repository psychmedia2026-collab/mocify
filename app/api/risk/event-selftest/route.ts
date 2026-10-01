import{NextResponse}from"next/server";import{runEventSelfTest}from"../../../../lib/risk/event-selftest";
export async function GET(){const result=runEventSelfTest();return NextResponse.json({warning:"Development-only Event Engine self-test. In-memory storage is not production persistence.",...result},{status:result.passed?200:500});}
