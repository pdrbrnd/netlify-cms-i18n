/* eslint consistent-return: 0, no-restricted-syntax: 0 */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

const locales = {
  en: {
    path: 'en',
    default: true,
  },
  pt: {
    path: 'pt',
  },
}

// Create duplicates for each page in each language
exports.onCreatePage = ({ page, boundActionCreators }) => {
  const { createPage, deletePage } = boundActionCreators

  return new Promise(resolve => {
    deletePage(page)

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang,
        },
      })
    })

    resolve()
  })
}

// Get image's relative path to JSON
exports.onCreateNode = ({ node, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.owner !== 'gatsby-transformer-json') {
    return
  }

  // Get filename to find out the JSON locale
  const fileName = node.id
    .split('.json')[0]
    .split('/')
    .pop()

  createNodeField({
    node,
    name: 'locale',
    value: fileName,
  })

  Object.keys(node).map(key => {
    const isString = typeof node[key] === 'string'
    const hasImageExtension = /\.(gif|jpg|jpeg|tiff|png)$/i.test(node[key])

    if (!isString || !hasImageExtension) {
      return {}
    }

    // We need to find the file's path inside the 'data' folder
    const jsonPartialPath = node.id
      // Node id is full path with some more text in the end
      // We split with 'data'
      .split('/data')
      // Get the last part (relative dir + filename and some string)
      .pop()
      // Split by /
      .split('/')
      // Remove last part (filename and some string)
      .slice(0, -1)
      // Join it again
      .join('/')
    const contentPath = path.join(__dirname, 'src/data', jsonPartialPath)
    const imagePath = path.join(__dirname, 'static', node[key])
    const relative = path.relative(contentPath, imagePath)

    const existingValue = node.fields && node.fields[key]

    let value
    if (typeof existingValue === 'string') {
      value = [existingValue, relative]
    } else if (Array.isArray(existingValue)) {
      value = [...existingValue, relative]
    } else {
      value = relative
    }

    return createNodeField({
      node,
      name: key,
      value,
    })
  })
}
