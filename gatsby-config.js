const config = require('./config')
const path = require('path')

module.exports = {
  siteMetadata: {
    title: `innovagesoftwares`,
    description: `Innovage Softwares`,
    author: `@innovagesoftwares`,
    wpUrl: config.wordPressUrl,
    siteUrl: `https://innovagesoftwares.com`,
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '~': path.join(__dirname, 'src/'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass'),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#555555`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://innovagesoftwares.com',
        sitemap: 'https://innovagesoftwares.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
          },
          `gatsby-remark-lazy-load`,
        ],
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL || `${config.wordPressUrl}/graphql`,
        protocol: 'http',
        hostingWPCOM: false,
        useACF: true,
        verboseOutput: true,
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphQL`,
        fieldName: `wpgraphql`,
        url: `${config.wordPressUrl}/graphql`,
        refetchInterval: 60 * 60 * 24 * 7,
      },
    },
  ],
}
