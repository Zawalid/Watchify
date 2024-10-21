import Card from "@/components/Card";
import CardsList from "@/components/CardsList";
import { SearchInput } from "@/components/Input";
import { EmptyWatchList } from "@/components/Status";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useTvShows } from "@/services/hooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Link } from "react-router-dom";

export function TvShows() {
  const { query } = useSearchQuery();
  const { data, isLoading, error } = useTvShows();
  const [parent] = useAutoAnimate({duration : 400});

  return (
    <div className="flex h-full flex-col gap-10" ref={parent}>
      <div className="flex flex-col gap-4">
        <div className="flex w-1/2 flex-col">
          <Link to="/" className="w-fit font-medium text-Primary/200">
            Walid Zakan
          </Link>
          <h1 className="text-Grey/50 text-4xl font-semibold">Tv Shows</h1>
        </div>
        <div className="w-1/2">
          <SearchInput />
        </div>
      </div>
      <CardsList
        data={data?.data.tvShows.filter((e) =>
          e.name.toLowerCase().includes(query.toLowerCase())
        )}
        isLoading={isLoading}
        error={error}
        render={(item) => <Card key={item.id} item={item} />}
        emptyComponent={<EmptyWatchList type="tv shows" />}
      />
    </div>
  );
}
