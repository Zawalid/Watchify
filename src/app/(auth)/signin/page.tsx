import { signInAction } from "@/lib/actions";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import { SubmitButton } from "../AuthButtons";

export const metadata = {
  title: "Sign In",
  description: "Sign In page",
};

export default function Page() {
  return (
    <form className="flex flex-col gap-4" action={signInAction}>
      <Input
        type="email"
        name="email"
        label="Email"
        placeholder="eg. hello@example.com"
        defaultValue={"walid@gmail.com"}
      />
      <PasswordInput
        name="password"
        label="Password"
        placeholder="*********"
        defaultValue={"password"}
      />
      <input type="text" hidden name="redirectTo" defaultValue="/" />
      <SubmitButton text="Sign In" loadingText="Signing in..." />
    </form>
  );
}
