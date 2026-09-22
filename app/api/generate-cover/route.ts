import{NextResponse}from"next/server";

const MODEL="gpt-image-2.5-flare";
const MAX_PROMPT=1200;

export async function POST(request:Request){
 try{
  if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:"AI cover generation is not configured yet."},{status:503});
  const body=await request.json();
  const title=String(body?.title||"").trim().slice(0,120);
  const artist=String(body?.artist||"").trim().slice(0,120);
  const genre=String(body?.genre||"").trim().slice(0,120);
  const description=String(body?.description||"").trim().slice(0,MAX_PROMPT);
  if(!description)return NextResponse.json({error:"Describe the cover you want first."},{status:400});
  const prompt=[
   "Create a professional square music single cover artwork for MOCIFY.",
   title?`Track title: ${title}.`:"",
   artist?`Artist: ${artist}.`:"",
   genre?`Genre: ${genre}.`:"",
   `Creative direction: ${description}.`,
   "Composition must work as a small streaming thumbnail. Do not add logos, watermarks, platform branding, UI elements, or extra text. Do not render the track title or artist name unless the creative direction explicitly asks for typography."
  ].filter(Boolean).join(" ");
  const response=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:MODEL,prompt,n:1,size:"1024x1024",quality:"medium",output_format:"webp",output_compression:90})});
  const data=await response.json();
  if(!response.ok){console.error("MOCIFY cover API error",response.status,data?.error?.code||data?.error?.type);return NextResponse.json({error:"MOCIFY AI could not generate a cover right now."},{status:response.status===429?429:502})}
  const image=data?.data?.[0]?.b64_json;
  if(typeof image!=="string"||!image)return NextResponse.json({error:"MOCIFY AI returned no cover image."},{status:502});
  return NextResponse.json({image,mimeType:"image/webp",model:MODEL});
 }catch(error){console.error("MOCIFY cover route error",error);return NextResponse.json({error:"MOCIFY AI could not generate a cover right now."},{status:500})}
}
