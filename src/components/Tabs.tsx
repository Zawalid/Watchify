"use client";

import { useState } from "react";
import CardsList from "./CardsList";
import { EmptyWatchList } from "./Status";

type Tab = {
  tab: "all" | "movie" | "tv";
  indicator: { left: number; width: number };
};

export default function Tabs({ data }: { data: WatchList }) {
  const [currentTab, setCurrentTab] = useState<Tab>({
    tab: "all",
    indicator: { left: 8, width: 81 },
  });

  console.log(data);

  const tabs = [
    { label: "All", value: "all", count: data.all },
    { label: "Movies", value: "movie", count: data.movies },
    { label: "TV Shows", value: "tv", count: data.tv },
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
              className={`px-8 py-2 text-sm font-medium ${
                currentTab.tab === value ? "text-Primary/50" : "text-Grey/300"
              }`}
              onClick={(e) => {
                setCurrentTab({
                  tab: value,
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
        <span className="ml-1 text-sm">
          ({tabs.find((t) => t.value === currentTab.tab)?.count || 0})
        </span>
      </h3>
      <CardsList
        items={data.watchList.filter((item) =>
          currentTab.tab === "all" ? true : item.media_type === currentTab.tab
        )}
        emptyComponent={
          <EmptyWatchList
            type={
              data.all !== 0
                ? tabs.find((t) => t.value === currentTab.tab)?.label.toLowerCase()
                : "all"
            }
          />
        }
      />
    </>
  );
}
