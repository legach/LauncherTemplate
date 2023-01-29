import React from 'react'
import NextImage from 'next/image'
import * as jsStyles from 'src/components/AppPreview/styles'
import cssStyles from './style.module.css'

import { Box, Card } from '@mui/material'
import CardActions from './CardActions/CardActions'
import CardContent from './CardContent/CardContent'

import type AppEntity from 'src/domain/applications.entity'

const COVER_HEIGHT = 69

interface Props {
  applications: AppEntity
  hasImagePriority?: boolean
  onAppLaunch: (name: string, downloadLink: NullOr<string>, executablePath: NullOr<string>) => void
}

const AppPreview: React.FC<Props> = (props) => {
  const { applications, hasImagePriority, onAppLaunch } = props

  const coverSrc = `/images/applications/${applications?.cover}`

  return (
    <Card elevation={1} sx={jsStyles.AppPreviewStyles}>
      <Box height={COVER_HEIGHT} sx={{ backgroundColor: '#212121', position: 'relative' }}>
        {applications?.cover && (
          <NextImage
            className={cssStyles.AppPreviewImage}
            height={COVER_HEIGHT}
            priority={hasImagePriority}
            src={coverSrc}
            layout={'fill'}
            objectFit={'cover'}
          />
        )}
      </Box>
      <Box
        alignItems={'end'}
        display={'flex'}
        flex={1}
        flexDirection={'column'}
        justifyContent={'space-between'}>
        <CardContent
          likes={applications.likes}
          name={applications.name}
          rating={applications.rating}
          tags={applications.tags}
          views={applications.views}
        />
        <CardActions
          {...applications.media}
          {...applications.settings}
          settings={{ ...applications.settings, name: applications.name, onAppLaunch }}
        />
      </Box>
    </Card>
  )
}

export default React.memo(AppPreview)
