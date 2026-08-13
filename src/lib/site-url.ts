type SiteEnvironment = {
  [key: string]: string | undefined;
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
};

function parseHttpUrl(value: string): URL {
  const url = new URL(value);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Site URL must use http or https.");
  }
  return url;
}

export function resolveSiteUrl(env: SiteEnvironment = process.env): URL {
  const configuredUrl = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) return parseHttpUrl(configuredUrl);

  const vercelProductionUrl = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProductionUrl) return parseHttpUrl(`https://${vercelProductionUrl}`);

  return parseHttpUrl("http://localhost:3000");
}

export function siteOrigin(env: SiteEnvironment = process.env): string {
  return resolveSiteUrl(env).origin;
}
