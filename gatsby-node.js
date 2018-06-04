/* eslint consistent-return: 0 */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const locales = {
  en: {
    path: 'en',
    default: true,
  },
  pt: {
    path: 'pt',
  },
}

const getLocalizedPages = page =>
  Object.keys(locales).map(lang => {
    const path = locales[lang].default
      ? page.path
      : locales[lang].path + page.path

    return {
      ...page,
      path,
      context: {
        locale: lang,
      },
    }
  })

exports.onCreatePage = ({ page, boundActionCreators }) => {
  const { createPage, deletePage } = boundActionCreators

  return new Promise(resolve => {
    deletePage(page)

    const pages = getLocalizedPages(page)
    pages.map(p => createPage(p))

    resolve()
  })
}
