import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const imageTextBlock = defineType({
  name: "imageTextBlock",
  title: "Image & Text Block",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "theme",
      title: "Tema",
      type: "string",
      options: {
        list: [
          { title: "Dark", value: "darkTheme" },
          { title: "Light", value: "lightTheme" },
        ],
        layout: "radio",
      },
      initialValue: "darkTheme",
    }),
    defineField({
      name: "paddingT",
      title: "Padding arriba",
      type: "number",
      options: {
        list: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96].map((value) => ({
          title: `${value}`,
          value,
        })),
      },
      initialValue: 0,
    }),
    defineField({
      name: "paddingB",
      title: "Padding abajo",
      type: "number",
      options: {
        list: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96].map((value) => ({
          title: `${value}`,
          value,
        })),
      },
      initialValue: 0,
    }),

    defineField({
      name: 'mobilePaddingT',
      title: 'Padding arriba en móvil',
      type: 'number',
      options: {
        list: [
          0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36,
          40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
        ].map((value) => ({title: `${value}`, value})),
      },
      initialValue: 0,
    }),
    defineField({
      name: 'mobilePaddingB',
      title: 'Padding abajo en móvil',
      type: 'number',
      options: {
        list: [
          0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36,
          40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
        ].map((value) => ({title: `${value}`, value})),
      },
      initialValue: 0,
    }),
    defineField({
      name: "text",
      title: "Texto",
      description: "Opcional",
      type: "localeBlockContent",
    }),
    defineField({
      name: "textColor",
      title: "Color del Texto",
      type: "color",
    }),
    defineField({
      name: "images",
      title: "Imágenes",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required().min(1).max(2),
    }),
    defineField({
      name: "illustration",
      title: "Ilustración",
      type: "image",
      description: "Imagen decorativa (opcional)",
    }),
    defineField({
      name: "layout",
      title: "Estilo de Diseño",
      type: "string",
      options: {
        list: [
          { title: "Imagen izquierda, ilustración izquierda", value: "leftImage" },
          { title: "Imágenes derecha, texto derecha", value: "topText" },
          { title: "Imágen izquierda, texto izquierda, ilustración izquierda", value: "leftTextImageIlustration" },
          { title: "Imágenes derecha, texto hover", value: "rightImageHoverText" },
        ],
        layout: "radio",
      },
      initialValue: "leftImage",
    }),

    // ** New Fields: textImage1 and textImage2 (Optional when "rightImageHoverText" is selected) **
    defineField({
      name: "titleImage1",
      title: "Título Imagen 1",
      type: "localeString",
      hidden: ({ parent }) => parent?.layout !== "rightImageHoverText",
    }),
    defineField({
      name: "textImage1",
      title: "Texto Imagen 1",
      type: "localeBlockContent",
      hidden: ({ parent }) => parent?.layout !== "rightImageHoverText",
    }),
    defineField({
      name: "titleImage2",
      title: "Título Imagen 2",
      type: "localeString",
      hidden: ({ parent }) => parent?.layout !== "rightImageHoverText",
    }),
    defineField({
      name: "textImage2",
      title: "Texto Imagen 2",
      type: "localeBlockContent",
      hidden: ({ parent }) => parent?.layout !== "rightImageHoverText",
    }),
  ],
  preview: {
    select: {
      media: "images.0",
    },
    prepare({ media }) {
      return {
        title: "Bloque de imagen y texto",
        subtitle: "Image & Text Block",
        media: media || ImageIcon,
      };
    },
  },
});
