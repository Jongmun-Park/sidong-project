import React, { FC, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Tabs, Tab, Typography } from '@material-ui/core'
import { useCurrentUser } from '../Hooks/User'

const useStyles = makeStyles((theme) => ({
  container: {
    '@media (min-width: 1024px)': {
      margin: '0 auto 0 auto',
    },
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1192px',
    minHeight: '100vh',
    backgroundColor: 'white',
  },
  userName: {
    margin: '40px 0 40px 60px',
    fontWeight: 600,
    '@media (max-width: 823px)': {
      margin: '25px 0 25px 33px',
      fontSize: '18px',
    },
  },
  tabs: {
    width: '100%',
    paddingLeft: '40px',
    '@media (max-width: 823px)': {
      paddingLeft: '15px',
    },
  },
  tabPanel: {
    width: '100%',
    '& .MuiBox-root': {
      padding: '48px 60px 48px 60px',
      '@media (max-width: 823px)': {
        padding: '30px 15px 30px 15px',
      },
    },
  },
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}
interface ArtDetailParams {
  artID: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Account: FC<ArtDetailParams> = ({ artID }) => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const [value, setValue] = useState<number>(0)

  if (!currentUser) {
    alert('로그인이 필요합니다.')
    window.history.back()
  }

  //   const { data } = useQuery(ART, {
  //     variables: {
  //       artId: artID,
  //     },
  //     onError: (error) => {
  //       console.error(error.message)
  //     },
  //   })

  //   if (!data) {
  //     return null
  //   }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <main className={classes.container}>
      <Typography className={classes.userName} variant="h6">
        {currentUser.username}
      </Typography>
      <Tabs
        className={classes.tabs}
        indicatorColor="primary"
        textColor="primary"
        value={value}
        onChange={handleChange}
        aria-label="내 계정 탭"
      >
        <Tab label="좋아요" {...a11yProps(0)} />
        <Tab label="주문 관리" {...a11yProps(1)} />
      </Tabs>
      <div className={classes.tabPanel}>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </div>
    </main>
  )
}

export default Account
