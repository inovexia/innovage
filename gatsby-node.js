const { createRemoteFileNode } = require("gatsby-source-filesystem")
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
    WPGraphQL_MediaItem: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.sourceUrl,
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
      wpgraphql {
        pages {
          nodes {
            slug
            uri
            pageId
          }
        }
        posts {
          nodes {
            uri
            slug
            postId
          }
        }
      }
    }
  `).then(result => {
    result.data.wpgraphql.pages.nodes.forEach(({ slug, uri, pageId }) => {
      if (slug !== "home") {
        createPage({
          path: `${uri}`,
          component: path.resolve(`./src/templates/pages/index.js`),
          context: {
            pageId: pageId,
          }
        })
      }
    })
    result.data.wpgraphql.posts.nodes.forEach(({ uri, postId }) => {
      createPage({
        path: `/blogs${uri}`,
        component: path.resolve(`./src/templates/posts/index.js`),
        context: {
          postId: postId,
        },
      })
    })
  })
}
