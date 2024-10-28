import { Button } from "@nextui-org/button";
import Input from "@/components/Input";
import PasswordInput from "@/components/PasswordInput";

export default function SignupForm() {
  return (
    <form className="flex flex-col gap-4">
      <Input
        icon="fullName"
        type="text"
        label="Full Name"
        placeholder="eg. Walid"
        defaultValue={"Walid"}
      />
      <Input
        type="email"
        label="Email"
        placeholder="eg. hello@example.com"
        defaultValue={"walid@gmail.com"}
      />
      <PasswordInput label="Password" placeholder="*********" defaultValue={"password"} />
      <Button className="mt-5 w-full" color="primary">
        Sign Up
      </Button>
    </form>
  );
}
