import { useState } from "react";
import { SearchInput } from "@/components/Input";
import { useWatchList } from "@/services/hooks";
import CardsList from "@/components/CardsList";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { EmptyWatchList } from "@/components/Status";
import Card from "@/components/Card";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export function Home() {
  const [currentTab, setCurrentTab] = useState({
    tab: "all",
    indicator: { left: 8, width: 81 },
  });
  const { query } = useSearchQuery();
  const { data, isLoading, error } = useWatchList();
  const [parent] = useAutoAnimate({duration : 400});

  const tabs = [
    { label: "All", value: "all", count: data?.data?.all },
    { label: "Movies", value: "movie", count: data?.data?.movies },
    { label: "TV Shows", value: "tv", count: data?.data?.tv },
  ];
  return (
    <div className="flex h-full flex-col gap-12">
      <div className="flex w-fit flex-col gap-4">
        <h1 className="text-4xl font-semibold text-Grey/50">Watchify</h1>
        <p className="text-Grey/300">
          List of movies and TV Shows, I,{" "}
          <span className="text-Primary/300">Walid Zakan</span> have watched
          till date.
          <br />
          Explore what I have watched and also feel free to make a suggestion.
          😉
        </p>
        <SearchInput />
      </div>
      <div className="flex flex-col gap-6" ref={parent}>
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <h3 className="text-2xl font-semibold text-Grey/400">
          {tabs.find((t) => t.value === currentTab.tab)?.label || "All"}
          <span className="ml-1 text-sm">
            ({tabs.find((t) => t.value === currentTab.tab)?.count || 0})
          </span>
        </h3>
        <CardsList
          data={data?.data?.watchList?.filter((e) => {
            return (
              e.name.toLowerCase().includes(query.toLowerCase()) &&
              (currentTab.tab === "all" || e.type === currentTab.tab)
            );
          })}
          isLoading={isLoading}
          error={error}
          render={(item) => <Card key={item.id} item={item} />}
          emptyComponent={
            <EmptyWatchList
              type={
                data?.data?.all !== 0
                  ? tabs
                      .find((t) => t.value === currentTab.tab)
                      ?.label.toLowerCase()
                  : "all"
              }
            />
          }
        />
      </div>
    </div>
  );
}

function Tabs({ tabs, currentTab, setCurrentTab }) {
  return (
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
            className={`px-8 py-2 text-sm font-medium ${currentTab.tab === value ? "text-Primary/50" : "text-Grey/300"}`}
            onClick={(e) => {
              setCurrentTab({
                tab: value,
                indicator: {
                  left: e.target.offsetLeft,
                  width: e.target.offsetWidth,
                },
              });
            }}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}
