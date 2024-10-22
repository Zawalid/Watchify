import Tabs from "@/app/explore/_components/Tabs";
import { ExploreAction } from "./_components/ExploreAction";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-Grey/50">Explore</h1>
          <Tabs
            tabs={[
              { label: "Movies", value: "movies", link: "/movies" },
              { label: "TV Shows", value: "tv-shows", link: "/tv-shows" },
              { label: "Search", value: "search", link: "/search" },
            ]}
          />
        </div>
        <p className="text-Grey/300 leading-relaxed">
          Browse a wide variety of movies and TV shows. Find new favorites to watch and enjoy.
        </p>
      </div>
      <ExploreAction />
      {children}
    </div>
  );
}
