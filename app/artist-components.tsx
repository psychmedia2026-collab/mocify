"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import CreatorPlaybackStop from "./creator-playback-stop";
import LanguageSwitcher from "./i18n/language-switcher";
import {useLanguage} from "./i18n/language-provider";
import {artistTranslations} from "./i18n/artist-translations";
import {clearArtistSession,readArtistSession} from "./artist-access";

export function ArtistLogo(){const{locale}=useLanguage();const t=artistTranslations[locale];const homeLabel=locale==="nl"?"MOCIFY voor Artiesten home":locale==="ro"?"Pagina principală MOCIFY pentru artiști":"MOCIFY for Artists home";return <Link className="artist-brand" href="/for-artists" aria-label={homeLabel}><img src="/mocify-bird.png?v=2" width={46} height={46} alt="" aria-hidden="true"/><span><b>MOCIFY</b><small>{t.forArtists}</small></span></Link>;}

export function ArtistPortalHeader({active=""}:{active?:string}){const router=useRouter();const{locale}=useLanguage();const t=artistTranslations[locale];const[loggedIn,setLoggedIn]=useState(false);useEffect(()=>{const sync=()=>setLoggedIn(Boolean(readArtistSession()));sync();addEventListener("mocify-artist-session-change",sync);addEventListener("storage",sync);return()=>{removeEventListener("mocify-artist-session-change",sync);removeEventListener("storage",sync)}},[]);const logoutLabel=locale==="nl"?"Artist uitloggen":locale==="ro"?"Deconectare Artist":"Artist log out";const loginLabel=locale==="nl"?"Artist inloggen":locale==="ro"?"Autentificare Artist":"Artist log in";const logout=()=>{clearArtistSession();setLoggedIn(false);window.dispatchEvent(new Event("mocify-artist-session-change"));router.replace("/for-artists/login")};return <header className="artist-portal-header"><ArtistLogo/><nav aria-label={t.nav}><Link className={active==="plans"?"active":""} href="/for-artists">{t.plans}</Link><Link className={active==="studio"?"active":""} href="/dashboard">{t.studio}</Link><Link className={active==="upload"?"active":""} href="/upload">{t.upload}</Link></nav><div className="artist-portal-actions"><LanguageSwitcher/><Link className="artist-back" href="/">{t.back}</Link>{loggedIn?<button type="button" className="m-secondary compact" onClick={logout}>{logoutLabel}</button>:<Link className="m-secondary compact" href="/for-artists/login">{loginLabel}</Link>}<Link className="m-primary compact" href="/for-artists/signup">{t.getStarted}</Link></div></header>;}

export function ArtistPortalShell({children,active=""}:{children:React.ReactNode;active?:string}){const{locale}=useLanguage();const t=artistTranslations[locale];return <div className="artist-portal-shell"><CreatorPlaybackStop/><a className="skip-link" href="#artist-main">{t.skip}</a><ArtistPortalHeader active={active}/><main id="artist-main" tabIndex={-1}>{children}</main><footer className="artist-portal-footer"><ArtistLogo/><p>{t.footer}</p><Link href="/">{t.listen}</Link></footer></div>;}
