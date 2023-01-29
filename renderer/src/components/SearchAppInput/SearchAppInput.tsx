import React, { memo } from 'react'
import { Box, CircularProgress, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  isLoading: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const SearchAppInput: React.FC<Props> = (props) => {
  const { isLoading, onChange } = props

  return (
    <React.Fragment>
      {isLoading ? (
        <Box
          mr={1}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ position: 'relative', top: 20 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Box>
          <SearchIcon sx={{ color: 'action.active', mr: 1, position: 'relative', top: 20 }} />
        </Box>
      )}

      <TextField
        fullWidth={true}
        onChange={onChange}
        id='standard-basic'
        label='Search applications'
        variant='standard'
      />
    </React.Fragment>
  )
}

export default memo(SearchAppInput)
