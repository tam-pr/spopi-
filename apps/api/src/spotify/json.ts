import { ApiError } from "../lib/errors";

export function safeJsonParse<T>(text: string, context: string): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError({
      status: 422,
      code: "UNPROCESSABLE_ENTITY",
      message: `Invalid JSON in ${context}.`,
    });
  }
}

