"use client";

import { useState } from "react";
import { useSearchQuery } from "@/hooks/useSearchParams";
import Input, { InputProps } from "./Input";
import Button from "./Button";

interface Props extends InputProps {
  parentClassName?: string;
}

export default function SearchInput({ parentClassName, ...props }: Props) {
  const { query, setQuery } = useSearchQuery();
  const [value, setValue] = useState<string>(query);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value) {
          setQuery(value);
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
      }}
      className={`flex gap-2 ${parentClassName}`}
    >
      <Input
        type="search"
        className="flex-1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      >
        {value && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 icon"
            type="button"
            onClick={() => {
              setValue("");
              setQuery("");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </Input>
      <Button>Search</Button>
    </form>
  );
}
