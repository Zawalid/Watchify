import CardsList from "@/components/CardsList";
import { getTopRatedMovies } from "@/lib/TMDB";

export default async function Page() {
  const data = await getTopRatedMovies();
  return <CardsList data={data.results} />;
}
