require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Gatsby Storyblok`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    short_title: `Storyblok`,
    siteUrl: `https://inovexia-store.myshopify.com/`,
  },
 
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: 'nvyV3664MUK7IKQ7pNYzQAtt',
        version: 'draft',
        localAssets: true, // Optional parameter to download the images to use with Gatsby Image Plugin
        languages: ['de', 'at'] // Optional parameter. Omission will retrieve all languages by default.
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: 'ShopifyStore',
        // This is field under which it's accessible
        fieldName: 'store',
        // Url to query from
        url: `https://inovexia-store.myshopify.com/api/2022-01/graphql.json`,
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          'X-Shopify-Storefront-Access-Token': `96866a02b982dd23ea5cb1ed8fb33c99`,
        },
        // refetchInterval: 60,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: 'ShopifyStoreAdmin',
        // This is field under which it's accessible
        fieldName: 'storeAdmin',
        // Url to query from
        url: `https://inovexia-store.myshopify.com/admin/api/2022-01/graphql.json`,
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          'X-Shopify-Access-Token': `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`,
        },
        // refetchInterval: 60,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        storeUrl: `inovexia-store.myshopify.com`,
        password: `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`,
      },
    },
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Storyblok Gatsby Theme`,
        short_name: `Storyblok`,
        start_url: `/`,
        background_color: `#3E7B02`,
        theme_color: `#1e1e1e`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass'),
      },
    },
    {
      resolve: `gatsby-plugin-performance-metrics`,
      options: {
        firstPaint: false,
        firstContentfulPaint: true,
        firstInputDelay: true,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'http://localhost:8000',
        sitemap: 'http://localhost:8000/sitemap.xml',
        policy: [
          { userAgent: '*', allow: '/' },
          { userAgent: '*', disallow: '/search' },
          // { userAgent: '*', disallow: '/account' },
          // { userAgent: '*', disallow: '/account/*' },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-advanced-sitemap-v-2',
      options: {
        output: '/sitemap.xml',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
