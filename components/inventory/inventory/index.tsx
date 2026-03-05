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
import { FaQuestion } from "react-icons/fa";
import { PaginationUi } from "@/components/pagination";

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
    page?: number;
  };
};

export async function Inventory({ searchParams }: SearchParams) {
  const { allProducts, totalPages } = await getProducts({
    filters: {
      searchQuery: searchParams?.search ?? "",
      page: searchParams?.page ?? 1,
    },
  });

  return (
    <div className="flex flex-col justify-between h-[72vh]">
      <Sidebar currentPath="/inventory" />

      <main>
        {allProducts.length > 0 ? (
          <div className="rounded-lg border border-gray-200 overflow-hidden">
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
        ) : (
          <div className="rounded-lg border  py-8 border-gray-200 overflow-hidden">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-8">
                <FaQuestion className="text-8xl text-primary" />

                <h2 className="text-primary font-semibold">
                  Produto não encontrado
                </h2>
              </div>
            </div>
          </div>
        )}
      </main>

      {allProducts.length > 0 && (
        <div className="">
          <PaginationUi totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
