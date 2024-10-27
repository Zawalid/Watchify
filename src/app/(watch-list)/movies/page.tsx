import CardsList from "@/components/CardsList";
import SearchForm from "@/components/Forms/SearchForm";
import { EmptyWatchList } from "@/components/Status";
import { getMovies } from "@/lib/api";

export default async function Page() {
  const movies = await getMovies();

  return (
    <div className="flex h-full flex-col gap-10">
      <div className="flex w-1/2 flex-col gap-4">
        <h1 className="text-Grey/50 text-4xl font-semibold">Your Movies</h1>
        <SearchForm label="Search Your Movies" placeholder="eg. Interstellar" />
      </div>
      <CardsList data={movies} emptyComponent={<EmptyWatchList type="movies" />} />
    </div>
  );
}
