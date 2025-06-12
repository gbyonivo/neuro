import { useCallback, useState } from "react";

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
  subtitle?: string;
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
  renderTableHeader,
  renderGridCard,
  renderRow,
  onFetchMore,
}: ListContainerProps<T>) {
  const [mode, setMode] = useState(() => initialMode || ListContainerMode.GRID);
  const [selection, setSelection] = useState<Record<string, boolean>>({});
  const containerClassName =
    mode === ListContainerMode.GRID
      ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${listContainerClassName}`
      : `${listContainerClassName}`;

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
  const TagBody = mode === ListContainerMode.GRID ? "div" : "tbody";

  return (
    <div className="text-black dark:text-white">
      <div>
        {!!title && <h1>{title}</h1>}
        {!!subtitle && <p>{subtitle}</p>}
        <p>Total: {total}</p>
        <div>
          <button
            data-id="grid-button"
            onClick={() => setMode(ListContainerMode.GRID)}
          >
            Grid
          </button>
          <button
            data-id="table-button"
            onClick={() => setMode(ListContainerMode.TABLE)}
          >
            Table
          </button>
        </div>
      </div>
      <Tag className={containerClassName}>
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

      <button onClick={onFetchMore} disabled={loading || total <= list.length}>
        Fetch More
      </button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
