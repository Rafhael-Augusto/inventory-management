import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/auth";

import { Dashboard } from "@/components/dashboard/dashboard";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  return <Dashboard />;
}
