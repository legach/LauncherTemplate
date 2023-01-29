import React from 'react'

import './style.css'

import type { AppProps } from 'next/app'
import Analytics from 'src/components/Analytics/Analytics'


const Application = ({ Component, pageProps }: AppProps) => {
  return (
    <React.Fragment>
      <Analytics />
      
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default Application
