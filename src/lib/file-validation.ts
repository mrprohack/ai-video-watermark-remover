export const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024;

export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
] as const;

type AllowedVideoType = (typeof ALLOWED_VIDEO_TYPES)[number];

const EXTENSIONS_BY_MIME: Record<AllowedVideoType, readonly string[]> = {
  "video/mp4": [".mp4"],
  "video/quicktime": [".mov"],
  "video/webm": [".webm"],
};

export type VideoFileMeta = {
  name: string;
  type: string;
  size: number;
};

export type ValidationResult =
  | { ok: true }
  | { ok: false; message: string };

function getExtension(name: string): string {
  const lastDot = name.lastIndexOf(".");
  return lastDot >= 0 ? name.slice(lastDot).toLowerCase() : "";
}

export function validateVideoFileMeta(file: VideoFileMeta): ValidationResult {
  if (!ALLOWED_VIDEO_TYPES.includes(file.type as AllowedVideoType)) {
    return { ok: false, message: "Use an MP4, MOV, or WebM video." };
  }

  const allowedExtensions = EXTENSIONS_BY_MIME[file.type as AllowedVideoType];
  if (!allowedExtensions.includes(getExtension(file.name))) {
    return {
      ok: false,
      message: "The file extension does not match its reported video format.",
    };
  }

  if (file.size <= 0) {
    return { ok: false, message: "The selected file is empty." };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, message: "For this MVP, videos must be 100 MB or smaller." };
  }

  return { ok: true };
}
