import React from 'react'

import { SvgIcon } from '@mui/material'

import type { SvgIconProps } from '@mui/material/SvgIcon/SvgIcon'

interface Props extends SvgIconProps {}

const PatreonIcon: React.FC<Props> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d='M 3 3 C 2.448 3 2 3.448 2 4 L 2 20 C 2 20.552 2.448 21 3 21 L 5 21 C 5.552 21 6 20.552 6 20 L 6 4 C 6 3.448 5.552 3 5 3 L 3 3 z M 15 3 C 11.141 3 8 6.141 8 10 C 8 13.859 11.141 17 15 17 C 18.859 17 22 13.859 22 10 C 22 6.141 18.859 3 15 3 z' />
    </SvgIcon>
  )
}

export default PatreonIcon
