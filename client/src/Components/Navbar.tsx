import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import React, { FunctionComponent, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import SignUp from './User/SignUp'
import Login from './User/Login'

const useStyles = makeStyles(() => ({
  container: {
    height: '60px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '20px'
  },
  logoFont: {
    color: '#722F37',
    fontWeight: 900,
    fontSize: 'large',
  },
  buttons: {
    width: '400px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '20px',
  },
  buttonFont: {
    fontWeight: 600,
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

function logout() {
  sessionStorage.removeItem('token')
  window.location.reload()
}

const NavBar: FunctionComponent = () => {
  const classes = useStyles({})
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [logInOpen, setLogInOpen] = useState(false)
  const { data, error } = useQuery(IS_LOGIN)

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
    <header>
      <nav className={classes.container}>
        <div className={classes.logo}>
          <Button href="/" className={classes.logoFont}>JAKUPSIL</Button>
        </div>
        <div className={classes.buttons}>
          <Button className={classes.buttonFont} href="/art">작품</Button>
          <Button className={classes.buttonFont} href="/artist">작가</Button>
          {!data?.currentUser ? (
            <div>
              <Button size="small" variant="outlined" onClick={logInClickOpen}>
                로그인
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={signUpClickOpen}
                style={{ marginLeft: '15px' }}
              >
                회원가입
              </Button>
              {signUpOpen && <SignUp openDialog={signUpOpen} handleOpenDialog={setSignUpOpen} />}
              {logInOpen && <Login openDialog={logInOpen} handleOpenDialog={setLogInOpen} />}
            </div>
          ) : (
            <div>
              <Button size="small" variant="outlined" onClick={logout}>
                로그아웃
              </Button>
              {/* <Button variant="outlined" href="/upload-post">
                UPLOAD
              </Button> */}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default NavBar
