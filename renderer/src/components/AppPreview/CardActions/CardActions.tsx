import React from 'react'
import { CardActionsStyles } from 'src/components/AppPreview/CardActions/styles'

import { Box, CardActions as MUICardActions, IconButton } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp'
import PatreonIcon from 'src/components/icons/PatreonIcon'
import DiscordIcon from 'src/components/icons/DiscordIcon'
import ItchIoIcon from 'src/components/icons/ItchIoIcon'
import CardLaunch from 'src/components/AppPreview/CardLaunch/CardLaunch'

interface Props {
  discord: NullOr<Url>
  f95zone: NullOr<Url>
  itch: NullOr<Url>
  patreon: NullOr<Url>
  twitter: NullOr<Url>
  website: NullOr<Url>
  settings: {
    name: string
    downloadLink?: NullOr<string>
    executablePath?: NullOr<string>
    onAppLaunch: (
      name: string,
      downloadLink: NullOr<string>,
      executablePath: NullOr<string>,
    ) => void
  }
}

const CardActions: React.FC<Props> = (props) => {
  const { discord, itch, patreon, settings, twitter, website } = props

  const isShowDiscord = !!discord
  const isShowItch = !!itch
  const isShowPatreon = !!patreon
  const isShowTwitter = !!twitter
  const isShowWebsite = !!website

  return (
    <MUICardActions sx={CardActionsStyles}>
      <Box
        alignItems={'center'}
        display={'flex'}
        flex={1}
        flexDirection={'row'}
        justifyContent={'space-between'}>
        <Box>
          {isShowTwitter && (
            <IconButton href={twitter} size={'small'}>
              <TwitterIcon fontSize={'small'} />
            </IconButton>
          )}

          {isShowWebsite && (
            <IconButton href={website} target={'_blank'} size={'small'}>
              <LanguageSharpIcon fontSize={'small'} />
            </IconButton>
          )}

          {isShowPatreon && (
            <IconButton href={patreon} target={'_blank'} size={'small'}>
              <PatreonIcon fontSize={'small'} />
            </IconButton>
          )}

          {isShowDiscord && (
            <IconButton href={discord} target={'_blank'} size={'small'}>
              <DiscordIcon fontSize={'small'} />
            </IconButton>
          )}

          {isShowItch && (
            <IconButton href={itch} target={'_blank'} size={'small'}>
              <ItchIoIcon />
            </IconButton>
          )}
        </Box>
        <Box>
          <CardLaunch {...settings} />
        </Box>
      </Box>
    </MUICardActions>
  )
}

export default React.memo(CardActions)
