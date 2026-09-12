const tracks = [
  { title: "Neon Heart", artist: "AVA-9", tag: "AI Pop" },
  { title: "Midnight Code", artist: "NOIR//01", tag: "Dark R&B" },
  { title: "Synthetic Sun", artist: "LUMA", tag: "Electronic" },
];

export default function Home() {
  return (
    <main className="mocify-shell">
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span>MOCIFY</span>
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
          <p className="eyebrow">THE FUTURE OF MUSIC IS HERE</p>
          <h1>
            AI MUSIC.
            <br />
            <span>INFINITE POSSIBILITIES.</span>
          </h1>
          <p className="hero-text">
            Discover a new generation of artists, sounds and ideas. Stream music,
            create your own identity and be part of a platform built for AI music.
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
              <div className="cover-glow" />
              <span className="cover-logo">M</span>
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
          <a href="#">View all →</a>
        </div>

        <div className="track-grid">
          {tracks.map((track, index) => (
            <article className="track-card" key={track.title}>
              <div className={`track-art art-${index + 1}`}>
                <button className="card-play" aria-label={`Play ${track.title}`}>▶</button>
              </div>
              <p className="track-tag">{track.tag}</p>
              <h3>{track.title}</h3>
              <span>{track.artist}</span>
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
    </main>
  );
}
