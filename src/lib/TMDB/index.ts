import { getQueryString } from "../utils";

const options = {
  url: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
  },
};

export const search = async (query: string, page: number): Promise<SearchResponse> => {
  const queryString = getQueryString({ query, page: String(page) });

  const res = await fetch(`${options.url}/search/multi${queryString}`, {
    headers: options.headers,
  });
  const data = await res.json();
  return data;
};

export const getDetails = async (type: "movie" | "tv", slug: string) => {
  if (!type || !slug) throw new Error("Type and Slug are required");
  const res = await search(slug, 1);
  const id = res.results?.[0]?.id;

  if (!id) return null;

  const details = await fetch(`${options.url}/${type}/${id}`, {
    headers: options.headers,
  });
  const data: TvShow | Movie = await details.json();
  return data;
};
