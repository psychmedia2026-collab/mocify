import{NextResponse}from"next/server";import{runCaseSelfTest}from"../../../../lib/risk/case-selftest";
export async function GET(){const result=runCaseSelfTest();return NextResponse.json({warning:"Development-only Risk Case Management test. No production payout service or authorization provider is connected.",...result},{status:result.passed?200:500});}
