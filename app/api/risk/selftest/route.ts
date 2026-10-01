import{NextResponse}from"next/server";import{runRiskSelfTest}from"../../../../lib/risk/selftest";
export async function GET(){const result=runRiskSelfTest();return NextResponse.json({warning:"Development-only Risk Engine self-test. Remove or protect before production.",...result},{status:result.passed?200:500});}
