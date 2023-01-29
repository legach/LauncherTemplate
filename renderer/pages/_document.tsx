import { Html, Main, NextScript } from 'next/document'

import Head from 'src/components/Head/Head';
import Header from './header';
const Document = () => {
  return (
    <Html>
      <Head />
      <body>
          <Header/>
          <Main />
          <NextScript />
      </body>
    </Html>
  )
}

export default Document
