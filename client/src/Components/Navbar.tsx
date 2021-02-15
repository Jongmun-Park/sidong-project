import React, { FC, useState, MouseEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Button, Menu, MenuItem, IconButton } from '@material-ui/core'

import SignUp from './User/SignUp'
import Login from './User/Login'
import { useCurrentUser } from '../Hooks/User'

const useStyles = makeStyles({
  container: {
    height: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoFont: {
    marginLeft: '30px',
    color: '#722F37',
    fontWeight: 900,
    fontSize: 'large',
    '@media (max-width: 823px)': {
      fontSize: 'initial',
      marginLeft: '10px',
    },
  },
  menus: {
    width: '400px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '30px',
    '@media (max-width: 823px)': {
      marginRight: '10px',
      width: 'auto',
    },
  },
  menuFont: {
    fontWeight: 600,
  },
})

function logout() {
  sessionStorage.removeItem('token')
  window.location.reload()
}

function redirectToRegisterArtistPage() {
  window.location.href = '/artist/register'
}

function redirectToRegisterArtPage() {
  window.location.href = '/art/register'
}

const NavBar: FC = () => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const [openSignUp, setOpenSignUp] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClickSignUp = () => {
    setOpenSignUp(true)
  }

  const handleClickLogin = () => {
    setOpenLogin(true)
  }

  const handleClickAccountMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseAccountMenu = () => {
    setAnchorEl(null)
  }

  return (
    <header>
      <nav className={classes.container}>
        <Button href="/" className={classes.logoFont}>
          작업실
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
          {openSignUp && <SignUp openDialog={openSignUp} handleOpenDialog={setOpenSignUp} />}
          {openLogin && <Login openDialog={openLogin} handleOpenDialog={setOpenLogin} />}
          <div>
            <IconButton
              aria-controls="account-menu"
              aria-haspopup="true"
              aria-label="AccountMenuButton"
              onClick={handleClickAccountMenu}
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseAccountMenu}
            >
              {currentUser ? (
                <div>
                  <MenuItem onClick={handleCloseAccountMenu}>프로필</MenuItem>
                  {currentUser.artist ? (
                    <MenuItem onClick={redirectToRegisterArtPage}>작품 등록</MenuItem>
                  ) : (
                    <MenuItem onClick={redirectToRegisterArtistPage}>작가 등록</MenuItem>
                  )}
                  <MenuItem onClick={logout}>로그아웃</MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={handleClickLogin}>로그인</MenuItem>
                  <MenuItem onClick={handleClickSignUp}>회원 가입</MenuItem>
                </div>
              )}
            </Menu>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
