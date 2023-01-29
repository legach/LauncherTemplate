import React from 'react'

import {Head as NextHead} from 'next/document'
import Analytics from 'src/components/Analytics/Analytics';

interface Props {}

const Head: React.FC<Props> = () => {
  return (
    <NextHead>
      <title>Title</title>
      <meta name={'description'} content={'applications for adults'} />

      <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='theme-color' content='#ffffff' />

      <link
        rel={'stylesheet'}
        href={'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'}
      />
      <link rel={'stylesheet'} href={'https://fonts.googleapis.com/icon?family=Material+Icons'} />
    </NextHead>
  )
}

export default Head