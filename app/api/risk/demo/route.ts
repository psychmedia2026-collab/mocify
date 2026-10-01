import{NextResponse}from"next/server";import{runRiskDemo}from"../../../../lib/risk/demo";
export async function GET(){return NextResponse.json({warning:"Development/demo endpoint only. Do not expose in production.",engine:"MOCIFY Risk Engine",results:runRiskDemo()});}
