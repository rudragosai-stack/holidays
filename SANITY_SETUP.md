# Sanity CMS Setup for One World Holidays

This document explains how to set up and use Sanity CMS with your One World Holidays React application.

## What's Been Set Up

### 1. Sanity Dependencies

- `@sanity/client` - For fetching data from Sanity
- `@sanity/image-url` - For optimizing images
- `@sanity/vision` - For query testing
- `sanity` - Core Sanity package

### 2. Sanity Studio

- Located in `/studio` directory
- Configured with schemas for your travel agency content
- Can be run with `npm run studio`

### 3. Content Schemas

The following content types have been created:

- **Destinations** - Travel destinations with images, pricing, ratings
- **Tours** - Tour packages with itineraries and details
- **Blog Posts** - Blog content with rich text
- **Team Members** - Staff information
- **Testimonials** - Customer reviews
- **Activities** - Individual activities
- **Categories** - Content categorization

### 4. Sanity Client Configuration

- Located in `/src/lib/sanity.js`
- Pre-configured queries for all content types
- Image optimization utilities

## Getting Started

### 1. Start the Sanity Studio

```bash
npm run studio
```

This will open the Sanity Studio at `http://localhost:3333`

### 2. Create Your First Content

1. Open the Sanity Studio
2. Create a new Destination
3. Add a title, description, images, and pricing
4. Publish the content

### 3. Use Sanity Data in Your Components

```jsx
import { fetchData, queries, urlFor } from "../lib/sanity";

// Fetch destinations
const destinations = await fetchData(queries.getDestinations);

// Optimize images
const imageUrl = urlFor(destination.mainImage).width(400).url();
```

### 4. Example Component

Check out `/src/Components/SanityExample/SanityDestinations.jsx` for a complete example of how to fetch and display Sanity data.

## Available Queries

### Destinations

- `queries.getDestinations` - All destinations
- `queries.getFeaturedDestinations` - Featured destinations only
- `queries.getDestinationBySlug(slug)` - Single destination by slug

### Tours

- `queries.getTours` - All tours
- `queries.getFeaturedTours` - Featured tours only
- `queries.getTourBySlug(slug)` - Single tour by slug
- `queries.getToursByDestination(destinationId)` - Tours for specific destination

### Blog Posts

- `queries.getBlogPosts` - All blog posts
- `queries.getFeaturedBlogPosts` - Featured posts only
- `queries.getBlogPostBySlug(slug)` - Single post by slug
- `queries.getBlogPostsByCategory(category)` - Posts by category

### Team Members

- `queries.getTeamMembers` - All team members
- `queries.getFeaturedTeamMembers` - Featured members only
- `queries.getTeamMemberBySlug(slug)` - Single member by slug

### Testimonials

- `queries.getTestimonials` - All testimonials
- `queries.getFeaturedTestimonials` - Featured testimonials only

### Activities

- `queries.getActivities` - All activities
- `queries.getFeaturedActivities` - Featured activities only
- `queries.getActivityBySlug(slug)` - Single activity by slug
- `queries.getActivitiesByDestination(destinationId)` - Activities for specific destination

### Categories

- `queries.getCategories` - All categories
- `queries.getFeaturedCategories` - Featured categories only

## Configuration

### Project ID

Update the project ID in `/src/lib/config.js`:

```javascript
export const sanityConfig = {
  projectId: "your-project-id", // Replace with your actual project ID
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
};
```

### Environment Variables (Optional)

You can also use environment variables by creating a `.env` file:

```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

## Next Steps

1. **Start the Studio**: Run `npm run studio` and create your first content
2. **Update Components**: Replace hardcoded content in your existing components with Sanity data
3. **Customize Schemas**: Modify the schemas in `/studio/schemas/` to match your specific needs
4. **Deploy Studio**: Use `npm run studio:deploy` to deploy your studio to Sanity's hosting

## Troubleshooting

### Studio Won't Start

- Make sure you're in the studio directory: `cd studio`
- Install dependencies: `npm install`
- Check your project ID in `sanity.config.js`

### Data Not Loading

- Verify your project ID is correct
- Check that content is published in the studio
- Ensure your dataset is set to 'production'

### Images Not Displaying

- Make sure you're using the `urlFor` helper function
- Check that images are properly uploaded to Sanity
- Verify the image field structure in your schemas

## Support

For more information about Sanity, visit:

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://www.sanity.io/community)
- [Sanity Discord](https://discord.gg/sanity)
