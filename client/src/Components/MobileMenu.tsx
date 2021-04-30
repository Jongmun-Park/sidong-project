import React, { FC, useState, MouseEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Menu, MenuItem, IconButton } from '@material-ui/core'
import SignUp from './User/SignUp'
import Login from './User/Login'
import { useCurrentUser } from '../Hooks/User'

const useStyles = makeStyles((theme) => ({
  accountCircleIcon: {
    fontSize: 'xx-large',
    '@media (max-width: 834px)': {
      fontSize: '27px',
    },
  },
  pointFont: {
    color: theme.palette.primary.main,
  },
}))

function logout() {
  sessionStorage.removeItem('token')
  window.location.reload()
}

const MobileMenu: FC = () => {
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
    <>
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
            {isApprovedArtist ? (
              <>
                <MenuItem
                  onClick={() => (window.location.href = `/artist/${currentUser?.artist?.id}`)}
                >
                  프로필
                </MenuItem>
                <MenuItem
                  className={classes.pointFont}
                  onClick={() => (window.location.href = '/art/register')}
                >
                  작품 등록
                </MenuItem>
                <MenuItem onClick={() => (window.location.href = '/account/arts')}>
                  작품 관리
                </MenuItem>
                <MenuItem onClick={() => (window.location.href = '/account/sales')}>
                  판매 관리
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => (window.location.href = '/account')}>내 계정</MenuItem>
                <MenuItem onClick={() => (window.location.href = '/artist/register')}>
                  작가 등록
                </MenuItem>
              </>
            )}
            <MenuItem onClick={() => (window.location.href = '/account/likes')}>관심 목록</MenuItem>
            <MenuItem onClick={() => (window.location.href = '/account/orders')}>
              주문 내역
            </MenuItem>
            <MenuItem onClick={logout}>로그아웃</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleClickLogin}>로그인</MenuItem>
            <MenuItem onClick={handleClickSignUp}>회원 가입</MenuItem>
          </div>
        )}
      </Menu>
      {openSignUp && <SignUp openDialog={openSignUp} handleOpenDialog={setOpenSignUp} />}
      {openLogin && <Login openDialog={openLogin} handleOpenDialog={setOpenLogin} />}
    </>
  )
}

export default MobileMenu
