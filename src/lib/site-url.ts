type SiteEnvironment = {
  [key: string]: string | undefined;
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
};

export function resolveSiteUrl(env: SiteEnvironment = process.env): URL {
  const configuredUrl = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) return new URL(configuredUrl);

  const vercelProductionUrl = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProductionUrl) return new URL(`https://${vercelProductionUrl}`);

  return new URL("http://localhost:3000");
}

export function siteOrigin(env: SiteEnvironment = process.env): string {
  return resolveSiteUrl(env).origin;
}
