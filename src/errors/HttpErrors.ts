import type { ErrorResponse } from "@customTypes/response.types";

export class RequestFailError extends Error {
  public constructor(public msg: string) {
    super(msg);
  }
}

export class BadRequestError extends Error {
  public constructor(public body: ErrorResponse) {
    super(body.message);
  }
}
export class EmptyResponseError extends Error {
  constructor(public msg: string) {
    super(msg);
  }
}
export class NotFoundError extends Error {
  constructor(public body: ErrorResponse) {
    super(body.message);
  }
}
export class UnauthorizedError extends Error {
  public constructor(public body: ErrorResponse) {
    super(body.message);
  }
}
export class ConflictError extends Error {
  public constructor(public body: ErrorResponse) {
    super(body.message);
  }
}
