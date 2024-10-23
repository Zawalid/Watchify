import CardsList from "@/components/CardsList";
import { getUpcomingMovies } from "@/lib/TMDB";

export default async function Page() {
  const data = await getUpcomingMovies();
  return <CardsList data={data} />;
}
