export default {
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Brief description for tour cards",
    },
    {
      name: "detailedDescription",
      title: "Detailed Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
        },
      ],
      description: "Detailed description for tour detail page",
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
      description: "Additional images for the tour detail page gallery",
    },
    {
      name: "price",
      title: "Price",
      type: "string",
      validation: (Rule) => Rule.required(),
      placeholder: "$49.00",
    },
    {
      name: "priceUnit",
      title: "Price Unit",
      type: "string",
      options: {
        list: [
          { title: "Per day", value: "/Per day" },
          { title: "Per person", value: "/Per person" },
          { title: "Per group", value: "/Per group" },
          { title: "Total", value: "" },
        ],
      },
      initialValue: "/Per day",
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      placeholder: "10 Days",
      description: "Tour duration (e.g., '10 Days', '1 Week', '3 Days 2 Nights')",
    },
    {
      name: "maxParticipants",
      title: "Maximum Participants",
      type: "string",
      placeholder: "50+",
      description: "Maximum number of participants (e.g., '50+', '20', 'Unlimited')",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
      description: "Tour rating (1-5 stars)",
    },
    {
      name: "difficulty",
      title: "Difficulty Level",
      type: "string",
      options: {
        list: [
          { title: "Easy", value: "easy" },
          { title: "Moderate", value: "moderate" },
          { title: "Challenging", value: "challenging" },
          { title: "Expert", value: "expert" },
        ],
      },
      description: "Physical difficulty level of the tour",
    },
    {
      name: "highlights",
      title: "Tour Highlights",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
      description: "Key highlights of the tour (e.g., 'Mountain Views', 'Local Cuisine', 'Cultural Sites')",
    },
    {
      name: "featured",
      title: "Featured Tour?",
      type: "boolean",
      initialValue: false,
      description: "Show this tour in featured tours section",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which the tour appears (lower number first)",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "isActive",
      title: "Is Active?",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      location: "location",
      price: "price",
      priceUnit: "priceUnit",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, location, price, priceUnit, media } = selection;
      return {
        title: title,
        subtitle: `${location} - ${price}${priceUnit || ""}`,
        media: media,
      };
    },
  },
};
