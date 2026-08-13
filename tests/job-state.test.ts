import { describe, expect, it } from "vitest";
import { assertTransition, canTransition } from "../src/lib/job-state";

describe("job state transitions", () => {
  it("allows the happy path", () => {
    expect(canTransition("ready", "queued")).toBe(true);
    expect(canTransition("queued", "processing")).toBe(true);
    expect(canTransition("processing", "completed")).toBe(true);
  });

  it("prevents skipping directly from ready to completed", () => {
    expect(canTransition("ready", "completed")).toBe(false);
  });

  it("throws a useful message for invalid transitions", () => {
    expect(() => assertTransition("completed", "processing")).toThrow(
      "Invalid job transition: completed -> processing",
    );
  });
});
