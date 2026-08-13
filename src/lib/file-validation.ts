export const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024;

export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
] as const;

export type VideoFileMeta = {
  name: string;
  type: string;
  size: number;
};

export type ValidationResult =
  | { ok: true }
  | { ok: false; message: string };

export function validateVideoFileMeta(file: VideoFileMeta): ValidationResult {
  if (!ALLOWED_VIDEO_TYPES.includes(file.type as (typeof ALLOWED_VIDEO_TYPES)[number])) {
    return { ok: false, message: "Use an MP4, MOV, or WebM video." };
  }

  if (file.size <= 0) {
    return { ok: false, message: "The selected file is empty." };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, message: "For this MVP, videos must be 100 MB or smaller." };
  }

  return { ok: true };
}
