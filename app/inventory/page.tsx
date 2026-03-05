import { Inventory } from "@/components/inventory/inventory";
import { SearchQuery } from "@/components/inventory/searchQuery";
import { getSession } from "@/lib/auth/auth";

import { redirect } from "next/navigation";

type SearchParams = {
  searchParams?: {
    search?: string;
    page?: string;
  };
};

export default async function InventoryPage({ searchParams }: SearchParams) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  const paramsAwait = await searchParams;

  const params = {
    search: paramsAwait?.search,
    page: Number(paramsAwait?.page),
  };

  return (
    <div className="ml-64 p-8 h-screen">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-primary text-2xl font-semibold">Inventario</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie seus produtos e acompanhe os níveis de estoque
            </p>
          </div>
        </div>
      </div>

      <div className="my-8">
        <SearchQuery />
      </div>

      <Inventory searchParams={params} />
    </div>
  );
}
