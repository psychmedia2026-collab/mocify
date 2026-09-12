const tracks = [
  { title: "Neon Heart", artist: "AVA-9", tag: "AI POP" },
  { title: "Midnight Code", artist: "NOIR//01", tag: "DARK R&B" },
  { title: "Synthetic Sun", artist: "LUMA", tag: "ELECTRONIC" },
];

const artists = [
  { name: "AVA-9", genre: "AI Pop", initials: "A9", gradient: "from-fuchsia-500 via-violet-600 to-indigo-950" },
  { name: "NOIR//01", genre: "Dark R&B", initials: "N1", gradient: "from-slate-900 via-indigo-950 to-cyan-800" },
  { name: "LUMA", genre: "Electronic", initials: "LU", gradient: "from-orange-500 via-pink-600 to-violet-800" },
  { name: "SYNTHA", genre: "Future Soul", initials: "SY", gradient: "from-cyan-500 via-blue-700 to-violet-950" },
];

export default function Home() {
  return (
    <main className="mocify-shell pb-28">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="MOCIFY home">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-wing left-wing" />
            <span className="brand-core" />
            <span className="brand-wing right-wing" />
          </span>
          <span className="brand-word">MOCIFY</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a className="active" href="#home">Home</a>
          <a href="#explore">Explore</a>
          <a href="#create">Create</a>
          <a href="#artists">Artists</a>
          <a href="#premium">Premium</a>
        </nav>

        <div className="nav-actions">
          <button className="ghost-button">Log in</button>
          <button className="gradient-button small">Join MOCIFY</button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            AI MUSIC PLATFORM
          </div>

          <h1>
            AI MUSIC.
            <br />
            <span>INFINITE POSSIBILITIES.</span>
          </h1>

          <p className="hero-text">
            Discover a new generation of artists, sounds and ideas. Stream original AI music,
            build your identity and join a platform made for the future of music.
          </p>

          <div className="hero-actions">
            <button className="gradient-button">Start listening</button>
            <button className="outline-button">Start creating</button>
          </div>

          <div className="mini-stats" aria-label="MOCIFY highlights">
            <div><strong>24/7</strong><span>Discovery</span></div>
            <div><strong>AI</strong><span>First platform</span></div>
            <div><strong>∞</strong><span>New sounds</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="hero-card">
            <div className="cover-art">
              <div className="cover-noise" />
              <div className="cover-ring ring-one" />
              <div className="cover-ring ring-two" />
              <div className="cover-emblem">
                <span className="cover-bar bar-1" />
                <span className="cover-bar bar-2" />
                <span className="cover-bar bar-3" />
                <span className="cover-bar bar-4" />
                <span className="cover-bar bar-5" />
              </div>
            </div>

            <div className="now-playing">
              <div>
                <p>NOW PLAYING</p>
                <h3>Infinite Signal</h3>
                <span>MOCIFY ORIGINAL</span>
              </div>
              <button className="play-button" aria-label="Play">▶</button>
            </div>

            <div className="progress"><span /></div>
          </div>
        </div>
      </section>

      <section className="content-section" id="explore">
        <div className="section-heading">
          <div>
            <p className="eyebrow">DISCOVER</p>
            <h2>Trending on MOCIFY</h2>
          </div>
          <a href="#explore">View all →</a>
        </div>

        <div className="track-grid">
          {tracks.map((track, index) => (
            <article className="track-card" key={track.title}>
              <div className={`track-art art-${index + 1}`}>
                <span className="track-number">0{index + 1}</span>
                <button className="card-play" aria-label={`Play ${track.title}`}>▶</button>
              </div>
              <p className="track-tag">{track.tag}</p>
              <h3>{track.title}</h3>
              <span>{track.artist}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="artists" className="mx-auto w-[min(1180px,calc(100%-40px))] pb-28">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow">ARTISTS</p>
            <h2 className="m-0 text-3xl font-black tracking-[-0.04em] md:text-5xl">Popular AI Artists</h2>
          </div>
          <a className="text-sm text-violet-300" href="#artists">View all →</a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist) => (
            <article key={artist.name} className="group rounded-3xl border border-white/10 bg-white/[0.04] p-3 transition hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.07]">
              <div className={`aspect-square rounded-[22px] bg-gradient-to-br ${artist.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/25 bg-black/20 text-3xl font-black tracking-[-0.08em] backdrop-blur-sm transition group-hover:scale-105">
                  {artist.initials}
                </div>
              </div>
              <div className="px-1 pb-2 pt-4">
                <h3 className="text-lg font-bold">{artist.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{artist.genre}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="creator-strip" id="create">
        <div>
          <p className="eyebrow">FOR CREATORS</p>
          <h2>Your sound. Your identity. Your audience.</h2>
          <p>Upload your music, build an artist profile and grow inside the MOCIFY universe.</p>
        </div>
        <button className="gradient-button">Create artist profile</button>
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
