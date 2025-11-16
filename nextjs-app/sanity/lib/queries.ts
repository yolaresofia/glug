import { defineQuery } from "next-sanity";

// Helper to project locale-specific fields in GROQ
// This will select the appropriate language field based on the $locale parameter
const localeField = (field: string) => `"${field}": ${field}[$locale]`;
const localeBlockField = (field: string) => `"${field}": ${field}[$locale]`;

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  ${localeField('title')},
  mainNavigation {
    ...,
    "darkLogo": darkLogo.asset->,
    "lightLogo": lightLogo.asset->,
    navLinks[]{
      ...,
      ${localeField('urlTitle')},
      page-> {
        ${localeField('name')},
        slug
      }
    }
  },
  footer {
    secondColumnFooter {
      address {
        ...,
        ${localeField('urlTitle')},
        page-> {
          ${localeField('name')},
          slug
        }
      },
      email,
      phoneNumber
    },
    thirdColumnFooter {
      instagram {
        ...,
        ${localeField('urlTitle')},
        page-> {
          ${localeField('name')},
          slug
        }
      }
    },
    fourthColumnFooter[] {
      ...,
      ${localeField('urlTitle')},
      page-> {
        ${localeField('name')},
        slug
      }
    },
    ${localeField('fifthColumnFooter')},
    ${localeField('workForUs')}
  },
  description,
  ogImage
}`);


const linkFields = `
  link {
      ...,
      _type == "link" => {
        ${localeField('urlTitle')},
        "page": page->slug.current,
        "post": post->slug.current
      }
  }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    ${localeField('name')},
    slug,
    ${localeField('heading')},
    ${localeField('subheading')},
    pageBackgroundColor,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${localeField('heading')},
        ${localeField('text')},
        ${localeField('buttonText')},
        ${linkFields},
      },
      _type == "infoWithCTA" => {
        ...,
        ${localeBlockField('firstColumnText')},
        ${localeBlockField('secondColumnText')},
        cta {
          ...,
          ${localeField('text')},
          link {
            ...,
            ${localeField('urlTitle')},
            page-> {
              ${localeField('name')},
              slug
            }
          }
        }
      },
      _type == "mainHero" => {
        ...
      }
    },
  }
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);
