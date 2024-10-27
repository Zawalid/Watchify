import { Pagination as P, PaginationProps } from "@nextui-org/pagination";

const className =
  "bg-Black/20  backdrop-blur-2xl w-fit px-2 [&[data-hover=true]:not([data-active=true])]:bg-Black/40";

export default function Pagination(props: PaginationProps) {
  return (
    <div className="flex justify-center">
      <P
        showControls
        initialPage={1}
        classNames={{ item: className, next: className, prev: className, cursor: "w-fit px-2" }}
        size="lg"
        {...props}
      />
    </div>
  );
}
