import type { AnalyticsUploadResponse, ApiErrorResponse } from "./types";

export async function uploadZipForAnalytics(params: {
  apiBaseUrl: string;
  file: File;
  onProgress: (percent: number) => void;
}): Promise<AnalyticsUploadResponse> {
  const { apiBaseUrl, file, onProgress } = params;
  const url = `${apiBaseUrl.replace(/\/+$/, "")}/v1/analytics`;

  return new Promise<AnalyticsUploadResponse>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/zip");

    xhr.upload.onprogress = (evt) => {
      if (!evt.lengthComputable) return;
      const pct = Math.round((evt.loaded / evt.total) * 100);
      onProgress(pct);
    };

    xhr.onerror = () => {
      reject(new Error("Network error while uploading. Is the API running?"));
    };

    xhr.onload = () => {
      try {
        const body = xhr.responseText ? (JSON.parse(xhr.responseText) as unknown) : null;
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(body as AnalyticsUploadResponse);
          return;
        }
        const asErr = body as ApiErrorResponse;
        reject(new Error(asErr?.error?.message ?? `Upload failed (HTTP ${xhr.status}).`));
      } catch {
        reject(new Error(`Upload failed (HTTP ${xhr.status}).`));
      }
    };

    xhr.send(file);
  });
}

