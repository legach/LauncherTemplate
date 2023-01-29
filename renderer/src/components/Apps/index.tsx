import React, { memo } from 'react'
import AppsGrid from 'src/components/AppsGrid/AppsGrid'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import AppEntity from 'src/domain/applications.entity'

interface Props {
  data: AppEntity[]
  onAppLaunch: (name: string, downloadLink: NullOr<string>, executablePath: NullOr<string>) => void
}

const Apps: React.FC<Props> = (props) => {
  const { data, onAppLaunch } = props

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Container
      id={'applications-wrapper'}
      component={'main'}
      sx={{ flex: 1, paddingTop: '80px', pl: isSmall ? 1 : 2, pr: isSmall ? 1 : 2 }}>
      <AppsGrid applications={data} onAppLaunch={onAppLaunch}/>
    </Container>
  )
}

export default memo(Apps)
