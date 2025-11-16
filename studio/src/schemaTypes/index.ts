import {page} from './documents/page'
import {callToAction} from './objects/callToAction'
import {mainHero} from './objects/mainHero'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import { infoWithCTA } from './objects/infoWithCTA'
import { imageTextBlock } from './objects/imageTextBlock'
import { infoCard } from './objects/infoCard'
import { featureCard } from './objects/featureCard'
import { localeString } from './objects/localeString'
import { localeBlockContent } from './objects/localeBlockContent'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  // Objects
  blockContent,
  localeString,
  localeBlockContent,
  imageTextBlock,
  mainHero,
  callToAction,
  infoWithCTA,
  link,
  infoCard,
  featureCard,
]
