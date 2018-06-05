import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

import Layout from '../components/layouts'

const IndexPage = ({ pathContext: { locale }, ...props }) => {
  const { node: data } = props.data.allHomeJson.edges[0]

  return (
    <Layout locale={locale}>
      <div>{data.hello}</div>
      {data.fields.image && (
        <Img resolutions={data.fields.image.childImageSharp.resolutions} />
      )}
    </Layout>
  )
}

export const query = graphql`
  query HomeContent($locale: String) {
    allHomeJson(filter: { fields: { locale: { eq: $locale } } }) {
      edges {
        node {
          id
          fields {
            image {
              childImageSharp {
                resolutions(width: 125, height: 125) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
        }
      }
    }
  }
`

IndexPage.propTypes = {
  pathContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({ allHomeJson: PropTypes.object }).isRequired,
}

export default IndexPage
