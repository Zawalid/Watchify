"use client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { NoResults } from "./Status";
import Card from "./Card";
import { getMediaType } from "@/lib/utils";
import Pagination from "./Pagination";

import type { JSX } from "react";
import { useSearchParams } from "@/hooks/useSearchParams";

export default function CardsList({
  data,
  emptyComponent,
  query = "",
  page,
}: {
  data: TMDBResponse;
  query?: string;
  page?: number;
  emptyComponent?: JSX.Element;
}) {
  const [parent] = useAutoAnimate({ duration: 400 });
  const { setSearchParams } = useSearchParams();

  const filteredData = data.results.filter((media) => {
    const title = getMediaType(media) === "movie" ? (media as Movie).title : (media as TvShow).name;
    return title.toLowerCase().includes(query.toLowerCase());
  });

  if (query && !filteredData.length) return <NoResults />;
  if (!data?.results.length && emptyComponent) return emptyComponent;

  return (
    <>
      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-start gap-5"
        ref={parent}
      >
        {filteredData.map((media) => (
          <Card key={media.id} media={media} />
        ))}
      </div>
      <Pagination
        total={Math.min(data.total_pages, 500)} // Because te TMDB API only allows up to 500 pages
        page={page || data.page}
        siblings={2}
        onChange={(page) => setSearchParams("page", String(page), page === 1)}
      />
    </>
  );
}
