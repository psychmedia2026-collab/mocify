import BusinessWorkspace from"../business-workspace";
import StudioWorkspace from"../workspace-client";

const business=["analytics","earnings","promote"]as const;
const creative=["create","editor","mastering","projects"]as const;

type BusinessSection=typeof business[number];
type CreativeSection=typeof creative[number];

export default async function Page({params}:{params:Promise<{section:string}>}){
 const{section}=await params;
 if((business as readonly string[]).includes(section))return <BusinessWorkspace section={section as BusinessSection}/>;
 const safe=(creative as readonly string[]).includes(section)?section as CreativeSection:"projects";
 return <StudioWorkspace section={safe}/>;
}
