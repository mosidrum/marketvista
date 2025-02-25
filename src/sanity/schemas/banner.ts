import { defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "banner",
  title: "Banner",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Sub Title",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Starting From",
      type: "number",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Banner Image",
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      preview: {
        select: {
          imageUrl: "assest.url",
          title: "caption",
        },
      },
    }),
  ],
});
