import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import {assist} from '@sanity/assist'
import {colorInput} from '@sanity/color-input'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation

function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'page':
      return slug === '/' ? '/' : `/${slug}`
    case 'post':
      return slug ? `/posts/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

export default defineConfig({
  name: 'default',
  title: 'GLUG',

  projectId,
  dataset,
  plugins: [
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "page" && slug.current == "/"`,
          },
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/posts/:slug',
            filter: `_type == "post" && slug.current == $slug || _id == $slug`,
          },
        ]),

        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: 'Este documento es utilizado en todo el sitio',
            tone: 'positive',
          }),
          page: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: resolveHref('page', doc?.slug)!,
                },
              ],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure,
    }),
    vercelDeployTool(),
    unsplashImageAsset(),
    assist(),
    colorInput(),
  ],
  schema: {
    types: schemaTypes,
  },
})
