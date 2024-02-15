import type { ErrorResponse } from "@customTypes/response.types";

export class BadRequestError extends Error {
  public constructor(public body: ErrorResponse) {
    super(body.message);
  }
}
