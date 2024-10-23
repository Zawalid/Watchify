"use client";

import { useState } from "react";
import CardsList from "../components/CardsList";
// import { EmptyWatchList } from "../components/Status";
// import { getMediaType } from "@/lib/utils";
import Link from "next/link";

type Tab = {
  tab: "all" | "movie" | "tv";
  indicator: { left: number; width: number };
};

export default function Tabs({ data }: { data: TMDBResponse }) {
  const [currentTab, setCurrentTab] = useState<Tab>({
    tab: "all",
    indicator: { left: 8, width: 81 },
  });

  const tabs = [
    { label: "All", value: "all", count: data.results.length },
    { label: "Movies", value: "movie", count: data.results.length },
    { label: "TV Shows", value: "tv", count: data.results.length },
  ];
  return (
    <>
      <ul className="relative flex w-fit gap-5 rounded-xl bg-Black/20 p-2 backdrop-blur-2xl">
        <div
          className="absolute top-1/2 -z-10 h-[calc(100%-16px)] -translate-y-1/2 rounded-lg bg-Primary/400 transition-[left] duration-500"
          style={{
            left: `${currentTab.indicator.left}px`,
            width: `${currentTab.indicator.width}px`,
          }}
        ></div>
        {tabs.map(({ label, value }) => (
          <li key={value}>
            <button
              className={`px-8 py-2 text-sm transition-colors duration-200 font-medium ${
                currentTab.tab === value ? "text-Primary/50" : "text-Grey/300 hover:text-Grey/600"
              }`}
              onClick={(e) => {
                setCurrentTab({
                  tab: value as Tab["tab"],
                  indicator: {
                    left: (e.target as HTMLButtonElement).offsetLeft,
                    width: (e.target as HTMLButtonElement).offsetWidth,
                  },
                });
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      <h3 className="text-2xl font-semibold text-Grey/400">
        {tabs.find((t) => t.value === currentTab.tab)?.label || "All"}
        <span className="ml-1 text-base">
          ({tabs.find((t) => t.value === currentTab.tab)?.count || 0})
        </span>
        {currentTab.tab !== "all" && (
          <sup>
            <Link
              href={currentTab.tab === "movie" ? "/movies" : "/tv-shows"}
              className="icon inline-block"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </Link>
          </sup>
        )}
      </h3>
      <CardsList
        data={
          // data.results.filter((media) => {
          //   const type = getMediaType(media);
          //   return currentTab.tab === "all" ? true : type === currentTab.tab;
          // }) as TvShow[] | Movie[]
          data
        }
        // emptyComponent={
        //   <EmptyWatchList
        //     type={
        //       data.all !== 0
        //         ? tabs.find((t) => t.value === currentTab.tab)?.label.toLowerCase()
        //         : "all"
        //     }
        //   />
        // }
      />
    </>
  );
}
