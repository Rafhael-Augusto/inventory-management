import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/auth";

import { AddProduct } from "@/components/addProduct/addProduct";

export default async function AddProductPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  return <AddProduct />;
}
