import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LoginForm } from "@/components/login/form/form";

export function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle>Fazer login</CardTitle>
          <CardDescription>
            Faca login com a sua conta para ter acesso
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
