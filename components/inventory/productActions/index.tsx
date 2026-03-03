"use client";

import { MoreHorizontalIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { deleteProduct } from "@/lib/actions/products";

type Props = {
  id: string;
};

export function ProductActions({ id }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);

    try {
      const result = await deleteProduct([id]);

      if (result.error) {
        console.log(result.error);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MoreHorizontalIcon />
          <span className="sr-only">Abrir acoes do produto</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center">
        <DropdownMenuItem
          onClick={() => handleDelete()}
          className="text-red-600 hover:text-red-600! font-medium"
        >
          <Trash2Icon className="text-red-600" />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
