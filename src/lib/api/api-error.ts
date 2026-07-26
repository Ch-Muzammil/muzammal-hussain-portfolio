/**
 * Shared API error shape (agree with backend).
 *
 * HOW TO USE:
 *   throw new ApiError("Not found", 404, "NOT_FOUND")
 */

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly fieldErrors?: Record<string, string[]>;

  constructor(
    message: string,
    status = 500,
    code?: string,
    fieldErrors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}
