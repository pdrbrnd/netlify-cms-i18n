import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/layouts'

const IndexPage = ({ pathContext: { locale }, ...props }) => {
  const { node: data } = props.data.allHomeJson.edges[0]

  return (
    <Layout locale={locale}>
      <div>{data.hello}</div>
      {data.fields.image && (
        <img alt="little cat" src={data.fields.image.publicURL} />
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
              publicURL
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
