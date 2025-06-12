"use client";

import { ListContainer, ListContainerMode } from "./list-container";
import Link from "next/link";
import { useResults } from "@/hooks/use-results";
import { ImageCard } from "./common/image-card";
import { ResultStatus } from "@/types/result";

export function ResultsPage() {
  const { items, fetchResults, isLoading, error, offset, total } = useResults();

  return (
    <div className="text-black dark:text-white p-8">
      <ListContainer
        list={items}
        loading={isLoading}
        error={error}
        onRefresh={() => fetchResults({ limit: 10, offset: 0 })}
        renderGridCard={({ item }) => (
          <ImageCard
            key={item.uuid}
            imageUrl={item.image_url}
            className="bg-gray-100 dark:bg-gray-100"
            lines={[item.status || ""]}
            flag={item.status === ResultStatus.FAILED ? "Process Failed" : ""}
            header={item.uuid}
          />
        )}
        renderRow={() => <></>}
        onFetchMore={() => fetchResults({ limit: 10, offset: offset + 10 })}
        total={total}
        keyProp="uuid"
        initialMode={ListContainerMode.GRID}
        hideSwitchMode
        title="Results"
        subtitle={
          <Link href="/tasks" className="text-blue-500 text-sm underline">
            View Tasks
          </Link>
        }
      />
    </div>
  );
}
