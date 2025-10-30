import React from "react";

// Travel Agency Organization Schema
export const getTravelAgencySchema = (websiteUrl = "https://oneworldholidays.net") => ({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "One World Holidays",
  description: "Your gateway to amazing adventures and unforgettable travel experiences",
  url: websiteUrl,
  logo: `${websiteUrl}/mainimage/logo3.png`,
  image: `${websiteUrl}/mainimage/banner.jpg`,
  telephone: "+1-555-0123",
  email: "info@oneworldholidays.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Travel Street",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10001",
    addressCountry: "US",
  },
  sameAs: ["https://www.facebook.com/oneworldholidays", "https://www.instagram.com/oneworldholidays", "https://www.twitter.com/oneworldholidays"],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "40.7128",
      longitude: "-74.0060",
    },
    geoRadius: "10000",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Travel Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tour Packages",
          description: "Comprehensive tour packages to various destinations",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Flight Booking",
          description: "Domestic and international flight reservations",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hotel Booking",
          description: "Accommodation booking services",
        },
      },
    ],
  },
});

// Tour/Trip Schema
export const getTourSchema = (tour) => ({
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: tour.name || "Amazing Tour",
  description: tour.description || "An unforgettable travel experience",
  image: tour.image || "/mainimage/banner.jpg",
  url: tour.url || "",
  provider: {
    "@type": "TravelAgency",
    name: "One World Holidays",
    url: "https://oneworldholidays.net",
  },
  offers: {
    "@type": "Offer",
    price: tour.price || "0",
    priceCurrency: tour.currency || "INR",
    availability: "https://schema.org/InStock",
    validFrom: tour.startDate || new Date().toISOString().split("T")[0],
    validThrough: tour.endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  itinerary: tour.itinerary || [],
  touristType: tour.touristType || "Leisure",
  duration: tour.duration || "P7D",
});

// Destination Schema
export const getDestinationSchema = (destination) => ({
  "@context": "https://schema.org",
  "@type": "Place",
  name: destination.name || "Amazing Destination",
  description: destination.description || "A beautiful travel destination",
  image: destination.image || "/mainimage/banner.jpg",
  url: destination.url || "",
  geo: {
    "@type": "GeoCoordinates",
    latitude: destination.latitude || "0",
    longitude: destination.longitude || "0",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: destination.city || "",
    addressRegion: destination.region || "",
    addressCountry: destination.country || "",
  },
  touristType: "Leisure",
  isAccessibleForFree: false,
});

// FAQ Schema
export const getFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// Breadcrumb Schema
export const getBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// Local Business Schema
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "One World Holidays",
  description: "Premier travel agency offering tours, flights, and vacation packages",
  url: "https://oneworldholidays.net",
  telephone: "+1-555-0123",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Travel Street",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10001",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "40.7128",
    longitude: "-74.0060",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "150",
  },
});

// WebSite Schema
export const getWebSiteSchema = (websiteUrl = "https://oneworldholidays.net") => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "One World Holidays",
  url: websiteUrl,
  description: "Your gateway to amazing adventures and unforgettable travel experiences",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${websiteUrl}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});
