import db from "@/lib/prisma";
import { Sidebar } from "../../sidebar/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { ProductActions } from "../productActions";

const tableHeads = [
  "Nome",
  "SKU",
  "Preco",
  "Quantidade",
  "Estoque baixo em",
  "Acoes",
];

export async function Inventory() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  const totalProducts = await db.product.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <div className="min-h-screen">
      <Sidebar currentPath="/inventory" />

      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-primary text-2xl font-semibold">
                Inventario
              </h1>
              <p className="text-sm text-muted-foreground">
                Gerencie seus produtos e acompanhe os níveis de estoque
              </p>
            </div>
          </div>
        </div>

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
                {totalProducts.map((product) => {
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
