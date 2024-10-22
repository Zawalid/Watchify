import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import loginImage from "@/images/login.svg";

export default function Page() {
  return (
    <div className="grid flex-1 items-center gap-5 md:grid-cols-2">
      <div className="relative h-full hidden md:block">
        <Image src={loginImage} alt="Login" fill placeholder="blur" />
      </div>
      <div>
        <h1 className="text-Grey/100 mb-12 text-6xl font-bold">Login</h1>
        <form
          className="flex flex-col gap-4"
          //   onSubmit={(e) => {
          //     e.preventDefault();

          //     mutate(
          //       { email, password },
          //       { onError: (err) => toast.error(err.message), onSuccess: (data) => console.log(data) }
          //     );
          //   }}
        >
          <Input
            type="email"
            label="Email"
            placeholder="eg. hello@example.com"
            value={"walid@gmail.com"}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            placeholder="*********"
            value={"password"}
            // onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="mt-6 w-full"
            //   disabled={isPending}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
