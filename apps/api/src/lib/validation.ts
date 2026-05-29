import { ApiError } from "./errors";

export function requireHeader(
  value: string | string[] | undefined,
  name: string,
): string {
  if (typeof value === "string" && value.trim().length > 0) return value;
  throw new ApiError({
    status: 400,
    code: "BAD_REQUEST",
    message: `Missing required header: ${name}`,
  });
}

export function assertMaxBytes(buffer: Buffer, maxBytes: number) {
  if (buffer.byteLength <= maxBytes) return;
  throw new ApiError({
    status: 413,
    code: "PAYLOAD_TOO_LARGE",
    message: `Upload too large. Max is ${maxBytes} bytes.`,
    details: { maxBytes },
  });
}

export function assertZipMagic(buffer: Buffer) {
  // ZIP local file header: 50 4B 03 04
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    buffer[2] === 0x03 &&
    buffer[3] === 0x04
  ) {
    return;
  }

  throw new ApiError({
    status: 415,
    code: "UNSUPPORTED_MEDIA_TYPE",
    message: "Expected a .zip file.",
  });
}

