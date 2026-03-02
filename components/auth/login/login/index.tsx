import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LoginForm } from "@/components/auth/login/form";
import Link from "next/link";

export function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full ">
        <CardHeader>
          <CardTitle>Fazer login</CardTitle>
          <CardDescription>
            Nao tem uma conta?{" "}
            <Link className="underline text-primary" href={"/auth/register"}>
              fazer registro
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
