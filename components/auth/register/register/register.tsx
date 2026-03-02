import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RegisterForm } from "../form/form";
import Link from "next/link";

export function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="max-w-md w-full overflow-y-scroll h-[75vh]">
        <CardHeader>
          <CardTitle>Registrar conta</CardTitle>
          <CardDescription>
            Ja tem uma conta?{" "}
            <Link className="underline text-primary" href={"/auth/login"}>
              fazer login
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
