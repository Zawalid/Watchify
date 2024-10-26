export const dynamic = "force-dynamic";

import CardsList from "@/components/CardsList";
import { search } from "@/lib/TMDB";

export const metadata = {
  title: "Search",
  description: "Search for movies and TV shows",
};

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const data = await search(query, page);

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-2xl font-semibold text-Grey/50">Start Searching...</h2>
        <p className="text-Grey/300 leading-relaxed">
          It looks like you haven&apos;t searched for anything yet. Start typing to find what
          you&apos;re looking for!
        </p>
      </div>
    );
  }

  return <CardsList data={data} />;
}
