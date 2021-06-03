import React, { FC } from 'react'
import 'typeface-roboto'
import { makeStyles } from '@material-ui/core/styles'
import Router from './Router'
import NavBar from './Navbar'
import Footer from './Footer'

const useStyles = makeStyles((theme) => ({
  navBarContainer: {
    width: '100%',
    backgroundColor: 'white',
    position: 'fixed',
    zIndex: 100,
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.lightBlack.light,
  },
  router: {
    minHeight: 'calc(100vh - 73px)',
  },
}))

const App: FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.navBarContainer}>
        <NavBar />
      </div>
      <div className={classes.router}>
        <Router />
      </div>
      <Footer />
    </>
  )
}

export default App
