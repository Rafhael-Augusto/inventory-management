"use server";

import { formSchema as registerFormSchema } from "@/components/auth/register/form/schema";
import { formSchema as logoInFormSchema } from "@/components/auth/login/form/schema";

import { auth } from "../auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type CredentialsType = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};

type ProvidersType = "github" | "google";

export const signUp = async ({
  name,
  email,
  password,
  confirmPassword,
}: CredentialsType) => {
  const parsed = registerFormSchema.parse({
    name,
    email,
    password,
    confirmPassword,
  });

  const result = await auth.api.signUpEmail({
    body: {
      name: parsed.name,
      email: parsed.email,
      password: parsed.password,
    },
  });

  return result;
};

export const signIn = async ({ email, password }: CredentialsType) => {
  const parsed = logoInFormSchema.parse({ email, password });

  const result = await auth.api.signInEmail({
    body: {
      email: parsed.email,
      password: parsed.password,
    },
  });

  return result;
};

export const signOut = async () => {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  return result;
};

export const signInSocial = async (provider: ProvidersType) => {
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "/dashboard",
    },
  });

  if (url) {
    redirect(url);
  }
};
