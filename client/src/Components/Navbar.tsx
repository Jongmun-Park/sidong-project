import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AccountMenu from './AccountMenu'
import MobileNavbar from './MobileNavbar'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    maxWidth: '1680px',
    width: '100%',
    margin: 'auto',
    '@media (max-width: 834px)': {
      display: 'none',
    },
  },
  logoFont: {
    marginLeft: '82px', // 70 + 12
    color: theme.palette.primary.main,
    fontWeight: 900,
    fontSize: '19px',
    letterSpacing: '2px',
  },
  menus: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuFont: {
    fontWeight: 600,
    letterSpacing: '2px',
    marginLeft: '45px',
  },
  rightArea: {
    margin: '0 70px 0 auto',
  },
  mobileNavbar: {
    display: 'none',
    '@media (max-width: 834px)': {
      display: 'block',
    },
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
        <div className={classes.rightArea}>
          <AccountMenu />
        </div>
      </nav>
      <div className={classes.mobileNavbar}>
        <MobileNavbar />
      </div>
    </header>
  )
}

export default NavBar
