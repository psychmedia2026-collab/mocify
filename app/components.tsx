import Image from "next/image";
import Link from "next/link";
import { featuredTrack, mobileNavigation, navigation, type Release } from "./data";

export function Logo() {
  return <Link className="m-logo" href="/" aria-label="MOCIFY home">
    <Image
      src="/mocify-logo-wordmark.webp?v=3"
      width={2172}
      height={724}
      unoptimized
      alt="MOCIFY"
      style={{ width: "190px", height: "auto", maxWidth: "42vw", filter: "none" }}
    />
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
        <Link className="m-primary compact m-signup" href="/signup">Sign up</Link>
      </div>
    </header>
    <nav className="m-mobile-nav" aria-label="Mobile navigation">
      {mobileNavigation.map(({ label, href, icon }) => <Link key={href} href={href} aria-current={active === label.toLowerCase() ? "page" : undefined}><span aria-hidden="true">{icon}</span>{label}</Link>)}
    </nav>
  </>;
}

export function Player() {
  return <section className="m-player" aria-label="Music player preview">
    <div className="m-player-inner">
      <Link className="m-player-track" href={featuredTrack.href}><span className="m-player-cover" aria-hidden="true">{featuredTrack.initials}</span><span><b>{featuredTrack.title}</b><small>{featuredTrack.artist}</small></span></Link>
      <div className="m-controls" aria-label="Playback controls coming soon">
        <button type="button" disabled title="Playback coming soon" aria-label="Previous track — coming soon">↶</button>
        <button type="button" disabled className="m-play" title="Playback coming soon" aria-label="Play track — coming soon">▶</button>
        <button type="button" disabled title="Playback coming soon" aria-label="Next track — coming soon">↷</button>
      </div>
      <div className="m-player-right"><span>{featuredTrack.elapsed}</span><i aria-hidden="true"><b style={{width:`${featuredTrack.progress}%`}} /></i><span>{featuredTrack.duration}</span><Link href="/library" aria-label="Open library">♡</Link></div>
    </div>
  </section>;
}

export function Footer() {
  return <footer className="m-footer">
    <div><Logo /><p>AI MUSIC. INFINITE POSSIBILITIES.</p></div>
    <div><b>Discover</b><Link href="/explore">Explore</Link><Link href="/artists">Artists</Link><Link href="/premium">Premium</Link></div>
    <div><b>Creators</b><Link href="/upload">Upload music</Link><Link href="/signup">Join MOCIFY</Link></div>
    <div><b>MOCIFY</b><span>About — soon</span><span>Terms — soon</span><span>Privacy — soon</span></div>
    <small>© 2026 MOCIFY</small>
  </footer>;
}

export function Shell({ children, active = "", player = true }: { children: React.ReactNode; active?: string; player?: boolean }) {
  return <div className={player ? "m-shell has-player" : "m-shell"}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header active={active} />
    <main id="main-content" className="m-main-frame" tabIndex={-1}>{children}</main>
    <Footer />
    {player && <Player />}
  </div>;
}

export function ComingSoonButton({ children, className = "m-secondary", label }: { children: React.ReactNode; className?: string; label?: string }) {
  return <button type="button" className={`${className} prototype-control`} disabled title={label ?? "Coming soon"}>{children}<span className="prototype-badge">SOON</span></button>;
}

export function ReleaseCard({ r, index }: { r: Release; index: number }) {
  const card = <>
    <div className={`release-art ${r.art}`}><span className="release-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{r.detailReady ? <span className="release-play" aria-hidden="true">▶</span> : <span className="release-soon">PREVIEW SOON</span>}</div>
    <small>{r.genre}</small><h3>{r.title}</h3><p>{r.artist}</p>
  </>;
  if ("href" in r && r.href) return <Link id={r.id} className="release-card" href={r.href}>{card}</Link>;
  return <article id={r.id} className="release-card release-card-static" aria-label={`${r.title} — preview coming soon`}>{card}</article>;
}
