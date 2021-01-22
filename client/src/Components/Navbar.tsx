import React, { FunctionComponent, useState, MouseEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Button, Menu, MenuItem, IconButton } from '@material-ui/core'

import SignUp from './User/SignUp'
import Login from './User/Login'
import { useCurrentUser } from '../Hooks/User'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    marginLeft: '20px',
  },
  logoFont: {
    color: '#722F37',
    fontWeight: 900,
    fontSize: 'large',
  },
  menus: {
    width: '400px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '28px',
  },
  menuFont: {
    fontWeight: 600,
  },
  buttons: {
    '& button:nth-child(2)': {
      backgroundColor: theme.palette.highlight.main,
    },
    '& button:not(:first-child)': {
      marginLeft: '15px',
    },
    '& a': {
      marginLeft: '15px',
      backgroundColor: theme.palette.highlight.main,
    },
  },
}))

function logout() {
  sessionStorage.removeItem('token')
  window.location.reload()
}

const NavBar: FunctionComponent = () => {
  const classes = useStyles({})
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
        <div className={classes.logo}>
          <Button href="/" className={classes.logoFont}>
            JAKUPSIL
          </Button>
        </div>
        <div className={classes.menus}>
          <Button className={classes.menuFont} href="/about">
            소개
          </Button>
          <Button className={classes.menuFont} href="/art">
            작품
          </Button>
          <Button className={classes.menuFont} href="/artist">
            작가
          </Button>
          {!currentUser ? (
            <div className={classes.buttons}>
              <Button size="small" variant="contained" onClick={handleClickLogin}>
                로그인
              </Button>
              <Button size="small" variant="contained" onClick={handleClickSignUp}>
                회원가입
              </Button>
              {openSignUp && <SignUp openDialog={openSignUp} handleOpenDialog={setOpenSignUp} />}
              {openLogin && <Login openDialog={openLogin} handleOpenDialog={setOpenLogin} />}
            </div>
          ) : (
            <div className={classes.buttons}>
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
                <MenuItem onClick={handleCloseAccountMenu}>프로필</MenuItem>
                <MenuItem onClick={handleCloseAccountMenu}>계정 관리</MenuItem>
                <MenuItem onClick={logout}>로그아웃</MenuItem>
              </Menu>
              {!currentUser.artist && (
                <Button size="small" variant="contained" href="/artist/register">
                  작가 등록
                </Button>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default NavBar
