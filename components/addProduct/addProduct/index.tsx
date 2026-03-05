import { Sidebar } from "@/components/sidebar/sidebar";
import { ProductForm } from "../form";

export function AddProduct() {
  return (
    <div className="min-h-screen ">
      <Sidebar currentPath="/add-product" />

      <main className="ml-64 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-primary text-2xl font-semibold">
              Adicionar produto
            </h1>
            <p className="text-sm text-muted-foreground">
              Adicione um novo produto ao seu inventário
            </p>
          </div>
        </div>

        <div className="max-w-2xl ">
          <div className="rounded-lg border border-gray-200 p-6">
            <ProductForm />
          </div>
        </div>
      </main>
    </div>
  );
}
