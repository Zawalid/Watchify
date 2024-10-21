"use client";

import { usePathname, useRouter, useSearchParams as useSp } from "next/navigation";

export const useSearchParams = () => {
  const searchParams = useSp();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (!value) params.delete(key);
    else params.set(key, value);

    console.log(key, value, params);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { searchParams, setSearchParams };
};

export const useSearchQuery = () => {
  const { searchParams, setSearchParams } = useSearchParams();
  const query = searchParams.get("query") || "";

  const setQuery = (value: string | null) => setSearchParams("query", value);

  return { query, setQuery };
};
