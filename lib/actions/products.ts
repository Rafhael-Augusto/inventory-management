"use server";

import { revalidatePath } from "next/cache";

import db from "../prisma";
import { Prisma } from "@prisma/client";

import { getSession } from "@/lib/auth/auth";
import { formSchema } from "@/components/addProduct/form/schema";

type IdType = string[];

type DataType = {
  data: Omit<Prisma.ProductCreateInput, "userId">;
};

export async function createProduct({ data }: DataType) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = formSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Validacao falhou");
  }

  try {
    await db.product.create({
      data: {
        name: data.name,
        price: data.price,
        userId: session.user.id,
        lowStockAt: data.lowStockAt || null,
        ...(data.sku ? { sku: data.sku } : {}),
        quantity: data.quantity || 0,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === "PrismaClientKnownRequestError") {
        throw new Error(
          "Erro ao criar o produto: verifique se o SKU é único e se os valores inseridos estão dentro dos limites permitidos.",
        );
      }
    }
  }
}

export async function deleteProduct(ids: IdType) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const product = await db.product.deleteMany({
    where: {
      userId: session.user.id,
      id: {
        in: ids,
      },
    },
  });

  if (product.count === 0) {
    return {
      error: "Product not found",
    };
  }

  revalidatePath("/inventory");

  return {
    message: `${product.count} produtos deletados`,
  };
}
