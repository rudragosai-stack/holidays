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

  // Domestic Tours
  getDomesticTours: `*[_type == "domesticTour" && isActive == true] | order(order asc)`,
  getFeaturedDomesticTours: `*[_type == "domesticTour" && isActive == true && featured == true] | order(order asc)`,
  getAllDomesticTours: `*[_type == "domesticTour"] | order(order asc)`,
  getDomesticTourBySlug: `*[_type == "domesticTour" && slug.current == $slug][0]`,

  // International Tours
  getInternationalTours: `*[_type == "internationalTour" && isActive == true] | order(order asc)`,
  getFeaturedInternationalTours: `*[_type == "internationalTour" && isActive == true && featured == true] | order(order asc)`,
  getAllInternationalTours: `*[_type == "internationalTour"] | order(order asc)`,
  getInternationalTourBySlug: `*[_type == "internationalTour" && slug.current == $slug][0]`,

  // Combined Tours (for displaying both types together)
  getAllToursCombined: `*[_type in ["domesticTour", "internationalTour"] && isActive == true] | order(order asc)`,
  getFeaturedToursCombined: `*[_type in ["domesticTour", "internationalTour"] && isActive == true && featured == true] | order(order asc)`,

  // Get tour by slug from any tour type (including benefits field which is used in Sanity)
  getAnyTourBySlug: `*[_type in ["domesticTour", "internationalTour"] && slug.current == $slug][0]`,
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
