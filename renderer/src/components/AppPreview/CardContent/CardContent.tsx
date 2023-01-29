import React from 'react'
import {
  HEIGHT,
  LIKES_LABEL,
  PLAYERS_LABEL,
} from 'src/components/AppPreview/CardContent/constants'
import cssStyles from './style.module.css'
import * as jsStyles from './styles'

import {
  Box,
  CardContent as MUICardContent,
  Rating as MUIRating,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Tags from './Tags'

interface Props {
  likes: NullOr<number>
  name: string
  rating: NullOr<Rating>
  tags: string[]
  views: NullOr<Views>
}

const CardContent: React.FC<Props> = (props) => {
  const { likes, name, rating, tags, views } = props

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('lg'))

  const isShowLikes = !!likes
  const isShowPlayers = !!views
  const isShowRating = !!rating
  const isShowTags = tags.length > 0

  return (
    <MUICardContent
      sx={{
        ...jsStyles.CardContentStyles,
        pt: isSmall ? 1 : 2,
        pl: isSmall ? 1 : 2,
        pr: isSmall ? 1 : 2,
      }}>
      <Box
        alignItems={isSmall ? 'left' : 'center'}
        display={'flex'}
        flexDirection={isSmall ? 'column' : 'row'}
        height={HEIGHT}
        justifyContent={'space-between'}
        marginBottom={2}>
        <Typography component='h2' fontWeight={'bolder'} variant={'body2'}>
          {name}
        </Typography>

        {isShowRating && (
          <Box
            alignItems={'center'}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={isSmall ? 'flex-start' : 'flex-end'}
            marginLeft={isSmall ? 0 : 1}
            position={'relative'}
            right={isSmall ? 0 : -2}>
            <MUIRating name={'read-only'} readOnly={true} size={'small'} value={rating} />
          </Box>
        )}
      </Box>

      {isShowLikes && (
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
          <Typography variant={'caption'}>{LIKES_LABEL}</Typography>
          <Typography variant={'caption'}>{likes}</Typography>
        </Box>
      )}

      {isShowPlayers && (
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          marginBottom={2}>
          <Typography variant={'caption'}>{PLAYERS_LABEL}</Typography>
          <Typography variant={'caption'}>{views}</Typography>
        </Box>
      )}

      {isShowTags && (
        <Box
          className={cssStyles.Tags_Box}
          display={'flex'}
          height={isSmall ? 65 : 75}
          sx={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
          flexWrap={'wrap'}>
          <Tags tags={tags} />
        </Box>
      )}
    </MUICardContent>
  )
}

export default React.memo(CardContent)
