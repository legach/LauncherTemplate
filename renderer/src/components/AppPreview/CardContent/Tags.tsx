import React, { memo, useMemo, useState } from 'react'
import { MAX_VISIBLE_TAGS, MORE_TAG_LABEL } from './constants'
import { toVisibleTags } from './utils'

import { Box, Chip } from '@mui/material'

interface Props {
  tags: string[]
}

const Tags: React.FC<Props> = (props) => {
  const { tags } = props

  const [isShowMoreTags, setIsShowMoreTags] = useState(false)

  const filteredTags = useMemo(
    () => (isShowMoreTags ? tags : toVisibleTags(tags, MAX_VISIBLE_TAGS, MORE_TAG_LABEL)),
    [isShowMoreTags, tags],
  )

  const handlePressAtChip: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget.dataset.tag === MORE_TAG_LABEL) {
      setIsShowMoreTags(true)
    }
  }

  return (
    <React.Fragment>
      {filteredTags.map((tag, index) => {
        const isMoreTag = tag === MORE_TAG_LABEL
        return (
          <Box key={index} marginBottom={0.5} marginRight={0.5}>
            <Chip
              clickable={isMoreTag}
              color={isMoreTag ? 'primary' : 'default'}
              data-tag={tag}
              label={tag}
              size={'small'}
              onClick={handlePressAtChip}
              variant={isMoreTag ? 'outlined' : 'filled'}
            />
          </Box>
        )
      })}
    </React.Fragment>
  )
}

export default memo(Tags)
