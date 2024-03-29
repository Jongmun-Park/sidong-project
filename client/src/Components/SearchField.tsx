import React, { FC, useState } from 'react'
import { InputBase } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  search: {
    width: '320px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: '30px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    borderRadius: '0 3px 3px 0',
    cursor: 'pointer',
  },
  inputInput: {
    borderRadius: '3px 0 0 3px',
    width: '272px',
    padding: '8px 8px 8px 10px',
    transition: theme.transitions.create('width'),
    backgroundColor: fade(theme.palette.primary.main, 0.1),
  },
}))

const SearchField: FC = () => {
  const classes = useStyles()
  const [searchWord, setSearchWord] = useState<string>('')

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="search art, artist"
        classes={{
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
      <div
        className={classes.searchIcon}
        onClick={() => {
          if (searchWord === '') {
            alert('검색어를 입력해주세요.')
            return
          }
          window.location.href = `/search?word=${searchWord}`
        }}
      >
        <SearchIcon />
      </div>
    </div>
  )
}

export default SearchField
