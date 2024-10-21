import CardsList from "@/components/CardsList";
import { Link } from "react-router-dom";
import { useMovies } from "@/services/hooks";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { SearchInput } from "@/components/Input";
import { EmptyWatchList } from "@/components/Status";
import Card from "@/components/Card";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export function Movies() {
  const { query } = useSearchQuery();
  const { data, isLoading, error } = useMovies();
  const [parent] = useAutoAnimate({ duration: 400 });

  return (
    <div className="flex h-full flex-col gap-10" ref={parent}>
      <div className="flex flex-col gap-4">
        <div className="flex w-1/2 flex-col">
          <Link to="/" className="w-fit font-medium text-Primary/200">
            Walid Zakan
          </Link>
          <h1 className="text-Grey/50 text-4xl font-semibold">Movies</h1>
        </div>
        <div className="w-1/2">
          <SearchInput />
        </div>
      </div>
      <CardsList
        data={data?.data.movies.filter((e) =>
          e.name.toLowerCase().includes(query.toLowerCase())
        )}
        isLoading={isLoading}
        error={error}
        render={(item) => <Card key={item.id} item={item} />}
        emptyComponent={<EmptyWatchList type="movies" />}
      />
    </div>
  );
}
