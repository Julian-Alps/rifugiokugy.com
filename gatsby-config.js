const languages = require('./src/data/languages');

module.exports = {
  siteMetadata: {
    title: `Rifugio Kugy - official website`,
    description: `
  This is the Rifugio Kugy official website. The refuge is situated in the Valbruna village in the italian Julian Alps.
`,
    siteUrl: "https://www.rifugiokugy.com",
    image: 'img.jpg',
    author: {
      name: 'Rifugio Kugy',
      minibio: `
        This bio is shown at the bottom of each blog post. It supports
        <strong>custom HTML</strong> if you’re into that sort of thing.
      `,
    },
    organization: {
      name: 'Julian Alps',
      url: 'https://julianalps.github.io',
      logo: 'img/logo.svg',
    },
    social: {
      twitter: '@rifugiokugy',
      fbAppID: '',
    },
    languages,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: [],
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "rifugiokugy.com",
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Pacifico', 'Margarine', 'sans-serif']
        }
      }
    },
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: languages.defaultLangKey,
        useLangKeyLayout: false,
      }
    },
    {
    resolve: 'gatsby-plugin-i18n-tags',
    options: { // Default options
      tagPage: 'src/templates/tags.js',
      tagsUrl: '/tags/',
      langKeyForNull: 'any',
    },
  },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
      path: `${__dirname}/src/data/articles`,
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    "gatsby-transformer-javascript-frontmatter",
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
             options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.rifugiokugy.com`
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-netlify`,
    {
      resolve:'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true,            // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      },
    },
    'gatsby-plugin-robots-txt',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Rifugio Kugy`,
        short_name: `Kugy`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#709C34`,
        display: `standalone`,
        icon: `src/img/icon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Rifugio Kugy's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    }
  ],
}
