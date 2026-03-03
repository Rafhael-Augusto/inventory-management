import { Inventory } from "@/components/inventory/inventory";
import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function InventoryPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <Inventory />
    </div>
  );
}
