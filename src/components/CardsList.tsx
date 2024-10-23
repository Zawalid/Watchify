"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { NoResults } from "./Status";
import { useSearchParams } from "@/hooks/useSearchParams";
import Card from "./Card";
import { getMediaType } from "@/lib/utils";
import Pagination from "./Pagination";

export default function CardsList({
  data,
  emptyComponent,
}: {
  data: TMDBResponse;
  emptyComponent?: JSX.Element;
}) {
  const { searchParams, setSearchParams } = useSearchParams();
  const [parent] = useAutoAnimate({ duration: 400 });

  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page") || data.page);

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
        total={data.total_pages}
        page={page}
        siblings={2}
        onChange={(page) => setSearchParams("page", String(page),page === 1)}
      />
    </>
  );
}
