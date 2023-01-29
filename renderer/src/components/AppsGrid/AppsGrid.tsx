import React from 'react'

import NextImage from 'next/image'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import AppPreview from 'src/components/AppPreview/AppPreview'

import type AppEntity from 'src/domain/applications.entity'

interface Props {
  applications: AppEntity[]
  onAppLaunch: (name: string, downloadLink: NullOr<string>, executablePath: NullOr<string>) => void
}

const AppsGrid: React.FC<Props> = (props) => {
  const { applications, onAppLaunch } = props

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box>
      {applications.length === 0 && (
        <Box
          mt={10}
          sx={{ borderRadius: 10000 }}
          display={'flex'}
          alignItems={'center'}
          flexDirection={'column'}
          justifyContent={'center'}>
          <NextImage
            height={400}
            objectFit={'cover'}
            priority={true}
            src={'/images/not-found.png'}
            style={{ borderRadius: 10000 }}
            width={400}
          />
          <Typography variant={'h3'} sx={{ mt: 5 }}>
            Not found
          </Typography>
          <Typography variant={'h6'}>Try again</Typography>
        </Box>
      )}
      <Grid container spacing={isSmall ? 0.5 : 2}>
        {applications.map((applications, index) => (
          <Grid key={index} xs={6} sm={4} md={3} lg={3}>
            <AppPreview applications={applications} hasImagePriority={index > 16} onAppLaunch={onAppLaunch}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default React.memo(AppsGrid)
