import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const infoCard = defineType({
  name: 'infoCard',
  title: 'Info Card',
  type: 'object',
  icon: ImageIcon,
  fields: [

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
      name: 'title',
      title: 'Título',
      type: 'localeString',
    }),
    defineField({
      name: 'text',
      title: 'Texto',
      description: 'Opcional',
      type: 'localeBlockContent',
    }),
    defineField({
      name: 'textColor',
      title: 'Color de texto',
      type: 'color',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
    }),
    defineField({
      name: 'imageAltText',
      title: 'Texto alternativo de la imagen',
      description: 'Esencial para accesibilidad y SEO',
      type: 'localeString',
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Info Card',
        subtitle: 'Info Card',
        media: media || ImageIcon,
      }
    },
  },
})
