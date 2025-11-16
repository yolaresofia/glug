import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const infoWithCTA = defineType({
  name: 'infoWithCTA',
  title: 'Info with CTA',
  type: 'object',
  icon: TextIcon,
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
      name: 'firstColumnText',
      title: 'Texto Primer Columna',
      type: 'localeBlockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondColumnText',
      title: 'Texto Segunda Columna',
      type: 'localeBlockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'textColor',
      title: 'Color del texto',
      type: 'color',
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
  ],
  preview: {
    select: {
      firstColumn: 'firstColumnText',
      secondColumn: 'secondColumnText',
      ctaText: 'cta.text',
    },
    prepare({
      firstColumn,
      secondColumn,
      ctaText,
    }: {
      firstColumn?: {children?: {text?: string}[]}[]
      secondColumn?: {children?: {text?: string}[]}[]
      ctaText?: string
    }) {
      // Helper function to extract text from block content
      const extractText = (blockContent?: {children?: {text?: string}[]}[]) =>
        blockContent?.[0]?.children?.map((child) => child.text).join(' ') || 'Sin texto'

      return {
        title: extractText(firstColumn) || 'Sin texto en primera columna',
        subtitle: extractText(secondColumn) || 'Sin texto en segunda columna',
        media: ctaText ? TextIcon : null, // Show icon if CTA exists
      }
    },
  },
})
