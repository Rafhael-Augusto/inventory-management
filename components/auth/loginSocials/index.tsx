"use client";

import { useRouter } from "next/navigation";

import { signInSocial } from "@/lib/actions/authActions";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { IconType } from "react-icons/lib";

import { Button } from "@/components/ui/button";

type SocialLoginTypes = {
  label: string;
  social: ProvidersType;
  icon: IconType;
  id: number;
};

type ErrorType = {
  setError: (error: string) => void;
};

type ProvidersType = "google" | "github";

const socialLogins: SocialLoginTypes[] = [
  {
    label: "Fazer login com Github",
    social: "github",
    icon: FaGithub,
    id: 0,
  },
  {
    label: "Fazer login com Google",
    social: "google",
    icon: FaGoogle,
    id: 1,
  },
];

export default function LoginSocials({ setError }: ErrorType) {
  const router = useRouter();

  async function signInWithSocial(provider: ProvidersType) {
    try {
      await signInSocial(provider);

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(`Erro ao fazer login com ${provider}`);
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {socialLogins.map((item) => (
        <div key={item.id} className="w-full">
          <Button
            onClick={() => signInWithSocial(item.social)}
            variant={item.id === 1 ? "secondary" : "default"}
            className="w-full"
          >
            <item.icon className="h-6 w-6" /> {item.label}
          </Button>
        </div>
      ))}
    </div>
  );
}
