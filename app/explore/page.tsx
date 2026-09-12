const genres = ["AI Pop", "Dark R&B", "Electronic", "Future Soul", "Afro AI", "Ambient", "Trap", "Cinematic"];

const releases = [
  { title: "Neon Heart", artist: "AVA-9", tag: "AI POP", gradient: "from-fuchsia-500 via-violet-600 to-indigo-950" },
  { title: "Midnight Code", artist: "NOIR//01", tag: "DARK R&B", gradient: "from-slate-950 via-indigo-950 to-cyan-800" },
  { title: "Synthetic Sun", artist: "LUMA", tag: "ELECTRONIC", gradient: "from-orange-500 via-pink-600 to-violet-800" },
  { title: "Velvet Machine", artist: "SYNTHA", tag: "FUTURE SOUL", gradient: "from-cyan-500 via-blue-700 to-violet-950" },
  { title: "No Signal", artist: "KAI//X", tag: "ALT AI", gradient: "from-zinc-800 via-fuchsia-900 to-rose-600" },
  { title: "Afterlight", artist: "MIRA-7", tag: "AMBIENT", gradient: "from-sky-500 via-indigo-700 to-slate-950" },
];

export default function ExplorePage() {
  return (
    <main className="mocify-shell pb-28">
      <header className="topbar">
        <a className="brand" href="/" aria-label="MOCIFY home">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-wing left-wing" />
            <span className="brand-core" />
            <span className="brand-wing right-wing" />
          </span>
          <span className="brand-word">MOCIFY</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="/">Home</a>
          <a className="active" href="/explore">Explore</a>
          <a href="/#artists">Artists</a>
          <a href="/#upload">Upload</a>
          <a href="/#premium">Premium</a>
        </nav>

        <div className="nav-actions">
          <button className="ghost-button">Log in</button>
          <button className="gradient-button small">Join MOCIFY</button>
        </div>
      </header>

      <section className="mx-auto w-[min(1180px,calc(100%-40px))] pb-12 pt-16 md:pt-24">
        <p className="eyebrow">EXPLORE</p>
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <h1 className="m-0 max-w-3xl text-5xl font-black tracking-[-0.06em] md:text-7xl">
              Find your next <span className="bg-gradient-to-r from-violet-300 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">favorite sound.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
              Explore AI artists, fresh releases and new genres from across the MOCIFY universe.
            </p>
          </div>

          <div className="flex w-full max-w-md items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-zinc-500">
            <span>⌕</span>
            <span className="text-sm">Search tracks, artists or genres</span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%-40px))] pb-16">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="eyebrow">BROWSE</p>
            <h2 className="m-0 text-3xl font-black tracking-[-0.04em] md:text-4xl">Genres</h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {genres.map((genre) => (
            <button key={genre} className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-zinc-300 transition hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-white/[0.08] hover:text-white">
              {genre}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%-40px))] pb-24">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow">NEW & TRENDING</p>
            <h2 className="m-0 text-3xl font-black tracking-[-0.04em] md:text-5xl">Discover music</h2>
          </div>
          <button className="text-sm font-bold text-violet-300">See all →</button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {releases.map((release, index) => (
            <article key={release.title} className="group rounded-3xl border border-white/10 bg-white/[0.04] p-3 transition hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.07]">
              <div className={`relative aspect-[1.2/1] overflow-hidden rounded-[22px] bg-gradient-to-br ${release.gradient}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.35),transparent_18%)]" />
                <span className="absolute left-4 top-4 text-xs font-black tracking-[0.18em] text-white/70">0{index + 1}</span>
                <button className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-white text-black shadow-2xl transition group-hover:scale-105" aria-label={`Play ${release.title}`}>
                  ▶
                </button>
              </div>
              <div className="px-1 pb-2 pt-4">
                <p className="mb-1 text-[10px] font-black tracking-[0.16em] text-violet-300">{release.tag}</p>
                <h3 className="m-0 text-xl font-bold">{release.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">{release.artist}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#09090d]/90 px-4 py-3 backdrop-blur-2xl">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">Infinite Signal</p>
              <p className="truncate text-xs text-zinc-500">MOCIFY ORIGINAL</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-zinc-500" aria-label="Previous">◀</button>
            <button className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm text-black" aria-label="Play">▶</button>
            <button className="text-zinc-500" aria-label="Next">▶</button>
          </div>
          <div className="hidden items-center justify-end gap-3 md:flex">
            <span className="text-xs text-zinc-500">1:24</span>
            <div className="h-1 w-36 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400" />
            </div>
            <span className="text-xs text-zinc-500">3:18</span>
          </div>
        </div>
      </div>
    </main>
  );
}
