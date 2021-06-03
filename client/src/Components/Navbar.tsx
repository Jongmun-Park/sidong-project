import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AccountMenu from './AccountMenu'
import MobileNavbar from './MobileNavbar'
import { useCurrentUser } from '../Hooks/User'
import logo from '../logo.png'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '56px',
    maxWidth: '1680px',
    width: '100%',
    margin: 'auto',
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.lightBlack.light,
    '@media (max-width: 834px)': {
      display: 'none',
    },
  },
  logo: {
    marginLeft: '82px', // 70 + 12
    cursor: 'pointer',
    width: '130px',
  },
  menus: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '20px',
  },
  menuFont: {
    letterSpacing: '2px',
    fontWeight: 600,
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
  accountMenu: {
    display: 'inline-block',
    marginLeft: '30px',
  },
  registerButton: {
    height: '32px',
    fontSize: '14px',
    fontWeight: 600,
    borderRadius: '8px',
  },
}))

const NavBar: FC = () => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const isApprovedArtist = currentUser?.artist?.isApproved

  return (
    <header>
      <nav className={classes.container}>
        <img
          className={classes.logo}
          onClick={() => {
            window.location.href = '/'
          }}
          src={logo}
          alt="로고"
        />
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
          {isApprovedArtist ? (
            <Button
              className={classes.registerButton}
              variant="outlined"
              color="secondary"
              onClick={() => {
                window.location.href = '/art/register'
              }}
            >
              작품 등록
            </Button>
          ) : (
            <Button
              className={classes.registerButton}
              variant="outlined"
              color="secondary"
              onClick={() => {
                if (currentUser) {
                  window.location.href = '/artist/register'
                } else {
                  alert('로그인 먼저 부탁드립니다 :)')
                }
              }}
            >
              작가 등록
            </Button>
          )}
          <div className={classes.accountMenu}>
            <AccountMenu />
          </div>
        </div>
      </nav>
      <div className={classes.mobileNavbar}>
        <MobileNavbar />
      </div>
    </header>
  )
}

export default NavBar
