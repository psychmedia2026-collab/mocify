import Link from "next/link";

export function Logo(){return <Link className="m-logo" href="/" aria-label="MOCIFY home"><span className="m-logo-icon"><i/><b/><em/><strong/><small/></span><span>MOCIFY</span></Link>}
export function Header({active=""}:{active?:string}){const nav=[["Home","/"],["Explore","/explore"],["Artists","/artists"],["Upload","/upload"],["Premium","/premium"]];return <><header className="m-header"><Logo/><nav>{nav.map(([n,h])=><Link key={n} className={active===n.toLowerCase()?"active":""} href={h}>{n}</Link>)}</nav><div className="m-account"><Link className="m-login" href="/login">Log in</Link><Link className="m-primary compact" href="/signup">Join MOCIFY</Link></div></header><nav className="m-mobile-nav">{nav.slice(0,4).map(([n,h])=><Link key={n} href={h}><span>{n==="Home"?"⌂":n==="Explore"?"⌕":n==="Artists"?"◉":"↑"}</span>{n}</Link>)}</nav></>}
export function Player(){return <div className="m-player"><div className="m-player-inner"><Link className="m-player-track" href="/track/neon-heart"><span className="m-player-cover">N</span><span><b>Neon Heart</b><small>AVA-9</small></span></Link><div className="m-controls"><button>↶</button><button className="m-play">▶</button><button>↷</button></div><div className="m-player-right"><span>1:24</span><i><b/></i><span>3:18</span><Link href="/library">♡</Link></div></div></div>}
export function Footer(){return <footer className="m-footer"><div><Logo/><p>AI MUSIC. INFINITE POSSIBILITIES.</p></div><div><b>Discover</b><Link href="/explore">Explore</Link><Link href="/artists">Artists</Link><Link href="/premium">Premium</Link></div><div><b>Creators</b><Link href="/upload">Upload</Link><Link href="/signup">Join MOCIFY</Link></div><div><b>MOCIFY</b><span>About</span><span>Terms</span><span>Privacy</span></div><small>© 2026 MOCIFY</small></footer>}
export function Shell({children,active="",player=true}:{children:React.ReactNode,active?:string,player?:boolean}){return <main className={player?"m-shell has-player":"m-shell"}><Header active={active}/>{children}<Footer/>{player&&<Player/>}</main>}

export const releases=[
 {title:"Neon Heart",artist:"AVA-9",genre:"AI POP",art:"art-a",href:"/track/neon-heart"},
 {title:"Midnight Code",artist:"NOIR//01",genre:"DARK R&B",art:"art-b",href:"/explore"},
 {title:"Synthetic Sun",artist:"LUMA",genre:"ELECTRONIC",art:"art-c",href:"/explore"},
 {title:"Velvet Machine",artist:"SYNTHA",genre:"FUTURE SOUL",art:"art-d",href:"/explore"},
 {title:"No Signal",artist:"KAI//X",genre:"ALT AI",art:"art-e",href:"/explore"},
 {title:"Afterlight",artist:"MIRA-7",genre:"AMBIENT",art:"art-f",href:"/explore"},
];
export function ReleaseCard({r,index}:{r:(typeof releases)[number],index:number}){return <Link className="release-card" href={r.href}><div className={`release-art ${r.art}`}><span>0{index+1}</span><button>▶</button><i/></div><small>{r.genre}</small><h3>{r.title}</h3><p>{r.artist}</p></Link>}
