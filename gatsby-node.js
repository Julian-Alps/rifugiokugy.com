const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { graphql } = require ('gatsby')
const traverse = require('traverse')

exports.onCreateNode = ({ node, getNodesByType }) => {
  if (node.internal.type === 'MarkdownRemark' && node.frontmatter && node.fileAbsolutePath) {
    const files = getNodesByType('File')
    const directory = path.dirname(node.fileAbsolutePath)
    traverse(node.frontmatter).forEach(function (value) {
      if (typeof value !== 'string') return
      if (value.startsWith('/img/') && path.extname(value)) {
        const targetSuffix = ('static' + value).replace(/\\/g, '/')
        const matchingFile = files.find(file =>
          file.absolutePath.replace(/\\/g, '/').endsWith(targetSuffix)
        )
        if (matchingFile) {
          const relPath = path.relative(directory, matchingFile.absolutePath).replace(/\\/g, '/')
          this.update(relPath)
        }
      } else if (value.includes('\\')) {
        this.update(value.replace(/\\/g, '/'))
      }
    })
  }
}

exports.createResolvers = ({ createResolvers, intermediateSchema }) => {
  const typeMap = intermediateSchema.getTypeMap()
  const resolvers = {}

  Object.keys(typeMap).forEach(typeName => {
    if (!typeName.startsWith('MarkdownRemarkFrontmatter')) return
    const type = typeMap[typeName]
    if (!type.getFields) return
    const fields = type.getFields()
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName]
      if (String(field.type).replace(/[[\]!]/g, '') === 'File') {
        if (!resolvers[typeName]) resolvers[typeName] = {}
        resolvers[typeName][fieldName] = {
          resolve: async (source, args, context, info) => {
            const rawValue = source[fieldName]
            if (!rawValue || typeof rawValue !== 'string') return null
            const match = rawValue.replace(/\\/g, '/').match(/(?:^|\/)img\/(.+)$/)
            if (match) {
              const fileNode = await context.nodeModel.findOne({
                type: 'File',
                query: {
                  filter: {
                    sourceInstanceName: { eq: 'uploads' },
                    relativePath: { eq: match[1] },
                  },
                },
              })
              if (fileNode) return fileNode
            }
            return info.originalResolver(source, args, context, info)
          },
        }
      }
    })
  })

  createResolvers(resolvers)
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /node_modules[\\/](leaflet|react-leaflet|@react-leaflet)/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      site{
        siteMetadata{
          languages{
            langs
          }
        }
      }
      markdownRemark{
        frontmatter{
          heading
        }
      }
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
              langKey
              tagSlugs{
                tag
                link
              }
            }
            frontmatter {
              id
              date
              path
              tags
              templateKey
              lang
              title
              heading
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge =>{
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

  })
}