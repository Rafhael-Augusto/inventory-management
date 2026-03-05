import z from "zod";

export const formSchema = z.object({
  name: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres"),
  price: z.string().min(4, "Preço inválido"),
  quantity: z.coerce.number().int().min(1, "Quantidade inválida"),
  sku: z.string().optional(),
  lowStockThreshold: z.coerce
    .number()
    .int()
    .min(0, "Limite de estoque inválido"),
});

export type FormData = z.infer<typeof formSchema>;
