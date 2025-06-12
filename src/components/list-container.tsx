import { Fragment, useCallback, useState } from "react";
import { Button } from "./common/button";
import { Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";

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
  renderTableHeader?: () => React.ReactNode;
  renderGridCard: (value: {
    item: T;
    toggleSelection: (item: T) => void;
    isSelected: boolean;
  }) => React.ReactNode;
  renderRow: (value: {
    item: T;
    toggleSelection: (item: T) => void;
    isSelected: boolean;
  }) => React.ReactNode;
  onFetchMore: () => void;
  onRefresh: () => void;
  hideSwitchMode?: boolean;
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
  renderTableHeader,
  renderGridCard,
  renderRow,
  onFetchMore,
}: ListContainerProps<T>) {
  const [mode, setMode] = useState(() => initialMode || ListContainerMode.GRID);
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
          <div className="flex justify-between">
            <p className="text-lg text-gray-500 text-center">
              Total: {list.length} / {total}
            </p>
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
      <div className={bodyClassName}>
        <Tag className={`${containerClassName}`}>
          {mode === ListContainerMode.TABLE &&
            renderTableHeader &&
            renderTableHeader()}
          <TagBody>
            {list.map((item) => {
              if (mode === ListContainerMode.GRID) {
                return renderGridCard({
                  item,
                  toggleSelection,
                  isSelected: selection[item[keyProp] as string],
                });
              }
              return renderRow({
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
        >
          Fetch More
        </Button>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
