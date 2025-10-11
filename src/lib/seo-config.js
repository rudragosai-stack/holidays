// SEO Configuration for Turmet Travel
export const seoConfig = {
  // Site Information
  siteName: "Turmet Travel",
  siteUrl: "https://turmet-travel.com",
  siteDescription: "Your gateway to amazing adventures and unforgettable travel experiences",
  siteKeywords: "travel, tours, vacation, destinations, travel agency, adventure, holiday, booking, flights, hotels",

  // Contact Information
  contact: {
    phone: "+1-555-0123",
    email: "info@turmet-travel.com",
    address: {
      street: "123 Travel Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
    },
  },

  // Social Media
  social: {
    facebook: "https://www.facebook.com/turmet-travel",
    instagram: "https://www.instagram.com/turmet_travel",
    twitter: "https://www.twitter.com/turmet_travel",
    linkedin: "https://www.linkedin.com/company/turmet-travel",
  },

  // Default Images
  images: {
    logo: "/mainimage/logo.svg",
    banner: "/mainimage/banner.jpg",
    placeholder: "/mainimage/small.jpg",
    ogImage: "/mainimage/banner.jpg",
  },

  // Page-specific SEO data
  pages: {
    home: {
      title: "Turmet Travel - Your Gateway to Amazing Adventures",
      description: "Discover amazing travel destinations, tours, and activities with Turmet Travel. Book your dream vacation with our expert travel agency.",
      keywords: "travel, tours, vacation, destinations, travel agency, adventure, holiday, booking, flights, hotels",
    },
    about: {
      title: "About Us - Turmet Travel | Your Trusted Travel Partner",
      description: "Learn about Turmet Travel's mission to provide exceptional travel experiences. Discover our story, values, and commitment to making your dreams come true.",
      keywords: "about us, travel agency, company story, team, mission, values, travel experts",
    },
    destinations: {
      title: "Travel Destinations - Explore Amazing Places | Turmet Travel",
      description: "Explore our curated collection of amazing travel destinations. From tropical beaches to mountain adventures, find your perfect getaway.",
      keywords: "destinations, travel places, vacation spots, tourist attractions, travel locations, holiday destinations",
    },
    tours: {
      title: "Tour Packages - Amazing Travel Experiences | Turmet Travel",
      description: "Discover our carefully crafted tour packages. From adventure tours to luxury getaways, we have the perfect travel experience for you.",
      keywords: "tour packages, travel tours, vacation packages, guided tours, adventure tours, luxury travel",
    },
    contact: {
      title: "Contact Us - Get in Touch | Turmet Travel",
      description: "Contact Turmet Travel for all your travel needs. Our expert team is ready to help you plan your perfect vacation.",
      keywords: "contact us, travel consultation, customer service, travel planning, booking assistance",
    },
  },

  // Technical SEO
  technical: {
    language: "en",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1.0",
    robots: "index, follow",
    revisitAfter: "7 days",
    distribution: "global",
    rating: "general",
  },

  // Performance
  performance: {
    preconnect: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
    dnsPrefetch: ["https://cdn.jsdelivr.net"],
  },
};

// Helper function to get page SEO data
export const getPageSEO = (pathname) => {
  const pageKey = pathname.replace("/", "") || "home";
  const pageData = seoConfig.pages[pageKey] || seoConfig.pages.home;

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    url: `${seoConfig.siteUrl}${pathname}`,
    image: seoConfig.images.ogImage,
  };
};

// Helper function to generate breadcrumb data
export const generateBreadcrumbs = (pathname) => {
  const segments = pathname.split("/").filter((segment) => segment);
  const breadcrumbs = [{ name: "Home", url: "/" }];

  let currentPath = "";
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
    breadcrumbs.push({
      name: name,
      url: currentPath,
    });
  });

  return breadcrumbs;
};
