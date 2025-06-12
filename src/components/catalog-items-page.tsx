"use client";

import { useCatalogItems } from "@/hooks/use-catalog-items";
import Link from "next/link";

export function CatalogItemsPage() {
  const { items, fetchCatalog, isLoading, error, offset, total } =
    useCatalogItems();

  return (
    <div className="text-black dark:text-white">
      <p>Offset: {offset}</p>
      <p>Total: {total}</p>
      <p>Is Loading: {isLoading ? "Yes" : "No"}</p>
      <p>Error: {error ? "Error" : "s"}</p>
      {items.length > 0 && (
        <div>
          {items.map((item) => (
            <Link key={item.uuid} href={`/catalog-items/${item.uuid}`}>
              <div key={item.uuid}>{item.name}</div>
            </Link>
          ))}
        </div>
      )}
      <button onClick={() => fetchCatalog({ limit: 10, offset: offset + 10 })}>
        Fetch Catalog
      </button>
    </div>
  );
}
