import{NextResponse}from"next/server";import{runBaselineV2SelfTest}from"../../../../lib/risk/baseline-v2-demo";
export async function GET(){const result=runBaselineV2SelfTest();return NextResponse.json({warning:"Development-only Baseline Engine V2 test with synthetic history.",...result},{status:result.passed?200:500});}
