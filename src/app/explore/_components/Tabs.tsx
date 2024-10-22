"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TabState = { tab: string; indicator: { left: number; width: number } };
type TabItem = { label: string; value: string; link: string };

const TABS_INDICATORS: { [key: string]: { left: number; width: number } } = {
  movies: { left: 8, width: 102 },
  "tv-shows": { left: 130, width: 112 },
  search: { left: 262, width: 101 },
  popular: { left: 8, width: 102 },
  "top-rated": { left: 135, width: 118 },
  "now-playing": { left: 273, width: 134 },
  upcoming: { left: 426, width: 118 },
  "airing-today": { left: 273, width: 133 },
  "on-tv": { left: 426, width: 93 },
};

const getTab = (tabs: TabItem[], pathname: string) => {
  const tab = tabs.find((tab) => pathname.includes(tab.link))?.value;
  return tab
    ? { tab, indicator: TABS_INDICATORS[tab] }
    : { tab: tabs[0].value, indicator: { left: 8, width: 102 } };
};

export default function Tabs({ tabs }: { tabs: TabItem[] }) {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState<TabState>(() => getTab(tabs, pathname));
  const router = useRouter();

  useEffect(() => {
    const newTab = getTab(tabs, pathname);
    if (newTab.tab === currentTab.tab) return;
    setCurrentTab(getTab(tabs, pathname));
  }, [pathname]);

  return (
    <ul className="relative flex w-fit gap-5 rounded-xl bg-Black/20 p-2 backdrop-blur-2xl">
      <div
        className="absolute top-1/2 -z-10 h-[calc(100%-16px)] -translate-y-1/2 rounded-lg bg-Primary/400 transition-[left] duration-500"
        style={{
          left: `${currentTab.indicator.left}px`,
          width: `${currentTab.indicator.width}px`,
        }}
      ></div>
      {tabs.map(({ label, value, link }) => (
        <li key={value} id={value}>
          <button
            className={`px-8 py-2 text-sm font-medium ${
              currentTab.tab === value ? "text-Primary/50" : "text-Grey/300"
            }`}
            onClick={() => {
              setCurrentTab({ tab: value, indicator: TABS_INDICATORS[value] });
              if (link) router.replace(`/explore${link}`);
            }}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}
