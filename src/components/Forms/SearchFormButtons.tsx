"use client";

import { useFormStatus } from "react-dom";
import Button from "../Button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className={pending ? "flex items-center gap-1" : ""} type="submit">
      {pending ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-loader spinner"
          >
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          <style>{`
            .spinner {
              animation: spin 2s linear infinite;
            }

            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>{" "}
          Searching...
        </>
      ) : (
        "Search"
      )}
    </Button>
  );
}

export function ResetButton() {
  const pathname = usePathname();

  return (
    <button
      className="absolute z-20 right-4 top-1/2 -translate-y-1/2 icon"
      type="reset"
      onClick={() => {
        const form = document.getElementById("search-form") as HTMLFormElement;
        if (form) form.reset();
      }}
    >
      <Link href={pathname}>
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
      </Link>
    </button>
  );
}
