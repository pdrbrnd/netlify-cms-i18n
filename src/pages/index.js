import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/layouts'

const IndexPage = ({ pathContext: { locale }, ...props }) => {
  const { childHomeJson: data } = props.data.allFile.edges[0].node

  return (
    <Layout locale={locale}>
      <div>{data.hello}</div>
      <img alt="little cat" src={data.fields.image.publicURL} />
    </Layout>
  )
}

export const query = graphql`
  query HomeContent($locale: String) {
    allFile(filter: { name: { eq: $locale } }) {
      edges {
        node {
          childHomeJson {
            hello
            fields {
              image {
                publicURL
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
  data: PropTypes.shape({ allFile: PropTypes.object }).isRequired,
}

export default IndexPage
