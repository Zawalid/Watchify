import CardsList from "@/components/CardsList";
import { getAiringTodayTvShows } from "@/lib/TMDB";

export default async function Page() {
  const data = await getAiringTodayTvShows();
  return <CardsList data={data.results} />;
}
