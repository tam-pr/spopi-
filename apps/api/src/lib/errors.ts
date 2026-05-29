import type { NextFunction, Request, Response } from "express";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "PAYLOAD_TOO_LARGE"
  | "UNPROCESSABLE_ENTITY"
  | "INTERNAL_ERROR";

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: ApiErrorCode;
  public readonly details?: unknown;

  constructor(params: {
    status: number;
    code: ApiErrorCode;
    message: string;
    details?: unknown;
  }) {
    super(params.message);
    this.status = params.status;
    this.code = params.code;
    this.details = params.details;
  }
}

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details ?? null,
      },
    });
    return;
  }

  res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Unexpected server error." },
  });
}

