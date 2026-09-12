import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./mocify.css";
import "./audit.css";
import "./frame.css";
import "./hero-reference.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#03040a",
};

export const metadata: Metadata = {
  title:{default:"MOCIFY — AI Music. Infinite Possibilities.",template:"%s | MOCIFY"},
  description:"Discover AI music, artists and the next generation of sound on MOCIFY.",
  icons:{icon:"/mocify-logo.webp"},
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en" className={geist.variable}><body>{children}</body></html>;
}
