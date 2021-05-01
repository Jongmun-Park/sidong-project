import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton } from '@material-ui/core'
import AccountMenu from './AccountMenu'
import MobileMenu from './MobileMenu'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    height: '50px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoFont: {
    color: theme.palette.primary.main,
    fontWeight: 900,
    fontSize: '15px',
    letterSpacing: '1px',
  },
  rightArea: {
    '@media (min-width: 415px)': {
      marginRight: '10px',
    },
  },
  leftArea: {
    '@media (min-width: 415px)': {
      marginLeft: '10px',
    },
  },
  searchIcon: {
    fontSize: '23px',
  },
}))

const MobileNavbar: FC = () => {
  const classes = useStyles()
  return (
    <nav className={classes.container}>
      <div className={classes.leftArea}>
        <MobileMenu />
        <Button href="/" className={classes.logoFont}>
          Jakupteo
        </Button>
      </div>
      <div className={classes.rightArea}>
        <IconButton
          aria-controls="menu"
          aria-haspopup="true"
          aria-label="SearchButton"
          onClick={() => {}}
        >
          <SearchIcon className={classes.searchIcon} />
        </IconButton>
        <AccountMenu />
      </div>
    </nav>
  )
}

export default MobileNavbar
