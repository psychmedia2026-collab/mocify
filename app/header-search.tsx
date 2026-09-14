"use client";

import { useSearchParams } from "next/navigation";

export default function HeaderSearch() {
  const params = useSearchParams();
  const current = params.get("q") ?? "";

  return <form className="m-search-form" action="/explore" method="get" role="search">
    <span aria-hidden="true">⌕</span>
    <input
      type="search"
      name="q"
      defaultValue={current}
      placeholder="Search music, artists, genres..."
      aria-label="Search MOCIFY"
    />
    <button type="submit" aria-label="Search">Search</button>
  </form>;
}
