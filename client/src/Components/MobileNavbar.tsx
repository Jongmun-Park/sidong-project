import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AccountMenu from './AccountMenu'
import MobileMenu from './MobileMenu'

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
}))

const MobileNavbar: FC = () => {
  const classes = useStyles()
  return (
    <nav className={classes.container}>
      <MobileMenu />
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
