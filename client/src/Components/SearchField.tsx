import React, { FC, useState } from 'react'
import { InputBase, Button, IconButton } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles((theme) => ({
  search: {
    width: '85%',
    maxWidth: '300px',
    height: '100%',
    margin: 'auto 15px auto auto',
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
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
    },
  },
}))

interface SearchFieldProps {
  setOpenSearchField: (arg0: boolean) => void
}

const SearchField: FC<SearchFieldProps> = ({ setOpenSearchField }) => {
  const classes = useStyles()
  const [searchWord, setSearchWord] = useState<string>('')

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="search word"
        autoFocus={true}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={searchWord}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchWord(e.target.value)
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <Button color="primary">search</Button>
      <IconButton
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

export default SearchField
