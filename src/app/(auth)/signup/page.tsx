import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import { SubmitButton } from "../AuthButtons";

export const metadata = {
  title: "Sign Up",
  description: "Sign up page",
};

export default function Page() {
  return (
    <form className="flex flex-col gap-4">
      <Input
        type="text"
        name="fullName"
        icon="fullName"
        label="Full Name"
        placeholder="eg. Walid"
        defaultValue={"Walid"}
      />
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
      <SubmitButton text="Sign Up" loadingText="Signing up..." />
    </form>
  );
}
