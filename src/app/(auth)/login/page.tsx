import Image from "next/image";
import loginImage from "@/images/login.svg";
import LoginForm from "@/components/Forms/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Login",
  description: "Login page",
};

export default function Page() {
  return (
    <div className="grid  h-full items-center gap-5 md:grid-cols-2">
      <div className="relative h-full hidden md:block">
        <Image src={loginImage} alt="Login" fill />
      </div>
      <div className="space-y-5">
        <h1 className="text-Grey/100 mb-12 text-6xl font-bold">Login</h1>
        <LoginForm />
        <p className="text-Grey/300 text-center text-sm">
          Don't have an account?
          <Link href="/signup" className="ml-1 text-Primary/500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
