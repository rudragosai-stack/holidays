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
      title: "Description",
      type: "text",
      rows: 3,
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
