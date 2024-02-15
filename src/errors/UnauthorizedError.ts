import type { ErrorResponse } from "@customTypes/response.types";

export class UnauthorizedError extends Error {
  public constructor(public body: ErrorResponse) {
    super(body.message);
  }
}
