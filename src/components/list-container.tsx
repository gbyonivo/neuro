import { Fragment, useCallback, useState } from "react";
import { Button } from "./common/button";
import { Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";
import { Spinner } from "./common/spinner";
import { EmptyState } from "./common/empty-state";

export enum ListContainerMode {
  GRID = "grid",
  TABLE = "table",
}

interface ListContainerProps<T> {
  list: T[];
  loading: boolean;
  error: string | null;
  listContainerClassName?: string;
  title?: string;
  subtitle?: string | React.ReactNode;
  total: number;
  keyProp: keyof T;
  initialMode?: ListContainerMode;
  hideSwitchMode?: boolean;
  renderTableHeader?: () => React.ReactNode;
  renderGridCard?: (value: {
    item: T;
    toggleSelection: (item: T) => void;
    isSelected: boolean;
  }) => React.ReactNode;
  renderRow?: (value: {
    item: T;
    toggleSelection: (item: T) => void;
    isSelected: boolean;
  }) => React.ReactNode;
  onFetchMore: () => void;
  onRefresh: () => void;
  onEmptyStateClick?: () => void;
  renderBetweenHeaderAndBody?: () => React.ReactNode;
}

export function ListContainer<T>({
  loading,
  error,
  listContainerClassName,
  title,
  subtitle,
  list,
  total,
  initialMode,
  keyProp,
  hideSwitchMode,
  onEmptyStateClick,
  renderTableHeader,
  renderGridCard,
  renderRow,
  renderBetweenHeaderAndBody,
  onFetchMore,
  onRefresh,
}: ListContainerProps<T>) {
  const [mode, setMode] = useState(() => initialMode || ListContainerMode.GRID);
  // TODO: get into selection mode and allow user to select catalog items to be used when creating a task
  const [selection, setSelection] = useState<Record<string, boolean>>({});
  const containerClassName =
    mode === ListContainerMode.GRID
      ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 ${listContainerClassName}`
      : `${listContainerClassName} divide-y divide-gray-200 w-full min-w-full divide-y divide-gray-300`;

  const toggleSelection = useCallback(
    (item: T) => {
      setSelection((prev) => ({
        ...prev,
        [item[keyProp] as string]: !prev[item[keyProp] as string],
      }));
    },
    [keyProp]
  );

  const Tag = mode === ListContainerMode.GRID ? "div" : "table";
  const TagBody = mode === ListContainerMode.GRID ? Fragment : "tbody";
  const bodyClassName =
    mode === ListContainerMode.GRID
      ? "flex justify-center overflow-y-auto flex-1"
      : "";

  return (
    <div className="text-black dark:text-white flex flex-col gap-4">
      <div className="flex justify-center">
        <div className="mb-4">
          {!!title && (
            <h1 className="text-4xl font-bold text-center">{title}</h1>
          )}
          {!!subtitle && (
            <p className="text-lg text-gray-500 my-2 text-center">{subtitle}</p>
          )}
          <div className="flex justify-between gap-4">
            <p className="text-lg text-gray-500 text-center mt-1">
              Total: {list.length} / {total}
            </p>
            <Button onClick={onRefresh} disabled={loading} loading={loading}>
              Refresh
            </Button>
          </div>
          {!hideSwitchMode && (
            <div className="flex gap-2">
              <Button
                data-id="grid-button"
                onClick={() => setMode(ListContainerMode.GRID)}
              >
                <Squares2X2Icon className="w-4 h-4" />
                Grid
              </Button>
              <Button
                data-id="table-button"
                onClick={() => setMode(ListContainerMode.TABLE)}
              >
                <TableCellsIcon className="w-4 h-4" />
                Table
              </Button>
            </div>
          )}
        </div>
      </div>
      {renderBetweenHeaderAndBody && renderBetweenHeaderAndBody()}
      <div className={bodyClassName}>
        <Tag className={`${containerClassName}`}>
          {mode === ListContainerMode.TABLE &&
            renderTableHeader &&
            renderTableHeader()}
          <TagBody>
            {list.map((item) => {
              if (mode === ListContainerMode.GRID) {
                return renderGridCard?.({
                  item,
                  toggleSelection,
                  isSelected: selection[item[keyProp] as string],
                });
              }
              return renderRow?.({
                item,
                toggleSelection,
                isSelected: selection[item[keyProp] as string],
              });
            })}
          </TagBody>
        </Tag>
      </div>

      {total > list.length && (
        <Button
          onClick={onFetchMore}
          disabled={loading || total <= list.length}
          className="mt-8 self-center"
          loading={loading}
        >
          Fetch More
        </Button>
      )}
      <div className="flex justify-center">
        {!loading && !error && list.length === 0 && (
          <EmptyState description="No data" onClick={onEmptyStateClick} />
        )}
        {loading && <Spinner size="large" />}
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
}
