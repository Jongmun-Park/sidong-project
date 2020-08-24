import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import React, { FunctionComponent, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Toolbar } from '@material-ui/core'

import SignUp from './User/SignUp'
import Login from './User/Login'

const useStyles = makeStyles(() => ({
  navbar: {
    width: '100%',
    '& >div': { float: 'right' },
    '& >ul': {
      margin: 0,
      listStyle: 'none',
      '& >li': { float: 'left' },
    },
    '& a': {
      textDecoration: 'none',
      padding: '10px 20px',
      '&:hover': { color: '#B22222' },
    },
  },
}))

const IS_LOGIN = gql`
  {
    currentUser {
      id
      username
    }
  }
`

const NavBar: FunctionComponent = () => {
  const classes = useStyles({})
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [logInOpen, setLogInOpen] = useState(false)
  const { data, error } = useQuery(IS_LOGIN)
  console.log('login data,', data)

  if (error) {
    console.error(error.message)
    return <p>Something is wrong</p>
  }

  const signUpClickOpen = () => {
    setSignUpOpen(true)
  }

  const logInClickOpen = () => {
    setLogInOpen(true)
  }

  return (
    <AppBar color="inherit" position="static">
      <Toolbar>
        <a href="/">
          <img
            alt="Brand Logo"
            style={{ width: '50px', height: '50px', verticalAlign: 'middle' }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Artsy_logo.svg/1198px-Artsy_logo.svg.png"
          ></img>
        </a>
        <nav className={classes.navbar}>
          <ul>
            <li>
              <a href="/art">Art</a>
            </li>
            <li>
              <a href="/practice">Practice</a>
            </li>
          </ul>
          {!data?.currentUser ? (
            <div>
              <Button variant="outlined" color="primary" onClick={logInClickOpen}>
                로그인
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={signUpClickOpen}
                style={{ marginLeft: '15px' }}
              >
                회원 가입
              </Button>
              {signUpOpen && <SignUp openDialog={signUpOpen} handleOpenDialog={setSignUpOpen} />}
              {logInOpen && <Login openDialog={logInOpen} handleOpenDialog={setLogInOpen} />}
            </div>
          ) : (
            <div>
              <Button variant="outlined" color="primary" href="/upload-post">
                게시글 등록
              </Button>
            </div>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
