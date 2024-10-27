"use client";

import SearchForm from "@/components/Forms/SearchForm";
import Tabs from "./Tabs";
import { usePathname } from "next/navigation";
import { useSearchParams } from "@/hooks/useSearchParams";

export function ExploreAction() {
  const pathname = usePathname();
  const { searchParams } = useSearchParams();

  console.log(searchParams.get("query"));

  const currentPage = pathname.includes("movies")
    ? "movies"
    : pathname.includes("tv-shows")
    ? "tv-shows"
    : "search";

  const render = () => {
    switch (currentPage) {
      case "movies":
        return (
          <Tabs
            tabs={[
              { label: "Popular", value: "popular", link: "/movies/popular" },
              { label: "Top Rated", value: "top-rated", link: "/movies/top-rated" },
              { label: "Now Playing", value: "now-playing", link: "/movies/now-playing" },
              { label: "Upcoming", value: "upcoming", link: "/movies/upcoming" },
            ]}
          />
        );
      case "tv-shows":
        return (
          <Tabs
            tabs={[
              { label: "Popular", value: "popular", link: "/tv-shows/popular" },
              { label: "Top Rated", value: "top-rated", link: "/tv-shows/top-rated" },
              { label: "Airing Today", value: "airing-today", link: "/tv-shows/airing-today" },
              { label: "On TV", value: "on-tv", link: "/tv-shows/on-tv" },
            ]}
          />
        );
      case "search":
        return (
          <SearchForm
            label="Search For Movies Or TV Shows"
            placeholder="eg. The Wire"
            parentClassName="w-1/2"
            query={searchParams.get("query") || ""}
          />
        );
    }
  };

  return <div className="flex justify-center pt-5">{render()}</div>;
}
