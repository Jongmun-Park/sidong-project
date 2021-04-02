import React, { FC, useState, MouseEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Button, Menu, MenuItem, IconButton } from '@material-ui/core'
import SignUp from './User/SignUp'
import Login from './User/Login'
import { useCurrentUser } from '../Hooks/User'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    zIndex: 100,
    display: 'flex',
    width: '100%',
    height: '49px',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoFont: {
    marginLeft: '60px',
    color: theme.palette.primary.main,
    fontWeight: 900,
    fontSize: '19px',
    letterSpacing: '3px',
    '@media (max-width: 823px)': {
      fontSize: 'initial',
      marginLeft: '10px',
      letterSpacing: '1px',
    },
  },
  menus: {
    width: '400px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '60px',
    '@media (max-width: 823px)': {
      marginRight: '10px',
      width: 'auto',
    },
  },
  menuFont: {
    fontWeight: 600,
    letterSpacing: '2px',
    '@media (max-width: 823px)': {
      fontSize: 'small',
      letterSpacing: '1px',
    },
  },
  accountCircleIcon: {
    fontSize: 'xx-large',
    '@media (max-width: 823px)': {
      fontSize: 'larger',
    },
  },
}))

function logout() {
  sessionStorage.removeItem('token')
  window.location.reload()
}

const NavBar: FC = () => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const isApprovedArtist = currentUser?.artist?.isApproved
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
          작업터
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
              <AccountCircleIcon className={classes.accountCircleIcon} />
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
                  <MenuItem onClick={() => (window.location.href = '/account')}>내 계정</MenuItem>
                  <MenuItem onClick={() => (window.location.href = '/account/likes')}>
                    관심 목록
                  </MenuItem>
                  {isApprovedArtist ? (
                    <>
                      <MenuItem onClick={() => (window.location.href = '/art/register')}>
                        작품 등록
                      </MenuItem>
                      <MenuItem onClick={() => (window.location.href = '/account/arts')}>
                        작품 관리
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem onClick={() => (window.location.href = '/artist/register')}>
                      작가 등록
                    </MenuItem>
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
