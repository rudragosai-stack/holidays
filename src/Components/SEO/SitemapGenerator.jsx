import React from "react";

// This component generates a sitemap for the website
const SitemapGenerator = () => {
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
      url: "/tour",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      url: "/contact",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.7",
    },
  ];

  const generateSitemap = () => {
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    staticPages.forEach((page) => {
      sitemap += "  <url>\n";
      sitemap += `    <loc>${baseUrl.replace(/\/$/, "")}${page.url}</loc>\n`;
      sitemap += `    <lastmod>${page.lastmod}</lastmod>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += "  </url>\n";
    });

    sitemap += "</urlset>";
    return sitemap;
  };

  // This would typically be used server-side to generate the actual sitemap.xml file
  // For now, we'll return the sitemap content as a string
  return generateSitemap();
};

export default SitemapGenerator;

// Function to generate sitemap.xml file (call this during build process)
export const generateSitemapFile = () => {
  const sitemapContent = SitemapGenerator();

  // In a real implementation, you would write this to public/sitemap.xml
  // For now, we'll return the content
  return sitemapContent;
};
