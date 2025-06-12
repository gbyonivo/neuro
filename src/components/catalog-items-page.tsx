"use client";

import { useCatalogItems } from "@/hooks/use-catalog-items";
import { ListContainer } from "./list-container";
import { CatalogItem } from "./catalog-item";

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
          <CatalogItem item={item} isGrid key={item.uuid} />
        )}
        renderRow={({ item }) => <CatalogItem item={item} key={item.uuid} />}
        onFetchMore={() => fetchCatalog({ limit: 10, offset: offset + 10 })}
        total={total}
        keyProp="uuid"
      />
    </div>
  );
}
