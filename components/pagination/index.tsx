"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  totalPages: number;
};

export function PaginationUi({ totalPages }: Props) {
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const currentPage = Math.max(Number(params.get("page") || 1), 1);

  const prevParams = new URLSearchParams(params);
  prevParams.set("page", String(Math.max(currentPage - 1, 1)));

  const nextParams = new URLSearchParams(params);
  nextParams.set("page", String(currentPage + 1));

  const isLastPage = currentPage >= totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              currentPage === 1 && "pointer-events-none opacity-50",
            )}
            href={`?${prevParams.toString()}`}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className={cn(isLastPage && "pointer-events-none opacity-50")}
            href={`?${nextParams.toString()}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
