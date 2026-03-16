/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || "https://svglogo.dev",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  additionalPaths: async () => [
    {
      loc: "/",
      changefreq: "daily",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
  ],
  exclude: ["/api/*"],
};
