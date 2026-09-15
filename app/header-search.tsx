"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useLanguage } from "./i18n/language-provider";

export default function HeaderSearch() {
  const router = useRouter();
  const { dictionary } = useLanguage();

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
      placeholder={dictionary.common.searchPlaceholder}
      aria-label={dictionary.common.searchMocify}
    />
    <button type="submit" aria-label={dictionary.common.search}>{dictionary.common.search}</button>
  </form>;
}
