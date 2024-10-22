import { getDetails } from "@/lib/TMDB";
import { notFound } from "next/navigation";
import { Details } from "../../Details";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const movie = await getDetails("movie", slug);

  if (!movie) notFound();

  return <Details media={movie} />;
}
