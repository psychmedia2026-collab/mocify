"use client";

import {useEffect,useState} from "react";
import {usePathname} from "next/navigation";
import ArtistPlayer from "./artist-player-ui";
import {readArtistSession} from "./artist-access";

function isArtistWorkspace(pathname:string){
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
  },[]);

  if(!loggedIn||!isArtistWorkspace(pathname))return null;
  return <ArtistPlayer/>;
}
