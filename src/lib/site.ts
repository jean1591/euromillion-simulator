// Vercel exposes the deployment host, which is right for previews. The
// canonical production URL is what belongs in the sitemap and the
// canonical tag, so it wins whenever it is set.
const productionUrl = "https://euromillion.jeanrobertou.com";

const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : undefined;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? productionUrl
    : vercelUrl ?? productionUrl);
