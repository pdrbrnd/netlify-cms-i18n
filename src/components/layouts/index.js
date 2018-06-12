import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'

// Locale data
import enData from 'react-intl/locale-data/en'
import ptData from 'react-intl/locale-data/pt'

// Messages
import en from '../../data/en.json'
import pt from '../../data/pt.json'

const messages = { en, pt }

addLocaleData([...enData, ...ptData])

const Layout = ({ locale, children }) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    {children}
  </IntlProvider>
)

export default Layout
