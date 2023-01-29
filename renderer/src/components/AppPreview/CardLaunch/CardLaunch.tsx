import React from 'react'
import { Box, Button, CardActions as MUICardActions } from '@mui/material'
import { CardLaunchStyles } from './styles'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

interface Props {
  name: string
  downloadLink?: NullOr<string>
  executablePath?: NullOr<string>
  onAppLaunch: (name: string, downloadLink: NullOr<string>, executablePath: NullOr<string>) => void
}

const fireEvent = (value: string) => {
  ;(window as UNSAFE_ANY_TYPE).gtag('event', 'click-at-applications', {
    value,
  })
}

const CardLaunch: React.FC<Props> = (props) => {
  const onPlayClick = () => {
    props.onAppLaunch(props.name, props.downloadLink ?? '', props.executablePath ?? '')
    fireEvent(props.name)
  }

  const onWishClick = () => {
    fireEvent(props.name)
  }
  const button = props.downloadLink ? (
    <Button variant='contained' onClick={onPlayClick} startIcon={<PlayArrowIcon />}>
      Play
    </Button>
  ) : (
    <Button variant='outlined' onClick={onWishClick}>
      I wish
    </Button>
  )

  const isShow = !!props.downloadLink

  return (
    <MUICardActions sx={CardLaunchStyles}>
      <Box
        alignItems={'center'}
        display={'flex'}
        flex={1}
        flexDirection={'row'}
        justifyContent={'space-between'}>
        {button}
      </Box>
    </MUICardActions>
  )
}

export default React.memo(CardLaunch)
