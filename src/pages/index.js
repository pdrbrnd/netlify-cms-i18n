import React from 'react'
import { FormattedMessage } from 'react-intl'

import Layout from '../components/layouts'

const IndexPage = ({ pathContext: { locale } }) => (
  <Layout locale={locale}>
    <FormattedMessage id="hello" />
  </Layout>
)

export default IndexPage
