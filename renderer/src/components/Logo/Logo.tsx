import React from 'react'
import NextImage from 'next/image'

interface Props {}

const Logo: React.FC<Props> = (props) => {
  return <NextImage src={'/logo.png'} width={152} height={75} priority={true} />
}

export default Logo
