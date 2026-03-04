import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/auth";

import { Dashboard } from "@/components/dashboard/dashboard";

type SearchParams = {
  searchParams?: {
    search?: string;
  };
};

export default async function DashboardPage({ searchParams }: SearchParams) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  return <Dashboard />;
}
