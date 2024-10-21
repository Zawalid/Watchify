import Button from "./Button";
import Input from "./Input";
import CardsList from "./CardsList";
import { useSearchParams } from "react-router-dom";
import { NoResults } from "./Status";
import { useAddShow, useSearch, useSuggestShow, useWatchList } from "@/services/hooks";
import { useState } from "react";
import Card from "./Card";

export default function Search({ title, description, reference }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { data, error, isLoading, isFetching, hasNextPage, fetchNextPage, refetch, reset } =
    useSearch(query);

    console.log(error)

  const render = () => {
    if (data?.pages.at(-1)?.total_results === 0 && query)
      return (
        <NoResults>
          <p className="text-Grey/300 font-medium">
            {reference === "suggest"
              ? "You can suggest me manually"
              : "You can add an item manually"}
          </p>
          <Manually reference={reference} />
        </NoResults>
      );
    return (
      <div className="flex flex-col gap-7">
        <CardsList
          data={data?.pages.reduce((acc, page) => (page ? [...acc, ...page.results] : []), [])}
          isLoading={isLoading}
          error={error}
          render={(item) => (
            <Card key={item.id} item={item} action={<Action item={item} reference={reference} />} />
          )}
          displayNoResults={false}
        />
        {!hasNextPage && data?.pages.at(-1) && (
          <div className="mt-5 flex flex-col items-center">
            <p className="text-Grey/300">Didn&apos;t find the one you looking for?</p>
            <Manually />
          </div>
        )}
        {hasNextPage && (
          <Button className="mx-auto w-fit" onClick={() => isFetching || fetchNextPage()}>
            {isFetching ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col gap-10">
      <div className="flex flex-col gap-4">
        {title && typeof title === "string" ? (
          <h1 className="text-Grey/50 text-4xl font-semibold">{title}</h1>
        ) : (
          title
        )}
        {description && <p className="text-Grey/400">{description}</p>}
        <form
          className="flex w-1/2 items-center gap-3"
          autoComplete="true"
          onSubmit={(e) => {
            e.preventDefault();
            if (query) {
              reset();
              refetch();
            }
          }}
        >
          <Input
            type="search"
            label="Search Movies or TV Shows"
            placeholder="eg. Dark"
            className="flex-1"
            value={query}
            onChange={(e) => {
              const search = e.target.value;
              searchParams.set("query", search);
              if (!search) searchParams.delete("query");
              setSearchParams(searchParams);
            }}
          />

          <Button className="py-4" disabled={isLoading}>
            Search
          </Button>
        </form>
      </div>
      {render()}
    </div>
  );
}

function Action({ item, reference }) {
  const { data } = useWatchList();
  const { mutate: addShow, isPending: isAdding, variables } = useAddShow();
  const { mutate: suggestShow, isPending: isSuggesting } = useSuggestShow();

  if (reference === "suggest") {
    if (!item.suggested)
      return (
        <button
          className="text-Primary/400 hover:text-Primary/500 flex w-fit items-center gap-1.5 transition-colors duration-300"
          onClick={() => suggestShow(item.id)}
          disabled={isSuggesting}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.47998 18.35L10.58 20.75C10.98 21.15 11.88 21.35 12.48 21.35H16.28C17.48 21.35 18.78 20.45 19.08 19.25L21.48 11.95C21.98 10.55 21.08 9.34997 19.58 9.34997H15.58C14.98 9.34997 14.48 8.84997 14.58 8.14997L15.08 4.94997C15.28 4.04997 14.68 3.04997 13.78 2.74997C12.98 2.44997 11.98 2.84997 11.58 3.44997L7.47998 9.54997"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
            <path
              d="M2.37988 18.35V8.55002C2.37988 7.15002 2.97988 6.65002 4.37988 6.65002H5.37988C6.77988 6.65002 7.37988 7.15002 7.37988 8.55002V18.35C7.37988 19.75 6.77988 20.25 5.37988 20.25H4.37988C2.97988 20.25 2.37988 19.75 2.37988 18.35Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium">Suggest this</span>
        </button>
      );
    return (
      <div className="text-Success/400 flex w-fit items-center gap-1.5">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
        </svg>
        <span className="text-sm font-medium">Suggested</span>
      </div>
    );
  }

  if (data?.watchList.map((show) => show.id).includes(item.id)) {
    return (
      <div className="text-Success/400 flex w-fit items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M22 9V15C22 15.22 22 15.44 21.98 15.65C21.16 14.64 19.91 14 18.5 14C17.44 14 16.46 14.37 15.69 14.99C14.65 15.81 14 17.08 14 18.5C14 19.34 14.24 20.14 14.65 20.82C14.92 21.27 15.26 21.66 15.66 21.98C15.45 22 15.23 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.52002 7.10986H21.48"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.52002 2.10986V6.96985"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.48 2.10986V6.5199"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 18.5C23 19.34 22.76 20.14 22.35 20.82C22.11 21.22 21.81 21.58 21.46 21.88C20.67 22.58 19.64 23 18.5 23C17.43 23 16.44 22.62 15.67 21.98H15.66C15.26 21.66 14.92 21.27 14.65 20.82C14.24 20.14 14 19.34 14 18.5C14 17.08 14.65 15.81 15.69 14.99C16.46 14.37 17.44 14 18.5 14C19.91 14 21.16 14.64 21.98 15.65C22.62 16.42 23 17.42 23 18.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.75 18.5001L17.86 19.6101L20.26 17.3901"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm font-medium">Already watched</span>
      </div>
    );
  }

  return (
    <button
      className="text-Primary/400 hover:text-Primary/500 flex w-fit items-center gap-1.5 transition-colors duration-300"
      onClick={() =>
        addShow({
          id: item.id,
          type: item.media_type,
          name: item.original_name || item.title,
          rating: item.vote_average,
          poster_path: item.poster_path,
        })
      }
      disabled={isAdding}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 12H18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 18V6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-sm font-medium">
        {isAdding && item.id === variables?.id ? "Adding..." : "Add to my list"}
      </span>
    </button>
  );
}

function Manually({ reference }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="mt-6">
        Suggest Manually
      </Button>
      {isOpen && (
        <div className="bg-Grey/900 fixed left-0 top-0 z-40 grid h-full w-full place-content-center bg-opacity-50">
          <div className="border-Grey/800 bg-blur flex w-[560px] flex-col items-center gap-7 rounded-2xl border p-20 text-center backdrop-blur-xl">
            <button
              className="bg-Black/30 text-Grey/300 hover:bg-Black/50 absolute right-3 top-3 rounded-md p-3 backdrop-blur-md transition-colors duration-300"
              onClick={() => {
                setIsOpen(false);
                setIsSubmitted(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  d="M0.757812 0.757355L9.24309 9.24261"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0.757812 9.24261L9.24312 0.757355"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isSubmitted ? (
              <>
                <img src="/thankyou.svg" alt="" className="w-36" />
                <h4 className="text-Grey/50 text-lg font-semibold">
                  Thank you for your suggestion
                </h4>
                <p className="text-Grey/400">
                  Your suggestion has been succesfully added to my watchlist, I will manage sometime
                  to watch your suggestion. ❤
                </p>
              </>
            ) : (
              <Form
                reference={reference}
                onSubmit={() => {
                  setIsSubmitted(true);
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Form({ onSubmit, reference }) {
  const [show, setShow] = useState({ title: "", link: "" });

  return (
    <>
      <h4 className="text-Grey/50 text-lg font-semibold">
        {reference === "suggest" ? "Suggest something to watch" : "Add a new item to watchlist"}
      </h4>
      <form
        className="flex w-full flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(show);
        }}
      >
        <Input
          label="Title"
          placeholder="eg. Dark"
          icon="title"
          value={show.title}
          onChange={(e) => setShow((prev) => ({ ...prev, title: e.target.value }))}
        />
        <Input
          label="Link (if available)"
          placeholder="https://example.com"
          icon="link"
          value={show.link}
          onChange={(e) => setShow((prev) => ({ ...prev, link: e.target.value }))}
        />
        <Button className="mt-5">{reference === "suggest" ? "Suggest" : "Add"}</Button>
      </form>
    </>
  );
}
