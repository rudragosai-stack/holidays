import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate sitemap.xml
const generateSitemap = () => {
  const baseUrl = process.env.SITE_URL || "https://oneworldholidays.net";
  const currentDate = new Date().toISOString();

  const staticPages = [
    {
      url: "/",
      lastmod: currentDate,
      changefreq: "daily",
      priority: "1.0",
    },
    {
      url: "/about",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: "/destination",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      url: "/destination/destination-details",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.7",
    },
    {
      url: "/tour",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      url: "/tour/tour-details",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.7",
    },
    {
      url: "/contact",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.7",
    },
  ];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  staticPages.forEach((page) => {
    sitemap += "  <url>\n";
    sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${page.lastmod}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += "  </url>\n";
  });

  sitemap += "</urlset>";

  // Write to public directory
  const publicDir = path.join(__dirname, "..", "public");
  const sitemapPath = path.join(publicDir, "sitemap.xml");

  fs.writeFileSync(sitemapPath, sitemap);
  console.log("Sitemap generated successfully at:", sitemapPath);
};

// Generate robots.txt if it doesn't exist
const generateRobotsTxt = () => {
  const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${process.env.SITE_URL || "https://oneworldholidays.net"}/sitemap.xml

# Disallow admin and private areas
Disallow: /studio/
Disallow: /admin/
Disallow: /private/

# Allow all search engines to crawl images
Allow: /mainimage/
Allow: /assets/img/

# Crawl delay (optional)
Crawl-delay: 1`;

  const publicDir = path.join(__dirname, "..", "public");
  const robotsPath = path.join(publicDir, "robots.txt");

  if (!fs.existsSync(robotsPath)) {
    fs.writeFileSync(robotsPath, robotsContent);
    console.log("Robots.txt generated successfully at:", robotsPath);
  }
};

// Run the generators
generateSitemap();
generateRobotsTxt();
