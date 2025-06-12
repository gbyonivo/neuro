export interface PaginatedStore<T> {
  items: T[];
  isLoading: boolean;
  error: string | null;
  offset: number;
  total: number;
}
