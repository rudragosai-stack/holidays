import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "./config";

// Sanity client configuration
export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  useCdn: sanityConfig.useCdn,
  apiVersion: sanityConfig.apiVersion,
  // Use proxy in development to avoid CORS issues
  ...(import.meta.env.DEV && {
    apiHost: "/api",
  }),
  // In production, let Sanity handle the API URL construction
  // Add token if needed for private datasets
  // token: process.env.SANITY_API_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

// Query functions
export const queries = {
  // Hero Banners
  getHeroBanners: `*[_type == "heroBanner" && isActive == true] | order(order asc)`,
  getAllHeroBanners: `*[_type == "heroBanner"] | order(order asc)`,

  // Counters
  getCounters: `*[_type == "counter" && isActive == true] | order(order asc)`,
  getAllCounters: `*[_type == "counter"] | order(order asc)`,

  // Tours
  getTours: `*[_type == "tour" && isActive == true] | order(order asc)`,
  getFeaturedTours: `*[_type == "tour" && isActive == true && featured == true] | order(order asc)`,
  getAllTours: `*[_type == "tour"] | order(order asc)`,
  getTourBySlug: `*[_type == "tour" && slug.current == $slug][0]`,
};

// Helper function to fetch data
export const fetchData = async (query, params = {}) => {
  try {
    const data = await client.fetch(query, params);
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return [];
  }
};
