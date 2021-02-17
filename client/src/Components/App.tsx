import React, { FC } from 'react'
import 'typeface-roboto'
import { makeStyles } from '@material-ui/core/styles'
import Router from './Router'
import NavBar from './Navbar'

const useStyles = makeStyles({
  navBarContainer: {
    paddingBottom: '50px',
  },
})

const App: FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.navBarContainer}>
        <NavBar />
      </div>
      <Router />
    </>
  )
}

export default App
