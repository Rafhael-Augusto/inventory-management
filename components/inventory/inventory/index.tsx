import { getProducts } from "@/lib/queries/products";
import { cn } from "@/lib/utils";

import { Sidebar } from "@/components/sidebar/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProductActions } from "@/components/inventory/productActions";

const tableHeads = [
  "Nome",
  "SKU",
  "Preco",
  "Quantidade",
  "Estoque baixo em",
  "Acoes",
];

type SearchParams = {
  searchParams?: {
    search?: string;
  };
};

export async function Inventory({ searchParams }: SearchParams) {
  const { allProducts } = await getProducts({
    filters: { searchQuery: searchParams?.search ?? "" },
  });

  return (
    <div className="min-h-screen">
      <Sidebar currentPath="/inventory" />

      <main>
        <div>
          <div className=" rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary">
                <TableRow>
                  {tableHeads.map((item, key) => (
                    <TableHead
                      key={key}
                      className="px-6 py-3 text-left text-sx font-bold text-primary uppercase"
                    >
                      {item}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody className="bg-transparent">
                {allProducts.map((product) => {
                  const lowStock =
                    Number(product.quantity) <= Number(product.lowStockAt) &&
                    product.quantity >= 1;

                  const noStock = Number(product.quantity) <= 0;

                  return (
                    <TableRow className={cn("font-medium")} key={product.id}>
                      <TableCell
                        className={cn(
                          "px-6 py-4 text-sm text-primary",
                          lowStock
                            ? "text-yellow-600"
                            : noStock
                              ? "text-red-600"
                              : "text-primary",
                        )}
                      >
                        {product.name}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-primary">
                        {product.sku || "-"}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-primary">
                        R${Number(product.price).toFixed(2)}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-primary">
                        {product.quantity}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-primary">
                        {product.lowStockAt || "-"}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-primary">
                        <ProductActions id={product.id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
