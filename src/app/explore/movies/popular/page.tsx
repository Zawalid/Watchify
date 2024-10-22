import CardsList from "@/components/CardsList";
import { getPopularMovies } from "@/lib/TMDB";

export default async function Page() {
  const data = await getPopularMovies();
  return <CardsList data={data.results} />;
}
