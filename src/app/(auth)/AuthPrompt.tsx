"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthPrompt() {
  const pathname = usePathname();

  return (
    <>
      <h1 className="text-Grey/100 mb-7 text-4xl font-bold">
        {pathname === "/signin" ? "Welcome Back" : "Create an Account"} 
      </h1>
      <p className="text-Grey/300 text-center text-sm order-3">
        {pathname === "/signin" ? "Don't have an account?" : "Already have an account?"}
        <Link
          href={pathname === "/signin" ? "/signup" : "/signin"}
          className="ml-1 text-Primary/500"
        >
          {pathname === "/signin" ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </>
  );
}
