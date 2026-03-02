import { Login } from "@/components/auth/login/login";
import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <Login />;
}
