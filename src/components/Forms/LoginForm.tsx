import { Button } from "@nextui-org/button";
import Input from "@/components/Input";
import PasswordInput from "@/components/PasswordInput";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-4">
      <Input
        type="email"
        label="Email"
        placeholder="eg. hello@example.com"
        defaultValue={"walid@gmail.com"}
      />
      <PasswordInput label="Password" placeholder="*********" defaultValue={"password"} />
      <Button
        className="mt-5 w-full"
        color="primary"
      >
        Login
      </Button>
    </form>
  );
}
