import {defineField, defineType} from 'sanity'

export const featureCard = defineType({
  name: 'featureCard',
  title: 'Feature Card',
  type: 'object',
  fields: [
    defineField({
      name: 'theme',
      title: 'Tema',
      type: 'string',
      options: {
        list: [
          {title: 'Dark', value: 'darkTheme'},
          {title: 'Light', value: 'lightTheme'},
        ],
        layout: 'radio',
      },
      initialValue: 'darkTheme',
    }),
    defineField({
      name: 'paddingT',
      title: 'Padding arriba',
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
      name: 'paddingB',
      title: 'Padding abajo',
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
      name: 'textColor',
      title: 'Color de texto',
      type: 'color',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Variante',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'cta',
      title: 'Botón',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Texto del botón',
          type: 'localeString',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Enlace del botón',
          type: 'link',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'variant',
          title: 'Variante del boton',
          type: 'string',
          options: {
            list: [
              {title: 'Dark', value: 'buttonDark'},
              {title: 'Light', value: 'buttonLight'},
            ],
            layout: 'radio',
          },
          initialValue: 'buttonDark',
        }),
      ],
    }),
    defineField({
      name: 'illustration',
      title: 'Ilustración',
      type: 'image',
      description: 'Decorative image (optional)',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Color de fondo',
      type: 'color',
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'price',
      media: 'illustration',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Feature Card',
        subtitle: subtitle ? `${subtitle}€` : 'No price set',
        media: media,
      }
    },
  },
})
