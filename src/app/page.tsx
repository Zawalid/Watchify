import SearchInput from "@/components/SearchInput";
import Tabs from "@/components/Tabs";
import { getWatchList } from "@/lib/api";

export default async function Page() {
  const data = await getWatchList();

  return (
    <div className="flex h-full flex-col gap-12">
      <div className="flex w-fit flex-col gap-4">
        <h1 className="text-4xl font-semibold text-Grey/50">Watchify</h1>
        <p className="text-Grey/300 leading-relaxed">
          List of movies and TV Shows, I, <span className="text-Primary/300">Walid Zakan</span> have
          watched till date.
          <br />
          Explore what I have watched and also feel free to make a suggestion. 😉
        </p>
        <SearchInput label="Search Your Movies And TV Shows" placeholder="eg. Breaking Bad" />
      </div>
      <div className="flex flex-col gap-6">
        <Tabs data={data} />
      </div>
    </div>
  );
}
