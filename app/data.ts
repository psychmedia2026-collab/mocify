/** Shared, static prototype catalog. No account data or backend is connected. */
export const navigation = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Explore", href: "/explore", icon: "⌕" },
  { label: "Artists", href: "/artists", icon: "◉" },
  { label: "Upload", href: "/upload", icon: "↑" },
  { label: "Premium", href: "/premium", icon: "✦" },
];

export const artists = [
  { name: "Andigo", genre: "AI POP", initials: "AN", gradient: "from-fuchsia-500 via-purple-700 to-slate-950", avatarGradient: "from-fuchsia-600 to-violet-900", href: "/artist/andigo" },
  { name: "Sabrina", genre: "DARK POP", initials: "SA", gradient: "from-violet-500 via-pink-700 to-slate-950", avatarGradient: "from-violet-500 to-pink-800", href: "/artists#sabrina" },
  { name: "DJ Kairo", genre: "ELECTRONIC", initials: "DK", gradient: "from-cyan-400 via-indigo-700 to-slate-950", avatarGradient: "from-cyan-500 to-indigo-900", href: "/artists#dj-kairo" },
  { name: "Loredana AI", genre: "MANELE", initials: "LA", gradient: "from-orange-400 via-pink-700 to-violet-950", avatarGradient: "from-orange-500 to-fuchsia-800", href: "/artists#loredana-ai" },
  { name: "Rami", genre: "R&B", initials: "RA", gradient: "from-blue-500 via-violet-800 to-slate-950", avatarGradient: "from-indigo-500 to-slate-900", href: "/artists#rami" },
  { name: "Zeyna", genre: "AFROHOUSE", initials: "ZE", gradient: "from-pink-500 via-fuchsia-700 to-violet-950", avatarGradient: "from-pink-500 to-violet-900", href: "/artists#zeyna" },
  { name: "SAYNO", genre: "TRAP", initials: "SY", gradient: "from-purple-500 via-indigo-800 to-black", avatarGradient: "from-purple-500 to-fuchsia-900", href: "/artists#sayno" },
  { name: "Balkan Vibes", genre: "BALKAN", initials: "BV", gradient: "from-cyan-500 via-fuchsia-700 to-slate-950", avatarGradient: "from-cyan-500 to-purple-900", href: "/artists#balkan-vibes" },
];

export const featuredArtist = artists[0];

export const releases = [
  { id: "toca-bonbon", title: "TOCA BONBON", artist: featuredArtist.name, genre: "Manele · Pop", art: "art-a", href: "/track/toca-bonbon" },
  { id: "bella-ciao", title: "Bella Ciao", artist: "MOCIFY", genre: "Afrohouse · Arabic", art: "art-b", href: "/explore#bella-ciao" },
  { id: "fara-mine", title: "Fără mine", artist: "MOCIFY", genre: "Romanian · Pop", art: "art-c", href: "/explore#fara-mine" },
  { id: "money-money", title: "Money Money", artist: "MOCIFY", genre: "Manele · Trap", art: "art-d", href: "/explore#money-money" },
  { id: "kill-the-beat", title: "Kill the Beat", artist: "MOCIFY", genre: "Electronic · Trap", art: "art-e", href: "/explore#kill-the-beat" },
  { id: "afterlight", title: "Afterlight", artist: "MIRA-7", genre: "Ambient", art: "art-f", href: "/explore" },
];

export type Release = (typeof releases)[number];
export const featuredTrack = { ...releases[0], duration: "3:28", elapsed: "1:42", initials: "TB" };
export const likedTracks = releases.slice(0, 3);
export const artistTracks = [
  { title: featuredTrack.title, duration: featuredTrack.duration, href: featuredTrack.href },
  { title: "Digital Touch", duration: "3:25" },
  { title: "After You", duration: "3:32" },
  { title: "Zero Gravity", duration: "3:39" },
];
export const genres = ["Manele", "Trap", "Pop", "Afrohouse", "Arabic", "Dance", "R&B", "Electronic", "Rock", "Other"];
