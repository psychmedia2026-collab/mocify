import Image from "next/image";
import Link from "next/link";
import { featuredTrack, navigation, type Release } from "./data";

export function Logo() {
  return <Link className="m-logo" href="/" aria-label="MOCIFY home">
    <Image src="/mocify-logo.webp" width={52} height={52} alt="" />
    <span>MOCIFY</span>
  </Link>;
}

export function Header({ active = "" }: { active?: string }) {
  return <>
    <header className="m-header">
      <Logo />
      <nav aria-label="Main navigation">{navigation.map(({ label, href }) =>
        <Link key={href} className={active === label.toLowerCase() ? "active" : ""} aria-current={active === label.toLowerCase() ? "page" : undefined} href={href}>{label}</Link>
      )}</nav>
      <div className="m-account">
        <Link className="m-search" href="/explore" aria-label="Search music">⌕</Link>
        <Link className="m-login" href="/login">Log in</Link>
        <Link className="m-primary compact" href="/signup">Sign up</Link>
      </div>
    </header>
    <nav className="m-mobile-nav" aria-label="Mobile navigation">
      {navigation.map(({ label, href, icon }) => <Link key={href} href={href} aria-current={active === label.toLowerCase() ? "page" : undefined}><span aria-hidden="true">{icon}</span>{label}</Link>)}
    </nav>
  </>;
}

export function Player() {
  return <section className="m-player" aria-label="Music player">
    <div className="m-player-inner">
      <Link className="m-player-track" href={featuredTrack.href}><span className="m-player-cover" aria-hidden="true">{featuredTrack.initials}</span><span><b>{featuredTrack.title}</b><small>{featuredTrack.artist}</small></span></Link>
      <div className="m-controls"><button type="button" aria-label="Previous track">↶</button><button type="button" className="m-play" aria-label="Play track">▶</button><button type="button" aria-label="Next track">↷</button></div>
      <div className="m-player-right"><span>{featuredTrack.elapsed}</span><i aria-hidden="true"><b /></i><span>{featuredTrack.duration}</span><Link href="/library" aria-label="Open liked tracks">♡</Link></div>
    </div>
  </section>;
}

export function Footer() {
  return <footer className="m-footer">
    <div><Logo /><p>AI MUSIC. INFINITE POSSIBILITIES.</p></div>
    <div><b>Discover</b><Link href="/explore">Explore</Link><Link href="/artists">Artists</Link><Link href="/premium">Premium</Link></div>
    <div><b>Creators</b><Link href="/upload">Upload music</Link><Link href="/signup">Join MOCIFY</Link></div>
    <div><b>MOCIFY</b><span>About</span><span>Terms</span><span>Privacy</span></div>
    <small>© 2026 MOCIFY</small>
  </footer>;
}

export function Shell({ children, active = "", player = true }: { children: React.ReactNode; active?: string; player?: boolean }) {
  return <div className={player ? "m-shell has-player" : "m-shell"}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header active={active} />
    <main id="main-content" tabIndex={-1}>{children}</main>
    <Footer />
    {player && <Player />}
  </div>;
}

export function ReleaseCard({ r, index }: { r: Release; index: number }) {
  return <Link id={r.id} className="release-card" href={r.href}>
    <div className={`release-art ${r.art}`}><span className="release-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="release-play" aria-hidden="true">▶</span></div>
    <small>{r.genre}</small><h3>{r.title}</h3><p>{r.artist}</p>
  </Link>;
}
