import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AccountMenu from './AccountMenu'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
    maxWidth: '1680px',
    width: '100%',
    margin: 'auto',
  },
  logoFont: {
    marginLeft: '30px',
    color: theme.palette.primary.main,
    fontWeight: 900,
    fontSize: '19px',
    letterSpacing: '2px',
    '@media (max-width: 834px)': {
      fontSize: '15px',
      marginLeft: '10px',
      letterSpacing: '1px',
    },
  },
  menus: {
    // width: '400px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginRight: '50px',
    '@media (max-width: 834px)': {
      // marginRight: '3px',
      width: 'auto',
    },
  },
  menuFont: {
    fontWeight: 600,
    letterSpacing: '2px',
    marginLeft: '45px',
    '@media (max-width: 834px)': {
      fontSize: '12px',
      letterSpacing: '1px',
    },
  },
  accountMenu: {
    margin: '0 30px 0 auto',
  },
}))

const NavBar: FC = () => {
  const classes = useStyles()
  return (
    <header>
      <nav className={classes.container}>
        <Button href="/" className={classes.logoFont}>
          Jakupteo
        </Button>
        <div className={classes.menus}>
          <Button className={classes.menuFont} href="/about">
            소개
          </Button>
          <Button className={classes.menuFont} href="/arts">
            작품
          </Button>
          <Button className={classes.menuFont} href="/artists">
            작가
          </Button>
        </div>
        <div className={classes.accountMenu}>
          <AccountMenu />
        </div>
      </nav>
    </header>
  )
}

export default NavBar
