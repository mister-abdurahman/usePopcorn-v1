import React, { useEffect, useRef } from "react";
import { useKey } from "./useKey";

export default function Input({ query, setQuery }: any) {
  const inputEl = useRef<HTMLInputElement>(null);

  function focusInput() {
    inputEl.current?.focus();
  }
  useKey("Enter", focusInput);

  return (
    <input
      type="text"
      value={query}
      ref={inputEl}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search movies..."
      className="bg-primary_light md:px-8 md:py-3 md:text-base text-xs px-3 border-none rounded-md text-white"
    />
  );
}
