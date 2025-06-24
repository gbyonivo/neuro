"use client";

import { useCatalogItems } from "@/hooks/use-catalog-items";
import { ListContainer } from "./list-container";
import { CatalogItem } from "./catalog-item";
import Link from "next/link";
import { TaskSearch } from "./task-search";
import { LIMIT } from "@/utils/constants";
import { memo, useCallback } from "react";
import { CatalogItemType } from "@/types/catalog-item";

function CatalogItemsPageComponent() {
  const { items, fetchCatalog, isLoading, error, offset, total } =
    useCatalogItems();

  const renderGridCard = useCallback(
    ({ item }: { item: CatalogItemType }) => (
      <CatalogItem item={item} key={item.uuid} />
    ),
    []
  );

  const onFetchMore = useCallback(() => {
    fetchCatalog({ limit: LIMIT, offset: offset + LIMIT });
  }, [fetchCatalog, offset]);

  return (
    <div className="text-black dark:text-white">
      <ListContainer<CatalogItemType>
        list={items}
        loading={isLoading}
        error={error}
        onRefresh={() => fetchCatalog({ limit: LIMIT, offset: 0 })}
        renderGridCard={renderGridCard}
        renderBetweenHeaderAndBody={() => <TaskSearch />}
        onFetchMore={onFetchMore}
        total={total}
        keyProp="uuid"
        title="Catalog"
        subtitle={
          <Link href="/tasks" className="text-blue-500 text-sm underline">
            View Tasks
          </Link>
        }
      />
    </div>
  );
}

export const CatalogItemsPage = memo(CatalogItemsPageComponent);
