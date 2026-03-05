import { Product } from "@prisma/client";
import { getSession } from "../auth/auth";
import db from "../prisma";

type FiltersType = {
  filters?: {
    searchQuery?: string;
    page?: number;
  };
};

type ProductsStockType = {
  data: {
    totalProductsNumber: number;
    itemsLowStock: Product[];
    allProducts: Product[];
  };
};

export async function getProducts({ filters }: FiltersType) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const pageSize = 8;

  const page = Math.max(Number(filters?.page) || 1, 1);
  const skip = (page - 1) * pageSize;

  const where = {
    userId: session.user.id,
    ...(filters?.searchQuery
      ? {
          name: {
            contains: filters.searchQuery,
            mode: "insensitive" as const,
          },
        }
      : {}),
  };

  const [totalProductsNumber, itemsLowStock, allProducts, recentProducts] =
    await Promise.all([
      db.product.count({
        where,
      }),

      db.product.findMany({
        where: {
          ...where,
          lowStockAt: { not: null },
        },
      }),

      db.product.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      }),

      db.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const totalPages = Math.ceil(totalProductsNumber / pageSize);

  return {
    totalProductsNumber,
    itemsLowStock,
    allProducts,
    recentProducts,
    currentPage: page,
    pageSize,
    totalPages,
  };
}

export async function getProductsStock({ data }: ProductsStockType) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const now = new Date();
  const weeklyProductsData = [];

  const inStockCount = data.allProducts.filter(
    (product) => Number(product.quantity) > Number(product.lowStockAt),
  ).length;

  const lowStockCount = data.allProducts.filter(
    (product) =>
      Number(product.quantity) <= Number(product.lowStockAt) &&
      Number(product.quantity) >= 1,
  ).length;

  const outOfStockCount = data.allProducts.filter(
    (product) => Number(product.quantity) === 0,
  ).length;

  const inStockPercentage =
    data.totalProductsNumber > 0
      ? Math.round((inStockCount / data.totalProductsNumber) * 100)
      : 0;

  const lowStockPercentage =
    data.totalProductsNumber > 0
      ? Math.round((lowStockCount / data.totalProductsNumber) * 100)
      : 0;

  const outOfStockPercentage =
    data.totalProductsNumber > 0
      ? Math.round((outOfStockCount / data.totalProductsNumber) * 100)
      : 0;

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekLabel = `${String(weekStart.getDate()).padStart(
      2,
      "0",
    )}/${String(weekStart.getMonth() + 1).padStart(2, "0")}`;

    const weekProducts = data.allProducts.filter((product) => {
      const productDate = new Date(product.createdAt);

      return productDate >= weekStart && productDate <= weekEnd;
    });

    weeklyProductsData.push({
      week: weekLabel,
      products: weekProducts.length,
    });
  }

  const lowStock = data.itemsLowStock.filter(
    (item) => item.quantity <= item.lowStockAt!,
  );

  const totalValue = data.allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0,
  );

  return {
    weeklyProductsData,
    inStockPercentage,
    lowStockPercentage,
    outOfStockPercentage,
    lowStock,
    totalValue,
  };
}
