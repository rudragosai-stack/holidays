export default {
  name: "counter",
  title: "Counter",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "count",
      title: "Count Number",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "suffix",
      title: "Suffix",
      type: "string",
      description: 'Text to show after the number (e.g., "+", ".6+")',
      placeholder: "+",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which the counter appears (lower number first)",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "isActive",
      title: "Is Active?",
      type: "boolean",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      count: "count",
      suffix: "suffix",
      description: "description",
    },
    prepare(selection) {
      const { title, count, suffix, description } = selection;
      return {
        title: title || `${count}${suffix || ""} - ${description}`,
        subtitle: description,
      };
    },
  },
};
