"use client";

import { useState } from "react";

import { FormData, formSchema } from "./schema";

import { createProduct } from "@/lib/actions/products";

import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

export function ProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema) as Resolver<FormData, any>,
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setError("");

    try {
      const result = await createProduct({ data });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome do Produto *</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...register("name")}
                  type="text"
                  id="name"
                  placeholder="Produto"
                />
              </InputGroup>

              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <FieldGroup className="flex flex-row">
              <Field>
                <FieldLabel htmlFor="price">Preco *</FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...register("price")}
                    type="text"
                    id="price"
                    placeholder="R$ 0.00"
                  />
                </InputGroup>

                {errors.price && (
                  <FieldError>{errors.price.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="quantity">Quantidade *</FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...register("quantity")}
                    type="number"
                    id="quantity"
                    placeholder="0"
                  />
                </InputGroup>

                {errors.quantity && (
                  <FieldError>{errors.quantity.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="sku">SKU</FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...register("sku")}
                    type="text"
                    id="sku"
                    placeholder="SKU"
                  />
                </InputGroup>

                {errors.sku && <FieldError>{errors.sku.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="low-stock">
                  limite de estoque baixo
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...register("lowStockThreshold")}
                    type="number"
                    id="low-stock"
                    placeholder="0"
                  />
                </InputGroup>

                {errors.lowStockThreshold && (
                  <FieldError>{errors.lowStockThreshold.message}</FieldError>
                )}
              </Field>

              {error && <FieldError>{error}</FieldError>}
            </FieldGroup>

            <Field>
              <Button type="submit">
                {isLoading ? <Spinner /> : "Criar Produto"}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
