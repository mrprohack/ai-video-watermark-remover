import { describe, expect, it } from "vitest";
import { resolveSiteUrl, siteOrigin } from "../src/lib/site-url";

describe("resolveSiteUrl", () => {
  it("prefers an explicitly configured public site URL", () => {
    expect(
      resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://clearframe.example/" }).toString(),
    ).toBe("https://clearframe.example/");
  });

  it("falls back to the Vercel production hostname", () => {
    expect(
      siteOrigin({ VERCEL_PROJECT_PRODUCTION_URL: "clearframe.vercel.app" }),
    ).toBe("https://clearframe.vercel.app");
  });

  it("rejects non-http public site URLs", () => {
    expect(() =>
      resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "javascript:alert(1)" }),
    ).toThrow("Site URL must use http or https.");
  });

  it("uses localhost when no deployment URL is configured", () => {
    expect(siteOrigin({})).toBe("http://localhost:3000");
  });
});
