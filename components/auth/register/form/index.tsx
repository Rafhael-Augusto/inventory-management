"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { FormData, formSchema } from "./schema";

import { signUp } from "@/lib/actions/authActions";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { HiOutlineIdentification } from "react-icons/hi2";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";

import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import LoginSocials from "@/components/auth/loginSocials";

export function RegisterForm() {
  const [passVisible, setPassVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setError("");

    try {
      const result = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (!result.user) {
        setError("Erro ao criar conta. Tente novamente");

        return;
      }

      route.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro inesperado. Tente novamente");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <LoginSocials setError={setError} />

      <div className="flex items-center justify-center gap-2">
        <Separator className="w-1/4!" />
        <span className="text-muted-foreground">Ou continue com</span>
        <Separator className="w-1/4!" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...register("name")}
                  type="text"
                  id="name"
                  placeholder="John Doe"
                />

                <InputGroupAddon align={"inline-end"}>
                  <HiOutlineIdentification />
                </InputGroupAddon>
              </InputGroup>

              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="email@exemplo.com"
                />

                <InputGroupAddon align={"inline-end"}>
                  <HiOutlineIdentification />
                </InputGroupAddon>
              </InputGroup>

              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...register("password")}
                  type={passVisible ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                />

                <InputGroupAddon align={"inline-end"}>
                  <Button
                    onClick={() => setPassVisible(!passVisible)}
                    type="button"
                    className="h-7 w-7 bg-primary/5 text-primary hover:bg-primary/10"
                  >
                    {passVisible ? <VscEye /> : <VscEyeClosed />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>

              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar Senha
              </FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...register("confirmPassword")}
                  type={passVisible ? "text" : "password"}
                  id="confirm-password"
                  placeholder="••••••••"
                />
              </InputGroup>

              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}

              {error && <FieldError>{error}</FieldError>}
            </Field>

            <Field>
              <Button type="submit">
                {isLoading ? <Spinner /> : "Fazer Registro"}
              </Button>
              <Link href={"/"} className="text-sm text-end underline">
                Voltar para a pagina inicial
              </Link>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
