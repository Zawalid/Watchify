import CardsList from "@/components/CardsList";
import { search } from "@/lib/TMDB";

export default async function Page({ searchParams }: { searchParams: { query: string } }) {
  const { query } = searchParams;
  const data = await search(query, 1);

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-2xl font-semibold text-Grey/50">Start Your Search</h2>
        <p className="text-Grey/300 leading-relaxed">
          It looks like you haven&apos;t searched for anything yet. Start typing to find what
          you&apos;re looking for!
        </p>
      </div>
    );
  }

  return <CardsList data={data.results} />;
}
