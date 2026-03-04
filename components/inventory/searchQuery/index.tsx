"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { ButtonGroup } from "@/components/ui/button-group";
import { useRouter } from "next/navigation";

import { useDebounce } from "use-debounce";

export function SearchQuery() {
  const [query, setQuery] = useState("");

  const [debounceQuery] = useDebounce(query, 100);

  const router = useRouter();

  useEffect(() => {
    router.push(`?search=${debounceQuery}`);
  }, [debounceQuery]);

  return (
    <Field>
      <Input
        onChange={(e) => setQuery(e.target.value)}
        id="input-button"
        placeholder="Pesquisar"
      />
    </Field>
  );
}
