import Image from "next/image";
import Link from "next/link";
import signInImage from "@/images/signin.svg";
import AuthPrompt from "./AuthPrompt";
import { GoogleButton } from "@/app/(auth)/AuthButtons";
import { signInWithGoogle } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session) redirect("/");

  return (
    <div className="grid  h-full items-center gap-5 md:grid-cols-2">
      <div className="relative h-full hidden md:block">
        <Image src={signInImage} alt="image" fill />
      </div>
      <div className="flex flex-col gap-2">
        <AuthPrompt />
        {children}
        <p className="text-center text-sm text-Grey/300">or</p>
        <form className="h-12" action={signInWithGoogle}>
          <GoogleButton />
        </form>
      </div>
    </div>
  );
}
