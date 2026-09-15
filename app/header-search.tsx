"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function HeaderSearch() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q")?.toString().trim() ?? "";
    router.push(query ? `/explore?q=${encodeURIComponent(query)}` : "/explore");
  };

  return <form className="m-search-form" onSubmit={handleSubmit} role="search">
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
