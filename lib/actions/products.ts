"use server";

import { getSession } from "@/lib/auth/auth";
import db from "../prisma";
import { revalidatePath } from "next/cache";

type IdType = string[];

export async function deleteProduct(ids: IdType) {
  const session = await getSession();

  console.log(ids);

  if (!session.user) {
    return {
      error: "Unauthorized",
    };
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
