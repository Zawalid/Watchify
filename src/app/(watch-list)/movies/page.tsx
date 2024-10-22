import CardsList from "@/components/CardsList";
import SearchInput from "@/components/SearchInput";
import { EmptyWatchList } from "@/components/Status";
import { getMovies } from "@/lib/api";
import Link from "next/link";

export default async function Page() {
  const movies = await getMovies();

  return (
    <div className="flex h-full flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex w-1/2 flex-col">
          <Link href="/" className="w-fit font-medium text-Primary/200">
            Walid Zakan
          </Link>
          <h1 className="text-Grey/50 text-4xl font-semibold">Movies</h1>
          <SearchInput label="Search Your Movies" placeholder="eg. Interstellar" />
        </div>
      </div>
      <CardsList items={movies} emptyComponent={<EmptyWatchList type="movies" />} />
    </div>
  );
}
