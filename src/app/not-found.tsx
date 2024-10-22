import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col justify-center items-center gap-6">
      <div className="relative  w-1/2 h-60">
        <Image src="/images/404.svg" alt="" fill />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-2xl font-semibold text-Grey/50 sm:text-3xl">Lost your way?</h2>
        <p className="font-medium text-Grey/300">
          Oops! This is awkward. You are looking for something that doesn&apos;t <br /> actually
          exist.
        </p>
        <Link href="/">
          <Button className="mt-6">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
