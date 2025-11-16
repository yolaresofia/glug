import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  icon: BulbOutlineIcon,
  validation: (Rule) =>
    // This is a custom validation rule that requires both 'buttonText' and 'link' to be set, or neither to be set
    Rule.custom((fields) => {
      const {buttonText, link} = fields || {}
      if ((buttonText && link) || (!buttonText && !link)) {
        return true
      }
      return 'Tanto el "Texto del Botón" como el "Enlace del Botón" deben estar configurados, o ambos deben estar vacíos.'
    }),
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Texto',
      type: 'localeString',
    }),
    defineField({
      name: 'buttonText',
      title: 'Texto del botón',
      type: 'localeString',
    }),
    defineField({
      name: 'link',
      title: 'Enlace del botón',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'heading.es',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: title || 'Call to Action',
        subtitle: 'Call to Action',
      }
    },
  },
})
