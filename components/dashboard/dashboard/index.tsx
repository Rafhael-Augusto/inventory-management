import { cn } from "@/lib/utils";

import { TrendingUpIcon } from "lucide-react";

import { Sidebar } from "@/components/sidebar/sidebar";
import { ProductsChart } from "@/components/dashboard/productsChart";
import { getProducts, getProductsStock } from "@/lib/queries/products";

export async function Dashboard() {
  const { allProducts, itemsLowStock, recentProducts, totalProductsNumber } =
    await getProducts({});

  const productsData = {
    allProducts,
    itemsLowStock,
    recentProducts,
    totalProductsNumber,
  };

  const {
    inStockPercentage,
    lowStock,
    lowStockPercentage,
    outOfStockPercentage,
    totalValue,
    weeklyProductsData,
  } = await getProductsStock({ data: productsData });

  const productsList = [
    {
      label: "Total de produtos",
      value: totalProductsNumber,
      id: 0,
    },
    {
      label: "Valor total",
      value: `R$ ${Number(totalValue.toFixed(0))}`,
      id: 1,
    },
    {
      label: "Baixo em estoque",
      value: lowStock.length,
      id: 2,
    },
  ];

  const stockLevelColors = {
    0: {
      color: "bg-red-600",
      textColor: "text-red-600",
    },
    1: {
      color: "bg-yellow-600",
      textColor: "text-yellow-600",
    },
    2: {
      color: "bg-green-600",
      textColor: "text-green-600",
    },
  };

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

          <div className="bg-secondary rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between m-6">
              <h2 className="text-lg font-semibold text-primary mb-6">
                Novos produtos por semana
              </h2>
            </div>

            <div className="h-48">
              <ProductsChart data={weeklyProductsData} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-secondary rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-primary">
                Niveis de estoque
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {recentProducts.map((product) => {
                const stockLevel =
                  product.quantity === 0
                    ? 0
                    : product.quantity <= (product.lowStockAt || 5)
                      ? 1
                      : 2;

                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-primary/10"
                  >
                    <div className="flex items-center gap-x-3">
                      <div
                        className={cn(
                          "rounded-full w-3 h-3",
                          stockLevelColors[stockLevel].color,
                        )}
                      />

                      <div>
                        <span className="text-sm font-medium text-primary">
                          {product.name}
                        </span>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "text-sm font-medium",
                        stockLevelColors[stockLevel].textColor,
                      )}
                    >
                      {product.quantity} unidades
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-secondary rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-primary">Eficiencia</h2>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border-8 border-gray-200" />

                <div
                  className="absolute inset-0 rounded-full border-8 border-purple-600"
                  style={{
                    clipPath:
                      "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {inStockPercentage}%
                    </div>
                    <div className="text-sm font-gray-600">Em estoque</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-col gap-2 justify-between text-sm text-primary">
                <div className="flex items-center gap-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-400" />
                  <span>Em Estoque ({inStockPercentage})%</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600" />
                  <span>Baixo Estoque ({lowStockPercentage})%</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <span>Sem Estoque ({outOfStockPercentage})%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
