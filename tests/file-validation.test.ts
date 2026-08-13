import { describe, expect, it } from "vitest";
import {
  MAX_FILE_SIZE_BYTES,
  validateVideoFileMeta,
} from "../src/lib/file-validation";

describe("validateVideoFileMeta", () => {
  it("accepts an MP4 below the size limit", () => {
    expect(
      validateVideoFileMeta({
        name: "demo.mp4",
        type: "video/mp4",
        size: 2_000_000,
      }),
    ).toEqual({ ok: true });
  });

  it("rejects unsupported media", () => {
    expect(
      validateVideoFileMeta({
        name: "demo.avi",
        type: "video/x-msvideo",
        size: 2_000_000,
      }),
    ).toEqual({ ok: false, message: "Use an MP4, MOV, or WebM video." });
  });

  it("rejects mismatched MIME types and file extensions", () => {
    expect(
      validateVideoFileMeta({
        name: "not-really-a-video.pdf",
        type: "video/mp4",
        size: 2_000_000,
      }),
    ).toEqual({
      ok: false,
      message: "The file extension does not match its reported video format.",
    });
  });

  it("rejects videos over the MVP file-size limit", () => {
    expect(
      validateVideoFileMeta({
        name: "huge.mp4",
        type: "video/mp4",
        size: MAX_FILE_SIZE_BYTES + 1,
      }),
    ).toEqual({
      ok: false,
      message: "For this MVP, videos must be 100 MB or smaller.",
    });
  });
});
