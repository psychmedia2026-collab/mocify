"use client";

import {useEffect,useState} from "react";
import {usePathname} from "next/navigation";
import ArtistPlayer from "./artist-player-ui";
import {readArtistSession} from "./artist-access";

function isStudioDepartment(pathname:string){
  return pathname==="/studio/projects"||pathname.startsWith("/studio/projects/")||
    pathname==="/studio/create"||pathname.startsWith("/studio/create/")||
    pathname==="/studio/editor"||pathname.startsWith("/studio/editor/")||
    pathname==="/studio/mastering"||pathname.startsWith("/studio/mastering/");
}

function isArtistWorkspace(pathname:string){
  if(isStudioDepartment(pathname))return false;
  return pathname==="/dashboard"||pathname.startsWith("/dashboard/")||
    pathname==="/upload"||pathname.startsWith("/upload/")||
    pathname==="/studio"||pathname.startsWith("/studio/");
}

export default function ArtistPlayerHost(){
  const pathname=usePathname();
  const [loggedIn,setLoggedIn]=useState(false);

  useEffect(()=>{
    const sync=()=>setLoggedIn(Boolean(readArtistSession()));
    sync();
    addEventListener("mocify-artist-session-change",sync);
    addEventListener("storage",sync);
    return()=>{
      removeEventListener("mocify-artist-session-change",sync);
      removeEventListener("storage",sync);
    };
  },[pathname]);

  if(!loggedIn||!isArtistWorkspace(pathname))return null;
  return <ArtistPlayer/>;
}
