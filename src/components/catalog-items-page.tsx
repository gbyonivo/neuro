"use client";

import { useCatalogItems } from "@/hooks/use-catalog-items";
import Link from "next/link";
import { ListContainer } from "./list-container";

export function CatalogItemsPage() {
  const { items, fetchCatalog, isLoading, error, offset, total } =
    useCatalogItems();

  return (
    <div className="text-black dark:text-white">
      <ListContainer
        list={items}
        loading={isLoading}
        error={error}
        onRefresh={() => fetchCatalog({ limit: 10, offset: 0 })}
        renderGridCard={({ item }) => (
          <Link key={item.uuid} href={`/catalog-items/${item.uuid}`}>
            <div key={item.uuid}>{item.name}</div>
          </Link>
        )}
        renderRow={({ item }) => <div key={item.uuid}>{item.name}</div>}
        onFetchMore={() => fetchCatalog({ limit: 10, offset: offset + 10 })}
        total={total}
        keyProp="uuid"
      />
    </div>
  );
}
