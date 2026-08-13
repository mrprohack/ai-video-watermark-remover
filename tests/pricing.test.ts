import { describe, expect, it } from "vitest";
import { estimateCredits, formatDuration } from "../src/lib/pricing";

describe("estimateCredits", () => {
  it("uses a five-second minimum charge", () => {
    expect(estimateCredits(2.2)).toBe(5);
  });

  it("rounds partial seconds up", () => {
    expect(estimateCredits(12.1)).toBe(13);
  });

  it("charges double credits for high quality", () => {
    expect(estimateCredits(12.1, "high")).toBe(26);
  });

  it("rejects invalid durations", () => {
    expect(() => estimateCredits(0)).toThrow(/positive number/i);
  });
});

describe("formatDuration", () => {
  it("formats seconds as m:ss", () => {
    expect(formatDuration(65)).toBe("1:05");
  });
});
