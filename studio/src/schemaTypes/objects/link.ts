import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'href',
      options: {
        list: [
          { title: 'URL', value: 'href' },
          { title: 'Page', value: 'page' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'urlTitle',
      title: 'URL Title',
      type: 'localeString',
      hidden: ({ parent }) => parent?.linkType !== 'href',
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'href',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'href' && !value) {
            return 'URL is required when Link Type is URL';
          }
          return true;
        }),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.linkType !== 'page',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'page' && !value) {
            return 'Page reference is required when Link Type is Page';
          }
          return true;
        }),
    }),
    defineField({
      name: 'openType',
      title: 'Open Type',
      type: 'string',
      hidden: ({ parent }) => parent?.linkType !== 'href',
      options: {
        list: [
          { title: 'Open in new tab', value: 'newTab' },
          { title: 'Open modal', value: 'modal' },
        ],
        layout: 'radio',
      },
      initialValue: 'newTab',
    }),
  ],

  preview: {
    select: {
      linkType: 'linkType',
      pageTitle: 'page.name.es',
      urlTitle: 'urlTitle.es',
    },
    prepare({ linkType, pageTitle, urlTitle }) {
      let title = 'Untitled Link';

      if (linkType === 'page') title = pageTitle || 'Untitled Page';
      if (linkType === 'href') title = urlTitle || 'Untitled URL';

      return {
        title,
        media: LinkIcon,
      };
    },
  },
});
