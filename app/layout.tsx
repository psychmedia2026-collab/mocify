import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./mocify.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
export const metadata: Metadata = { title:{default:"MOCIFY — AI Music. Infinite Possibilities.",template:"%s | MOCIFY"},description:"Discover AI music, artists and the next generation of sound on MOCIFY." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={geist.variable}><body>{children}</body></html>}
