import {defineType} from 'sanity'

export const localeBlockContent = defineType({
  name: 'localeBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    {
      name: 'es',
      title: 'Español',
      type: 'blockContent',
    },
    {
      name: 'ca',
      title: 'Català',
      type: 'blockContent',
    },
    {
      name: 'en',
      title: 'English',
      type: 'blockContent',
    },
  ],
})
