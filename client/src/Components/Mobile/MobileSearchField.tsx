import React, { FC, useState } from 'react'
import { InputBase, Button, IconButton } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles((theme) => ({
  search: {
    width: '93%',
    maxWidth: '353px',
    height: '100%',
    margin: 'auto 10px auto auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: '8px',
    marginRight: '5px',
    transition: theme.transitions.create('width'),
    width: '100%',
    backgroundColor: fade(theme.palette.primary.main, 0.1),
  },
}))

interface SearchFieldProps {
  setOpenSearchField: (arg0: boolean) => void
}

const MobileSearchField: FC<SearchFieldProps> = ({ setOpenSearchField }) => {
  const classes = useStyles()
  const [searchWord, setSearchWord] = useState<string>('')

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="search art, artist"
        autoFocus={true}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={searchWord}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchWord(e.target.value)
        }}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            if (searchWord === '') {
              alert('검색어를 입력해주세요.')
              return
            }
            window.location.href = `/search?word=${searchWord}`
          }
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <Button
        variant="outlined"
        color="primary"
        style={{ padding: '0px' }}
        onClick={() => {
          if (searchWord === '') {
            alert('검색어를 입력해주세요.')
            return
          }
          window.location.href = `/search?word=${searchWord}`
        }}
      >
        search
      </Button>
      <IconButton
        style={{ marginLeft: '3px' }}
        size="small"
        onClick={() => {
          setOpenSearchField(false)
        }}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    </div>
  )
}

export default MobileSearchField
