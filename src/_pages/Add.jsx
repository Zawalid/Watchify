import Search from "@/components/Search";
import { useSearch } from "@/services/hooks";

export function Add() {
  return <Search hook={useSearch} title="Add new item" reference="add" />;
}
