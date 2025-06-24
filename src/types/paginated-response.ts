export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
}
// typec
export function isPaginatedResponse<T>(
  response: unknown
): response is PaginatedResponse<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    "items" in response &&
    "total" in response &&
    "offset" in response &&
    "limit" in response
  );
}
