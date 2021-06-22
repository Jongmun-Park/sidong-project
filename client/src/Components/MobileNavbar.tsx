import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import AccountMenu from './AccountMenu'
import MobileMenu from './MobileMenu'
import SearchField from './SearchField'
import SearchIcon from '@material-ui/icons/Search'
import logo from '../logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .searchFieldWrapper': {
      height: '40px',
      '&.inactive': {
        display: 'none',
      },
    },
  },
  container: {
    display: 'flex',
    width: '100%',
    height: '50px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightArea: {
    '@media (min-width: 415px)': {
      marginRight: '10px',
    },
  },
  leftArea: {
    display: 'flex',
    alignItems: 'center',
    '@media (min-width: 415px)': {
      marginLeft: '10px',
    },
  },
  searchIcon: {
    fontSize: '23px',
  },
  logo: {
    cursor: 'pointer',
    width: '105px',
    '@media (min-width: 415px)': {
      marginLeft: '5px',
    },
  },
}))

const MobileNavbar: FC = () => {
  const classes = useStyles()
  const [openSearchField, setOpenSearchField] = useState<boolean>(false)

  return (
    <div className={classes.root}>
      <nav className={classes.container}>
        <div className={classes.leftArea}>
          <MobileMenu />
          <img
            className={classes.logo}
            onClick={() => {
              window.location.href = '/'
            }}
            src={logo}
            alt="로고"
          />
        </div>
        <div className={classes.rightArea}>
          <IconButton
            aria-controls="menu"
            aria-haspopup="true"
            aria-label="SearchButton"
            onClick={() => {
              setOpenSearchField(!openSearchField)
            }}
          >
            <SearchIcon className={classes.searchIcon} />
          </IconButton>
          <AccountMenu />
        </div>
      </nav>
      <div className={`searchFieldWrapper ${openSearchField ? '' : 'inactive'}`}>
        <SearchField />
      </div>
    </div>
  )
}

export default MobileNavbar
