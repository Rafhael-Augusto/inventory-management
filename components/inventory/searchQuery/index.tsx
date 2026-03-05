"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SearchQuery() {
  const [query, setQuery] = useState("");

  const [debounceQuery] = useDebounce(query, 200);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debounceQuery) {
      params.set("search", debounceQuery);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
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
