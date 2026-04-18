import Link from "next/link";
import { Button } from "../ui/button";

export function CreateAccountButton() {
  return (
    <Button asChild>
      <Link href="/auth/register">Criar Minha Conta</Link>
    </Button>
  );
}
