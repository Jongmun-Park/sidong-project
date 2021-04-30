import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AccountMenu from './AccountMenu'

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
  menus: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (min-width: 415px)': {
      marginLeft: '10px',
    },
  },
  menuFont: {
    fontWeight: 600,
    fontSize: '12px',
    marginLeft: '45px',
    letterSpacing: '1px',
  },
  rightArea: {
    '@media (min-width: 415px)': {
      marginRight: '10px',
    },
  },
}))

const MobileNavbar: FC = () => {
  const classes = useStyles()
  return (
    <nav className={classes.container}>
      <div className={classes.menus}>
        햄버거
        {/* <Button className={classes.menuFont} href="/about">
            소개
          </Button>
          <Button className={classes.menuFont} href="/arts">
            작품
          </Button>
          <Button className={classes.menuFont} href="/artists">
            작가
          </Button> */}
      </div>
      <Button href="/" className={classes.logoFont}>
        Jakupteo
      </Button>
      <div className={classes.rightArea}>
        <AccountMenu />
      </div>
    </nav>
  )
}

export default MobileNavbar
