import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import React, { FunctionComponent, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Grid, Toolbar } from '@material-ui/core'

import SignUp from './User/SignUp'
import Login from './User/Login'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '60px',
    backgroundColor: 'rgb(255, 255, 255)',
    borderBottom: '1px solid rgb(229, 229, 229)',
    // '& a': {
    //   textDecoration: 'none',
    //   padding: '10px 20px',
    //   '&:hover': { color: '#B22222' },
    // },
  },
  headerLogo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '20px'
  },
  headerButtons: {
    display: 'flex',
    width: '400px',
    marginRight: '20px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBox: {},
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
    <header>
      <nav className={classes.container}>
        <div className={classes.headerLogo}>
          <div style={{ height: '45px' }}>
            <a href="/" style={{ display: 'block' }}>
              <img
                alt="Header Logo"
                style={{ width: '45px', height: '45px' }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Artsy_logo.svg/1198px-Artsy_logo.svg.png"
              ></img>
            </a>
          </div>
        </div>
        <div className={classes.searchBox}></div>
        <div className={classes.headerButtons}>
          <Button href="/art">ART</Button>
          <Button href="/artist">ARTIST</Button>
          {!data?.currentUser ? (
            <div>
              <Button variant="outlined" onClick={logInClickOpen}>
                LOG IN
              </Button>
              <Button
                variant="outlined"
                onClick={signUpClickOpen}
                style={{ marginLeft: '15px' }}
              >
                SIGN UP
              </Button>
              {signUpOpen && <SignUp openDialog={signUpOpen} handleOpenDialog={setSignUpOpen} />}
              {logInOpen && <Login openDialog={logInOpen} handleOpenDialog={setLogInOpen} />}
            </div>
          ) : (
            <div>
              <Button variant="outlined" href="/upload-post">
                LOG OUT
              </Button>
              {/* <Button variant="outlined" href="/upload-post">
                UPLOAD
              </Button> */}
            </div>
          )}
        </div>
      </nav>
    </header>
    //   </Toolbar>
    // </AppBar>
  )
}

export default NavBar
