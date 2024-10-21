import Search from "@/components/Search";

export function Suggest() {
  return (
    <Search
      title="Suggest me"
      description={
        <>
          I will really appericiate it if you take time to suggest me something
          good
          <br />
          to watch.
        </>
      }
      reference="suggest"
    />
  );
}
