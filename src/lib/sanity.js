import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "./config";

// Sanity client configuration
export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  useCdn: sanityConfig.useCdn,
  apiVersion: sanityConfig.apiVersion,
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
    if (import.meta.env.DEV) {
      // In development, use direct fetch with proxy
      const queryString = new URLSearchParams({
        query: query,
        ...params,
      }).toString();

      const proxyUrl = `http://localhost:5173/api/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?${queryString}`;
      console.log("Development API call:", proxyUrl);

      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.result;
    } else {
      // In production, use Sanity client
      const data = await client.fetch(query, params);
      return data;
    }
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return [];
  }
};
