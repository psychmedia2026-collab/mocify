import{NextResponse}from"next/server";import{runBaselineSelfTest}from"../../../../lib/risk/baseline-selftest";
export async function GET(){const result=runBaselineSelfTest();return NextResponse.json({warning:"Development-only Baseline Engine self-test. Remove or protect before production.",...result},{status:result.passed?200:500});}
