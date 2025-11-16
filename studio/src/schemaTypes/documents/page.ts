import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const page = defineType({
  name: 'page',
  title: 'Página',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Link',
      type: 'slug',
      options: {
        source: 'name.es',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subtítulo',
      type: 'localeString',
    }),
    defineField({
      name: 'pageBackgroundColor',
      title: 'Color de fondo de página',
      type: 'color',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Constructor de página',
      type: 'array',
      of: [
        {type: 'callToAction'},
        {type: 'mainHero'},
        {type: 'infoWithCTA'},
        {type: 'imageTextBlock'},
        {type: 'infoCard'},
        {type: 'featureCard'},
      ],
      options: {
        insertMenu: {
          // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/array-type#efb1fe03459d
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'name.es',
      subtitle: 'slug.current',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Sin título',
        subtitle: subtitle || '/',
      };
    },
  },
})
