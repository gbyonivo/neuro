interface NeuroResponseErrorDetail {
  loc: string[];
  msg: string;
  type: string;
}

export interface NeuroResponseError {
  detail: NeuroResponseErrorDetail[];
}

function isNeuroResponseErrorDetail(
  error: unknown
): error is NeuroResponseErrorDetail {
  return (
    typeof error === "object" &&
    error !== null &&
    "loc" in error &&
    "msg" in error &&
    "type" in error
  );
}

export function isNeuroResponseError(
  error: unknown
): error is NeuroResponseError {
  return (
    typeof error === "object" &&
    error !== null &&
    "detail" in error &&
    Array.isArray(error.detail) &&
    error.detail.every(isNeuroResponseErrorDetail)
  );
}
