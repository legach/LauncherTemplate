import React from 'react'

import Script from 'next/script'

interface Props {}

const Analytics: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-J964G5TPJB'
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-J964G5TPJB');
        `}
      </Script>
    </React.Fragment>
  )
}

export default Analytics
