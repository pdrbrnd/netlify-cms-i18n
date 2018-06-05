/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const Layout = ({ locale, children }) => (
  <div>
    <h1>Hello world</h1>
    <p>The locale is now: {locale}</p>

    <Link to="/">English</Link>
    <Link to="/pt">Portuguese</Link>
    <hr />
    {children}
  </div>
)

Layout.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
}

export default Layout
