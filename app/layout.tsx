import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./mocify.css";
import "./artist-plans.css";
import "./artist-portal.css";
import "./audit.css";
import "./frame.css";
import "./hero-reference.css";
import "./listener-banner.css";
import "./listener-navigation.css";
import "./section-hero.css";
import "./mockup-reference.css";
import "./i18n/language-switcher.css";
import "./mobile-player-fix.css";
import "./player-visualizer.css";
import "./playlists/playlists.css";
import "./artist-dashboard-shell.css";
import "./artist-player.css";
import { ListenerPlayerProvider } from "./listener-player";
import { LanguageProvider } from "./i18n/language-provider";
import ArtistPlayerHost from "./artist-player-host";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const viewport: Viewport = { width:"device-width", initialScale:1, viewportFit:"cover", themeColor:"#03040a" };
export const metadata: Metadata = { title:{default:"MOCIFY — AI Music. Infinite Possibilities.",template:"%s | MOCIFY"},description:"Discover AI music, artists and the next generation of sound on MOCIFY.",icons:{icon:{url:"/mocify-bird.png?v=2",type:"image/png"}} };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={geist.variable}><body><LanguageProvider><ListenerPlayerProvider>{children}<ArtistPlayerHost/></ListenerPlayerProvider></LanguageProvider></body></html>}
