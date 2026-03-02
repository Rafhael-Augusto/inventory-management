import z from "zod";

export const formSchema = z.object({
  email: z.email("Email Invalido"),
  password: z.string().min(8, "Minimo de 8 caracteres"),
});

export type FormData = z.infer<typeof formSchema>;
