const { createRemoteFileNode } = require('gatsby-source-filesystem')
const path = require(`path`)

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions
  createResolvers({
    ShopifyStore_Image: {
      localImage: {
        type: `File`,
        resolve(source) {
          return createRemoteFileNode({
            url: source.url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      store {
        articles(first: 250) {
          edges {
            node {
              blog {
                handle
              }
              handle
            }
          }
        }

        collections(first: 250) {
          edges {
            node {
              handle
            }
          }
        }
        blogs(first: 250) {
          edges {
            node {
              handle
            }
          }
        }

        pages(first: 50) {
          edges {
            node {
              handle
            }
          }
        }
      }

      allShopifyProduct(filter: {status: {eq: "ACTIVE"}}) {
        nodes {
          handle
        }
      }
    }
  `).then(
    ({
      data: {
        store: {
          articles: { edges: articles },
          collections: { edges: collections },
          pages: { edges: pages },
          blogs: { edges: blogs },
        },
        allShopifyProduct,
      },
    }) => {
      collections.forEach(({ node }) => {
        const { handle } = node
        createPage({
          path: `/collections/${handle}/`,
          component: path.resolve(`./src/templates/collectionPage.jsx`),
          context: {
            handle,
          },
        })
      })

      blogs.forEach(({ node }) => {
        const { handle } = node
        createPage({
          path: `/blogs/${handle}/`,
          component: path.resolve(`./src/templates/blogPage.jsx`),
          context: {
            handle,
          },
        })
      })

      allShopifyProduct.nodes.forEach(({ handle }) => {
        createPage({
          path: `/product/${handle}/`,
          component: path.resolve(`./src/templates/productPage.jsx`),
          context: {
            handle,
          },
        })
      })

      articles.forEach(
        ({
          node: {
            blog: { handle: blogHandle },
            handle: articleHandle,
          },
        }) => {
          createPage({
            path: `/blog/${articleHandle}/`,
            component: path.resolve(`./src/templates/articlePage.jsx`),
            context: {
              articleHandle,
              blogHandle,
            },
          })
        }
      )

      pages.forEach(({ node }) => {
        const { handle } = node
        if (handle !== 'home' || handle !== 'contact-us') {
          createPage({
            path: `/${handle}/`,
            component: path.resolve(`./src/templates/shopifyPage.jsx`),
            context: {
              handle,
            },
          })
        }
      })
    }
  )
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  })

  if (stage.startsWith('develop')) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },
    })
  }
}
