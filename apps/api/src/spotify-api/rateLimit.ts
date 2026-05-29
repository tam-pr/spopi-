export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWithRateLimit(
  url: string,
  init: RequestInit,
  retries = 3,
): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt += 1) {
    const response = await fetch(url, init);

    if (response.status !== 429) return response;

    const retryAfterHeader = response.headers.get("Retry-After");
    const retryAfterMs = retryAfterHeader ? Number(retryAfterHeader) * 1000 : 1000;
    await sleep(Number.isFinite(retryAfterMs) ? retryAfterMs : 1000);
  }

  return fetch(url, init);
}
