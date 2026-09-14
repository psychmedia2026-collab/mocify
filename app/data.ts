/** Shared, static prototype catalog. No account data or backend is connected. */
export const navigation = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Explore", href: "/explore", icon: "⌕" },
  { label: "Artists", href: "/artists", icon: "◉" },
  { label: "Premium", href: "/premium", icon: "✦" },
];

export const mobileNavigation = [
  ...navigation,
  { label: "Library", href: "/library", icon: "♡" },
];

export const artists = [
  { name: "Andigo", genre: "AI POP", initials: "AN", gradientCss: "linear-gradient(145deg,#f04bd6 0%,#6944db 52%,#080b18 100%)", avatarCss: "linear-gradient(145deg,#e33fc5,#5b34c9 72%,#111522)", href: "/artist/andigo", profileReady: true },
  { name: "Sabrina", genre: "DARK POP", initials: "SA", gradientCss: "linear-gradient(145deg,#8c5cff 0%,#d7378e 55%,#090a18 100%)", avatarCss: "linear-gradient(145deg,#8f58ff,#b82b75 72%,#111522)", href: "/artists#sabrina", profileReady: false },
  { name: "DJ Kairo", genre: "ELECTRONIC", initials: "DK", gradientCss: "linear-gradient(145deg,#20d8e8 0%,#3444c0 55%,#080b18 100%)", avatarCss: "linear-gradient(145deg,#21cddd,#3442b6 72%,#111522)", href: "/artists#dj-kairo", profileReady: false },
  { name: "Loredana AI", genre: "MANELE", initials: "LA", gradientCss: "linear-gradient(145deg,#ff9b46 0%,#c62d9e 55%,#341054 100%)", avatarCss: "linear-gradient(145deg,#ff913d,#c72e9e 72%,#321052)", href: "/artists#loredana-ai", profileReady: false },
  { name: "Rami", genre: "R&B", initials: "RA", gradientCss: "linear-gradient(145deg,#3f78ff 0%,#5d36a8 55%,#080b18 100%)", avatarCss: "linear-gradient(145deg,#4d70ed,#482d88 72%,#111522)", href: "/artists#rami", profileReady: false },
  { name: "Zeyna", genre: "AFROHOUSE", initials: "ZE", gradientCss: "linear-gradient(145deg,#f84ca9 0%,#8d2ab8 55%,#2d1459 100%)", avatarCss: "linear-gradient(145deg,#ef4aa4,#7624a1 72%,#2d1459)", href: "/artists#zeyna", profileReady: false },
  { name: "SAYNO", genre: "TRAP", initials: "SY", gradientCss: "linear-gradient(145deg,#9b46ef 0%,#4331a9 55%,#050508 100%)", avatarCss: "linear-gradient(145deg,#9a45ee,#4b2ca2 72%,#111522)", href: "/artists#sayno", profileReady: false },
  { name: "Balkan Vibes", genre: "BALKAN", initials: "BV", gradientCss: "linear-gradient(145deg,#1bd4d5 0%,#a827a4 55%,#0d1020 100%)", avatarCss: "linear-gradient(145deg,#1bc8cf,#85269c 72%,#111522)", href: "/artists#balkan-vibes", profileReady: false },
  { name: "MIRA-7", genre: "AMBIENT", initials: "M7", gradientCss: "linear-gradient(145deg,#4fc1df 0%,#4a58bb 55%,#111526 100%)", avatarCss: "linear-gradient(145deg,#4bb6d6,#4755ad 72%,#111526)", href: "/artists#mira-7", profileReady: false },
];

export const featuredArtist = artists[0];

export const releases = [
  { id: "toca-bonbon", title: "TOCA BONBON", artist: featuredArtist.name, genre: "Manele · Pop", art: "art-a", href: "/track/toca-bonbon", detailReady: true },
  { id: "bella-ciao", title: "Bella Ciao", artist: "MOCIFY", genre: "Afrohouse · Arabic", art: "art-b", detailReady: false },
  { id: "fara-mine", title: "Fără mine", artist: "MOCIFY", genre: "Romanian · Pop", art: "art-c", detailReady: false },
  { id: "money-money", title: "Money Money", artist: "MOCIFY", genre: "Manele · Trap", art: "art-d", detailReady: false },
  { id: "kill-the-beat", title: "Kill the Beat", artist: "MOCIFY", genre: "Electronic · Trap", art: "art-e", detailReady: false },
  { id: "afterlight", title: "Afterlight", artist: "MIRA-7", genre: "Ambient", art: "art-f", href: "/artists#mira-7", detailReady: false },
  { id: "digital-touch", title: "Digital Touch", artist: featuredArtist.name, genre: "AI Pop", art: "art-b", href: "/artist/andigo#digital-touch", detailReady: false, duration: "3:25" },
  { id: "after-you", title: "After You", artist: featuredArtist.name, genre: "AI Pop", art: "art-c", href: "/artist/andigo#after-you", detailReady: false, duration: "3:32" },
  { id: "zero-gravity", title: "Zero Gravity", artist: featuredArtist.name, genre: "AI Pop", art: "art-e", href: "/artist/andigo#zero-gravity", detailReady: false, duration: "3:39" },
] as const;

export type Release = (typeof releases)[number];
export const featuredTrack = { ...releases[0], duration: "3:28", elapsed: "1:42", progress: 49, initials: "TB" };
export const likedTracks = [
  { ...releases[0], href: releases[0].href },
  { ...releases[1], href: "/explore#bella-ciao" },
  { ...releases[2], href: "/explore#fara-mine" },
];
export const artistTracks = releases.filter((release) => release.artist === featuredArtist.name).map((release) => ({
  id: release.id,
  title: release.title,
  duration: "duration" in release ? release.duration : featuredTrack.duration,
  href: "href" in release ? release.href : featuredArtist.href,
}));
export const genres = ["Manele", "Trap", "Pop", "Afrohouse", "Arabic", "Dance", "R&B", "Electronic", "Rock", "Other"];
