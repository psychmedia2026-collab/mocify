export default function HeaderSearch() {
  return <form className="m-search-form" action="/explore" method="get" role="search">
    <span aria-hidden="true">⌕</span>
    <input
      type="search"
      name="q"
      placeholder="Search music, artists, genres..."
      aria-label="Search MOCIFY"
    />
    <button type="submit" aria-label="Search">Search</button>
  </form>;
}
