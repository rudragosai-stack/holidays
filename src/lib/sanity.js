import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "./config";

// Sanity client configuration
export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  useCdn: sanityConfig.useCdn,
  apiVersion: sanityConfig.apiVersion,
  // Use Sanity's CDN directly - no proxy needed
  token: undefined, // No token needed for public read access
  ignoreBrowserTokenWarning: true, // Suppress browser token warning
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
    console.log("Fetching data with query:", query);
    console.log("Sanity client config:", {
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
      apiVersion: sanityConfig.apiVersion,
      useCdn: sanityConfig.useCdn,
    });

    const data = await client.fetch(query, params);
    console.log("Data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      statusCode: error.statusCode,
    });
    return [];
  }
};
