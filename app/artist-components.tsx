import Link from "next/link";

export function ArtistLogo() {
  return <Link className="artist-brand" href="/for-artists" aria-label="MOCIFY for Artists home">
    <img src="/mocify-bird.png?v=2" width={46} height={46} alt="" aria-hidden="true" />
    <span><b>MOCIFY</b><small>FOR ARTISTS</small></span>
  </Link>;
}

export function ArtistPortalHeader({ active = "" }: { active?: string }) {
  return <header className="artist-portal-header">
    <ArtistLogo />
    <nav aria-label="Artist portal navigation">
      <Link className={active === "plans" ? "active" : ""} href="/for-artists">Plans</Link>
      <Link className={active === "studio" ? "active" : ""} href="/studio">Studio</Link>
      <Link href="/upload">Upload</Link>
    </nav>
    <div className="artist-portal-actions">
      <Link className="artist-back" href="/">← Back to MOCIFY</Link>
      <Link className="m-secondary compact" href="/login">Artist login</Link>
      <Link className="m-primary compact" href="/signup">Get started</Link>
    </div>
  </header>;
}

export function ArtistPortalShell({ children, active = "" }: { children: React.ReactNode; active?: string }) {
  return <div className="artist-portal-shell">
    <a className="skip-link" href="#artist-main">Skip to content</a>
    <ArtistPortalHeader active={active} />
    <main id="artist-main" tabIndex={-1}>{children}</main>
    <footer className="artist-portal-footer">
      <ArtistLogo />
      <p>Built for artists, creators and the next generation of AI music.</p>
      <Link href="/">Listen on MOCIFY →</Link>
    </footer>
  </div>;
}
