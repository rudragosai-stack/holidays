import React from "react";
import { Helmet } from "react-helmet";

const SEOHead = ({
  title = "Turmet Travel - Your Gateway to Amazing Adventures",
  description = "Discover amazing travel destinations, tours, and activities with Turmet Travel. Book your dream vacation with our expert travel agency.",
  keywords = "travel, tours, vacation, destinations, travel agency, adventure, holiday, booking",
  image = "/mainimage/banner.jpg",
  url = "https://turmet-travel.com",
  type = "website",
  structuredData = null,
  canonical = null,
  noindex = false,
  nofollow = false,
}) => {
  const fullImageUrl = image.startsWith("http") ? image : `${url}${image}`;
  const fullUrl = url + (canonical || "");

  const robotsContent = [];
  if (noindex) robotsContent.push("noindex");
  if (nofollow) robotsContent.push("nofollow");
  if (robotsContent.length === 0) robotsContent.push("index", "follow");

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsContent.join(", ")} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Turmet Travel" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@turmet_travel" />
      <meta name="twitter:creator" content="@turmet_travel" />

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Turmet Travel" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Mobile App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Turmet Travel" />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.svg" />

      {/* Structured Data */}
      {structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}
    </Helmet>
  );
};

export default SEOHead;
