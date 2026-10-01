import{NextResponse}from"next/server";import{runPipelineSelfTest}from"../../../../lib/risk/pipeline-selftest";
export async function GET(){const result=runPipelineSelfTest();return NextResponse.json({warning:"Development-only end-to-end Risk Pipeline test using synthetic data and in-memory storage.",...result},{status:result.passed?200:500});}
