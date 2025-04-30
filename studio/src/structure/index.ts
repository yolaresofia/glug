import {CogIcon, HomeIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'assist.instruction.context']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // Highlight the homepage as a standalone item
      S.listItem()
        .title('Home')
        .child(
          S.document()
            .schemaType('page') // Use the `page` schema for the homepage
            .documentId('home') // Optional: Use a specific ID to manage the homepage document
        )
        .icon(HomeIcon),

      // Divider for better organization
      S.divider(),

      // Dynamically list other document types (excluding disabled ones)
      ...S.documentTypeListItems()
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),

      // Settings Singleton
      S.listItem()
        .title('Configuración del sitio')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
