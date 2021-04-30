import React, { FC, useState, MouseEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import { Menu, MenuItem, IconButton } from '@material-ui/core'
import SignUp from './User/SignUp'
import Login from './User/Login'
import { useCurrentUser } from '../Hooks/User'

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    fontSize: '27px',
  },
}))

const MobileMenu: FC = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        aria-label="MenuButton"
        onClick={handleClickMenu}
      >
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => (window.location.href = '/about')}>서비스 소개</MenuItem>
        <MenuItem onClick={() => (window.location.href = '/arts')}>작 품</MenuItem>
        <MenuItem onClick={() => (window.location.href = '/artists')}>작 가</MenuItem>
      </Menu>
    </>
  )
}

export default MobileMenu
