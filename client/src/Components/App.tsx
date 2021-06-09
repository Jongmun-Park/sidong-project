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
        <title>작업터 - 예술 작품 및 그림 구매를 위한 아트 플랫폼</title>
        <meta name="description" content="작품 구매와 판매, 그림 구매와 판매를 위한 아트 플랫폼" />
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
