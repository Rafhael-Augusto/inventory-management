"use client";

import Link from "next/link";

import { FormData, formSchema } from "./schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { HiOutlineIdentification } from "react-icons/hi2";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";

import { Separator } from "@/components/ui/separator";
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
import { useState } from "react";

const socialLogins = [
  {
    label: "Fazer login com Github",
    icon: FaGithub,
    id: 0,
  },
  {
    label: "Fazer login com Google",
    icon: FaGoogle,
    id: 1,
  },
];

export function LoginForm() {
  const [passVisible, setPassVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 items-center w-full">
        {socialLogins.map((item) => (
          <div key={item.id} className="w-full">
            <Button className="w-full">
              <item.icon className="h-6 w-6" /> {item.label}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <span className="text-muted-foreground">Ou continue com</span>
        <Separator />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
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
              <Button type="submit">Fazer Login</Button>
              <Link href={"/"} className="text-sm text-end hover:underline">
                Voltar para a pagina inicial
              </Link>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
