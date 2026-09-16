import StudioWorkspace from"../workspace-client";
const allowed=["analytics","earnings","promote","create","editor","mastering","projects"]as const;type Section=typeof allowed[number];
export default async function Page({params}:{params:Promise<{section:string}>}){const{section}=await params;const safe=(allowed as readonly string[]).includes(section)?section as Section:"projects";return <StudioWorkspace section={safe}/>}
