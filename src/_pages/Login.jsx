import Button from "@/components/Button";
import Input from "@/components/Input";
import { useLogin } from "@/services/hooks";
import { useState } from "react";
import { toast } from "sonner";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useLogin();

  return (
    <div className="grid flex-1 items-center gap-5 md:grid-cols-2">
      <img src="/login.svg" alt="" className="hidden md:block" />
      <div>
        <h1 className="text-Grey/100 mb-12 text-6xl font-bold">Login</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();

            mutate({ email, password }, { onError: (err) => toast.error(err.message),onSuccess : (data) =>  console.log(data)});
          }}
        >
          <Input
            type="email"
            label="Email"
            placeholder="eg. hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="mt-6 w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
