const artists = [
  ["AVA-9", "AI Pop", "A9", "from-fuchsia-500 via-violet-600 to-indigo-950"],
  ["NOIR//01", "Dark R&B", "N1", "from-slate-900 via-indigo-950 to-cyan-800"],
  ["LUMA", "Electronic", "LU", "from-orange-500 via-pink-600 to-violet-800"],
  ["SYNTHA", "Future Soul", "SY", "from-cyan-500 via-blue-700 to-violet-950"],
  ["KAI//X", "Alternative AI", "KX", "from-zinc-900 via-fuchsia-900 to-rose-600"],
  ["MIRA-7", "Ambient", "M7", "from-sky-500 via-indigo-700 to-slate-950"],
];

export default function ArtistsPage() {
  return <main className="mocify-shell pb-28"><Header />
    <section className="mx-auto w-[min(1180px,calc(100%-40px))] pb-12 pt-20"><p className="eyebrow">ARTISTS</p><h1 className="max-w-4xl text-5xl font-black tracking-[-0.06em] md:text-7xl">Meet the voices of a <span className="bg-gradient-to-r from-violet-300 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">new music era.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">Discover AI artists, follow their releases and explore the identities behind the music.</p></section>
    <section className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-5 pb-24 sm:grid-cols-2 lg:grid-cols-3">{artists.map(([name,genre,initials,gradient])=><article key={name} className="group rounded-3xl border border-white/10 bg-white/[0.04] p-3 transition hover:-translate-y-1 hover:bg-white/[0.07]"><div className={`flex aspect-square items-center justify-center rounded-[22px] bg-gradient-to-br ${gradient}`}><div className="grid h-32 w-32 place-items-center rounded-full border border-white/20 bg-black/20 text-4xl font-black backdrop-blur">{initials}</div></div><div className="p-4"><p className="eyebrow">{genre}</p><h2 className="text-2xl font-black">{name}</h2><button className="mt-4 rounded-full border border-white/15 px-5 py-2 text-sm font-bold">View artist</button></div></article>)}</section><Player /></main>;
}
function Header(){return <header className="topbar"><a className="brand" href="/"><span className="brand-mark"><span className="brand-wing left-wing"/><span className="brand-core"/><span className="brand-wing right-wing"/></span><span className="brand-word">MOCIFY</span></a><nav className="nav-links"><a href="/">Home</a><a href="/explore">Explore</a><a className="active" href="/artists">Artists</a><a href="/upload">Upload</a><a href="/premium">Premium</a></nav><div className="nav-actions"><button className="ghost-button">Log in</button><button className="gradient-button small">Join MOCIFY</button></div></header>}
function Player(){return <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#09090d]/90 px-4 py-3 backdrop-blur-2xl"><div className="mx-auto flex max-w-[1180px] items-center justify-between"><div><p className="text-sm font-bold">Infinite Signal</p><p className="text-xs text-zinc-500">MOCIFY ORIGINAL</p></div><div className="flex gap-4"><button>◀</button><button className="grid h-10 w-10 place-items-center rounded-full bg-white text-black">▶</button><button>▶</button></div><span className="hidden text-xs text-zinc-500 md:block">1:24 / 3:18</span></div></div>}
