import {defineType} from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'es',
      title: 'Español',
      type: 'string',
    },
    {
      name: 'ca',
      title: 'Català',
      type: 'string',
    },
    {
      name: 'en',
      title: 'English',
      type: 'string',
    },
  ],
})
