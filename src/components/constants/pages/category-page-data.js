const CategoryPageData = () => {
  return {
    seoData: {
      title: `Product Category`,
      description: `Storyblok theme with gatsby`,
      schema: {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': 'http://localhost:8000/all-products/',
              name: 'All Products',
            },
          },
        ],
      },
    },
  }
}

export default CategoryPageData
