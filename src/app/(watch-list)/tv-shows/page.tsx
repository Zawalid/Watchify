import CardsList from "@/components/CardsList";
import SearchForm from "@/components/Forms/SearchForm";
import { EmptyWatchList } from "@/components/Status";
import { getTvShows } from "@/lib/api";

export default async function Page() {
  const tvShows = await getTvShows();

  return (
    <div className="flex h-full flex-col gap-10">
      <div className="flex w-1/2 flex-col gap-4">
        <h1 className="text-Grey/50 text-4xl font-semibold">Your TV Shows</h1>
        <SearchForm label="Search Your Tv Shows" placeholder="eg. Interstellar" />
      </div>
      <CardsList data={tvShows} emptyComponent={<EmptyWatchList type="tv shows" />} />
    </div>
  );
}
