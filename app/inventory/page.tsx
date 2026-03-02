import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export async function Inventory() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <h1>test</h1>
    </div>
  );
}
