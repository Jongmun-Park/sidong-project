import React, { FC } from 'react'
import 'typeface-roboto'
import { Helmet } from 'react-helmet'
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
      <Helmet>
        <title>Jakupteo(작업터) - 예술 작품 및 그림 구매</title>
        {/* <meta name="description" content="Jakupteo는 예술 작품 및 그림을 구매하고 판매할 수 있는 아트 플랫폼입니다" /> */}
      </Helmet>
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
