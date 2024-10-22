import CardsList from "@/components/CardsList";
import { getPopularTvShows } from "@/lib/TMDB";

export default async function Page() {
  const data = await getPopularTvShows();
  return <CardsList data={data.results} />;
}
