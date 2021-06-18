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
        <meta
          name="description"
          content="Jakupteo(작업터)는 예술 작품 및 그림을 구매하고 판매할 수 있는 아트 플랫폼입니다"
        />
        <meta property="og:title" content="Jakupteo(작업터)" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.jakupteo.com" />
        <meta
          property="og:description"
          content="Jakupteo(작업터)는 예술 작품 및 그림을 구매하고 판매할 수 있는 아트 플랫폼입니다"
        />
        <meta property="og:image" content="https://www.jakupteo.com/logo.png" />
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
