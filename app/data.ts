/** Shared, static prototype catalog. No account data or backend is connected. */
export const navigation = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Explore", href: "/explore", icon: "⌕" },
  { label: "Artists", href: "/artists", icon: "◉" },
  { label: "Playlists", href: "/playlists", icon: "▤" },
  { label: "Library", href: "/library", icon: "♡" },
  { label: "Radio", href: "/radio", icon: "◖" },
  { label: "Premium", href: "/premium", icon: "✦" },
];

export const mobileNavigation = [
  ...navigation,
];

export const quickNavigation = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Explore", href: "/explore", icon: "⌕" },
  { label: "Artists", href: "/artists", icon: "◉" },
  { label: "Playlists", href: "/playlists", icon: "▤" },
  { label: "MOCIFY Radio", href: "/radio", icon: "◖" },
  { label: "Library", href: "/library", icon: "♡" },
  { label: "Premium", href: "/premium", icon: "✦" },
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
  { name: "MIRA-7", genre: "AMBIENT", initials: "M7", gradientCss: "linear-gradient(145deg,#4fc1df 0%,#4a58bb 55%,#111526 100%)", avatarCss: "linear-gradient(145deg,#4bb6d6,#4755ad 72%,#111526)", href: "/artists#artist-list", profileReady: false },
];

export const featuredArtist = artists[0];

export const releases = [
  { id: "toca-bonbon", title: "Stand By", artist: featuredArtist.name, genre: "Manele · Pop", art: "art-a", href: "/track/toca-bonbon", audioSrc: "/audio/Stand-By.mp3", detailReady: true },
  { id: "bella-ciao", title: "Doar Una (Remix)", artist: "MOCIFY", genre: "Afrohouse · Arabic", art: "art-b", audioSrc: "/audio/Doar%20Una%20(Remix)%20(Remix).mp3", detailReady: false },
  { id: "fara-mine", title: "Nooit van mij", artist: "MOCIFY", genre: "Romanian · Pop", art: "art-c", audioSrc: "/audio/Nooit%20van%20mij.mp3", detailReady: false },
  { id: "money-money", title: "Money Money", artist: "MOCIFY", genre: "Manele · Trap", art: "art-d", detailReady: false },
  { id: "kill-the-beat", title: "Kill the Beat", artist: "MOCIFY", genre: "Electronic · Trap", art: "art-e", detailReady: false },
  { id: "afterlight", title: "Afterlight", artist: "MIRA-7", genre: "Ambient", art: "art-f", href: "/artists#artist-list", detailReady: false },
  { id: "digital-touch", title: "Digital Touch", artist: featuredArtist.name, genre: "AI Pop", art: "art-b", href: "/artist/andigo#digital-touch", detailReady: false, duration: "3:25" },
  { id: "after-you", title: "After You", artist: featuredArtist.name, genre: "AI Pop", art: "art-c", href: "/artist/andigo#after-you", detailReady: false, duration: "3:32" },
  { id: "zero-gravity", title: "Zero Gravity", artist: featuredArtist.name, genre: "AI Pop", art: "art-e", href: "/artist/andigo#zero-gravity", detailReady: false, duration: "3:39" },
] as const;

export type Release = (typeof releases)[number];
export const featuredTrack = { ...releases[0], duration: "3:28", elapsed: "1:42", progress: 49, initials: "SB" };
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
  audioSrc: "audioSrc" in release ? release.audioSrc : undefined,
  artist: release.artist,
  genre: release.genre,
  art: release.art,
}));
export const genres = ["Manele", "Trap", "Pop", "Afrohouse", "Arabic", "Dance", "R&B", "Electronic", "Rock", "Other"];


export const countryPlaylists = [
  { code:"INT", country:"International", title:"MOCIFY International", subtitle:"Music without borders", flag:"🌐", releaseIds:["toca-bonbon","bella-ciao","digital-touch","kill-the-beat"] },
  { code:"NL", country:"Netherlands", title:"MOCIFY Netherlands", subtitle:"Sounds from the Netherlands", flag:"🇳🇱", releaseIds:["digital-touch","after-you","zero-gravity"] },
  { code:"RO", country:"Romania", title:"MOCIFY Romania", subtitle:"Romanian releases and new voices", flag:"🇷🇴", releaseIds:["toca-bonbon","bella-ciao","fara-mine","money-money"] },
  { code:"DE", country:"Germany", title:"MOCIFY Germany", subtitle:"Electronic, pop and emerging music", flag:"🇩🇪", releaseIds:["kill-the-beat","digital-touch","afterlight"] },
  { code:"FR", country:"France", title:"MOCIFY France", subtitle:"Fresh pop and electronic discoveries", flag:"🇫🇷", releaseIds:["after-you","afterlight","digital-touch"] },
  { code:"ES", country:"Spain", title:"MOCIFY Spain", subtitle:"Warm, rhythmic and electronic sounds", flag:"🇪🇸", releaseIds:["bella-ciao","zero-gravity","after-you"] },
  { code:"GB", country:"United Kingdom", title:"MOCIFY United Kingdom", subtitle:"New pop, R&B and electronic music", flag:"🇬🇧", releaseIds:["digital-touch","after-you","kill-the-beat"] },
  { code:"US", country:"United States", title:"MOCIFY United States", subtitle:"Pop, trap and electronic discoveries", flag:"🇺🇸", releaseIds:["kill-the-beat","zero-gravity","digital-touch"] },
] as const;

export const genrePlaylists = [
  { slug:"pop", title:"Pop", subtitle:"Melodic, modern and made for repeat", releaseIds:["toca-bonbon","digital-touch","after-you"] },
  { slug:"hip-hop-rap", title:"Hip-Hop / Rap", subtitle:"Rhythm, bars and modern production", releaseIds:["money-money","kill-the-beat"] },
  { slug:"rnb", title:"R&B", subtitle:"Smooth vocals and modern soul", releaseIds:["after-you","digital-touch"] },
  { slug:"rock", title:"Rock", subtitle:"Guitars, energy and alternative sounds", releaseIds:["kill-the-beat","afterlight"] },
  { slug:"dance-electronic", title:"Dance / Electronic", subtitle:"Club, electronic and dance music", releaseIds:["kill-the-beat","zero-gravity","afterlight"] },
  { slug:"house", title:"House", subtitle:"House grooves and club rhythms", releaseIds:["zero-gravity","afterlight"] },
  { slug:"techno", title:"Techno", subtitle:"Driving electronic sounds", releaseIds:["kill-the-beat","afterlight"] },
  { slug:"trap", title:"Trap", subtitle:"Heavy rhythm and modern production", releaseIds:["money-money","kill-the-beat"] },
  { slug:"jazz", title:"Jazz", subtitle:"Jazz, fusion and improvisation", releaseIds:["afterlight"] },
  { slug:"classical", title:"Classical", subtitle:"Classical and orchestral music", releaseIds:["afterlight"] },
  { slug:"reggae", title:"Reggae", subtitle:"Reggae and related sounds", releaseIds:["bella-ciao"] },
  { slug:"latin", title:"Latin", subtitle:"Latin rhythms and crossover music", releaseIds:["bella-ciao","zero-gravity"] },
  { slug:"metal", title:"Metal", subtitle:"Heavy riffs and powerful sounds", releaseIds:[] },
  { slug:"punk", title:"Punk", subtitle:"Fast, direct and rebellious guitar music", releaseIds:[] },
] as const;

export const countryGenreMap: Record<string, readonly string[]> = {
 INT:["pop","hip-hop-rap","rnb","rock","dance-electronic","house","techno","trap","jazz","classical","reggae","latin"],
 NL:["pop","hip-hop-rap","rnb","rock","dance-electronic","house","techno","trap","jazz","reggae","levenslied","nederpop","hardstyle","gabber","trance"],
 RO:["pop","hip-hop-rap","rnb","rock","dance-electronic","house","trap","jazz","manele","lautareasca","romanian-folk","balkan"],
 DE:["pop","hip-hop-rap","rnb","rock","dance-electronic","house","techno","trap","metal","jazz","classical","schlager","krautrock"],
 FR:["pop","hip-hop-rap","rnb","rock","dance-electronic","house","techno","jazz","classical","chanson","french-house","varietes-francaises"],
 ES:["pop","hip-hop-rap","rnb","rock","dance-electronic","house","latin","reggaeton","flamenco","rumba","sevillanas","jota","jazz"],
 GB:["pop","hip-hop-rap","rnb","rock","dance-electronic","house","techno","drum-bass","grime","garage","britpop","punk","metal","folk"],
 US:["pop","hip-hop-rap","rnb","rock","dance-electronic","house","trap","country","blues","jazz","gospel","soul","funk","bluegrass","reggae","latin"],
};

export const regionalGenres: Record<string,{slug:string;title:string;subtitle:string;releaseIds:readonly string[]}[]> = {
 NL:[
  {slug:"levenslied",title:"Levenslied",subtitle:"Dutch life songs and sing-along tradition",releaseIds:["fara-mine","after-you"]},
  {slug:"nederpop",title:"Nederpop",subtitle:"Dutch-language and Dutch pop",releaseIds:["digital-touch","after-you"]},
  {slug:"hardstyle",title:"Hardstyle",subtitle:"Hard dance with a Dutch pulse",releaseIds:["kill-the-beat","zero-gravity"]},
  {slug:"gabber",title:"Gabber",subtitle:"Fast, hard-edged Dutch electronic music",releaseIds:["kill-the-beat"]},
  {slug:"trance",title:"Trance",subtitle:"Melodic electronic club music",releaseIds:["zero-gravity","afterlight"]},
 ],
 RO:[
  {slug:"manele",title:"Manele",subtitle:"Romanian pop-folk and modern crossover",releaseIds:["toca-bonbon","money-money"]},
  {slug:"lautareasca",title:"Lăutărească",subtitle:"Romanian lăutari musical tradition",releaseIds:["toca-bonbon","bella-ciao"]},
  {slug:"romanian-folk",title:"Romanian Folk",subtitle:"Traditional and contemporary Romanian folk",releaseIds:["fara-mine","bella-ciao"]},
  {slug:"balkan",title:"Balkan",subtitle:"Balkan rhythms and crossover sounds",releaseIds:["bella-ciao","money-money"]},
 ],
 DE:[
  {slug:"schlager",title:"Schlager",subtitle:"German popular sing-along music",releaseIds:["after-you","digital-touch"]},
  {slug:"krautrock",title:"Krautrock",subtitle:"German experimental rock tradition",releaseIds:["afterlight","kill-the-beat"]},
 ],
 FR:[
  {slug:"chanson",title:"Chanson",subtitle:"French lyric-driven popular song",releaseIds:["after-you","fara-mine"]},
  {slug:"french-house",title:"French House",subtitle:"French electronic and filter-house sound",releaseIds:["zero-gravity","afterlight"]},
  {slug:"varietes-francaises",title:"Variétés françaises",subtitle:"French popular music",releaseIds:["digital-touch","after-you"]},
 ],
 ES:[
  {slug:"reggaeton",title:"Reggaeton",subtitle:"Latin urban dance rhythms",releaseIds:["bella-ciao","zero-gravity"]},
  {slug:"flamenco",title:"Flamenco",subtitle:"Spanish flamenco tradition and crossover",releaseIds:["bella-ciao","fara-mine"]},
  {slug:"rumba",title:"Rumba",subtitle:"Spanish rumba and rhythmic crossover",releaseIds:["bella-ciao","toca-bonbon"]},
  {slug:"sevillanas",title:"Sevillanas",subtitle:"Andalusian song and dance tradition",releaseIds:["bella-ciao"]},
  {slug:"jota",title:"Jota",subtitle:"Regional Spanish folk and dance music",releaseIds:["fara-mine"]},
 ],
 GB:[
  {slug:"drum-bass",title:"Drum & Bass",subtitle:"Fast UK electronic breakbeats",releaseIds:["kill-the-beat","zero-gravity"]},
  {slug:"grime",title:"Grime",subtitle:"UK urban electronic and rap sound",releaseIds:["money-money","kill-the-beat"]},
  {slug:"garage",title:"UK Garage",subtitle:"UK club rhythms and vocal garage",releaseIds:["digital-touch","zero-gravity"]},
  {slug:"britpop",title:"Britpop",subtitle:"British guitar-pop tradition",releaseIds:["after-you","afterlight"]},
  {slug:"folk",title:"British Folk",subtitle:"Folk traditions from across the UK",releaseIds:["fara-mine","afterlight"]},
 ],
 US:[
  {slug:"country",title:"Country",subtitle:"American country music",releaseIds:["after-you","fara-mine"]},
  {slug:"blues",title:"Blues",subtitle:"American blues tradition",releaseIds:["afterlight","fara-mine"]},
  {slug:"gospel",title:"Gospel",subtitle:"Gospel voices and spiritual roots",releaseIds:["after-you"]},
  {slug:"soul",title:"Soul",subtitle:"Soul vocals and grooves",releaseIds:["after-you","digital-touch"]},
  {slug:"funk",title:"Funk",subtitle:"Groove-driven American funk",releaseIds:["digital-touch","zero-gravity"]},
  {slug:"bluegrass",title:"Bluegrass",subtitle:"American acoustic roots music",releaseIds:["fara-mine"]},
 ],
};
