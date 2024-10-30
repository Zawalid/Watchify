"use server";

import { ZodError } from "zod";
import { signIn, signOut } from "@/lib/auth";
import { signInSchema } from "@/lib/validation";

export const signInAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  try {
    await signInSchema.parseAsync(data);
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError && error.issues[0]) {
      //   toast.error(error.issues[0].message);
    }
  }
  await signIn("credentials", formData);
};

export const signInWithGoogle = async () => await signIn("google", { redirectTo: "/" });

export const signOutAction = async () => {
  console.log("Signing out");
  await signOut({ redirectTo: "/" });
};
