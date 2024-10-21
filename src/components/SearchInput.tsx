"use client";

import { useState } from "react";
import { useSearchQuery } from "@/hooks/useSearchParams";
import Input, { InputProps } from "./Input";
import Button from "./Button";

export default function SearchInput(props: InputProps) {
  const { query, setQuery } = useSearchQuery();
  const [value, setValue] = useState<string>(query);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setQuery(value);
      }}
      className="flex gap-2"
    >
      <Input
        type="search"
        className="flex-1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      <Button>Search</Button>
    </form>
  );
}
