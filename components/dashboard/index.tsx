import { Sidebar } from "@/components/sidebar/sidebar";
import { getSession } from "@/lib/auth/auth";
import db from "@/lib/prisma";
import { TrendingUpIcon } from "lucide-react";

export async function Dashboard() {
  const session = await getSession();

  const [totalProducts, itemsLowStock, allProducts] = await Promise.all([
    db.product.count({
      where: {
        userId: session.user.id,
      },
    }),
    db.product.findMany({
      where: {
        userId: session.user.id,
        lowStockAt: { not: null },
      },
    }),
    db.product.findMany({
      where: {
        id: session.user.id,
      },
      select: {
        price: true,
        quantity: true,
        createdAt: true,
      },
    }),
  ]);

  const recentProducts = await db.product.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const lowStock = itemsLowStock.filter(
    (item) => item.quantity <= item.lowStockAt!,
  );
  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0,
  );

  const productsList = [
    {
      label: "Total de produtos",
      value: totalProducts,
      id: 0,
    },
    {
      label: "Valor total",
      value: `$ ${Number(totalValue.toFixed(0))}`,
      id: 1,
    },
    {
      label: "Baixo em estoque",
      value: lowStock.length,
      id: 2,
    },
  ];

  return (
    <div>
      <Sidebar currentPath="/dashboard" />

      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Bem-vindo de volta! Aqui está uma visão geral do seu estoque.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-secondary rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-primary mb-6">
              Métricas Principais
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {productsList.map((item) => (
                <div key={item.id} className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="flex items-center justify-center mt-1">
                    <span className="text-xs text-green-600">
                      +{item.value}
                    </span>
                    <TrendingUpIcon className="w-3 h-3 text-green-600 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
