import { getDetails } from "@/lib/api/TMDB";
import { notFound } from "next/navigation";
import { Details } from "../../Details";

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
  const movie = await getDetails("movie", slug);

  if (!movie) notFound();

  return <Details media={movie} />;
}
