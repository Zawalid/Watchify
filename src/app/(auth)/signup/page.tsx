import Image from "next/image";
import loginImage from "@/images/login.svg";
import SignupForm from "@/components/Forms/SignupForm";
import Link from "next/link";

export const metadata = {
  title: "Sign Up",
  description: "Sign up page",
};

export default function Page() {
  return (
    <div className="grid  h-full items-center gap-5 md:grid-cols-2">
      <div className="relative h-full hidden md:block">
        <Image src={loginImage} alt="signup" fill />
      </div>
      <div className="space-y-5">
        <h1 className="text-Grey/100 mb-12 text-6xl font-bold">Sign Up</h1>
        <SignupForm />
        <p className="text-Grey/300 text-center text-sm">
          Already have an account?
          <Link href="/login" className="ml-1 text-Primary/500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
