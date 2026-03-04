"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { ButtonGroup } from "@/components/ui/button-group";
import { useRouter } from "next/navigation";

export function SearchQuery() {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    router.push(`?search=${query}`);
  };

  return (
    <Field>
      <ButtonGroup>
        <Input
          onChange={(e) => setQuery(e.target.value)}
          id="input-button"
          placeholder="Pesquisar"
        />
        <Button onClick={() => handleSearch()} variant={"outline"}>
          Pesquisar
        </Button>
      </ButtonGroup>
    </Field>
  );
}
