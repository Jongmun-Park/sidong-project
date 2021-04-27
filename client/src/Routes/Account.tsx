import React, { FC, useState, ChangeEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Tabs, Tab, Typography } from '@material-ui/core'
import { useCurrentUser } from '../Hooks/User'
import LikeContents from '../Components/User/LikingContents'
import MyArtListTable from '../Components/Artist/MyArtListTable'
import MySaleListTable from '../Components/Artist/MySaleListTable'
import MyOrderListTable from '../Components/User/MyOrderListTable'

const useStyles = makeStyles({
  container: {
    '@media (min-width: 1024px)': {
      margin: '0 auto 0 auto',
    },
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1213px',
    minHeight: '100vh',
    backgroundColor: 'white',
    paddingTop: '50px',
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
      padding: '20px 50px 20px 50px',
      '@media (max-width: 823px)': {
        padding: '15px',
      },
    },
  },
})

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
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
          <div>{children}</div>
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

const Account: FC = () => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const isApprovedArtist = currentUser?.artist?.isApproved
  const pathName = window.location.pathname.split('/account/')[1]
  const [value, setValue] = useState<string>(pathName ? pathName : 'likes')

  if (!currentUser) {
    alert('로그인이 필요합니다.')
    window.location.href = '/'
    return null
  }

  const handleChangeTab = (e: ChangeEvent<{}>, newValue: string) => {
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
        onChange={handleChangeTab}
        aria-label="내 계정 탭"
      >
        <Tab label="관심 목록" value={'likes'} {...a11yProps('likes')} />
        <Tab label="주문 내역" value={'orders'} {...a11yProps('orders')} />
        {isApprovedArtist && <Tab label="작품 관리" value={'arts'} {...a11yProps('arts')} />}
        {isApprovedArtist && <Tab label="판매 관리" value={'sales'} {...a11yProps('sales')} />}
      </Tabs>
      <div className={classes.tabPanel}>
        <TabPanel value={value} index={'likes'}>
          {value === 'likes' && <LikeContents />}
        </TabPanel>
        <TabPanel value={value} index={'orders'}>
          {value === 'orders' && <MyOrderListTable />}
        </TabPanel>
        {isApprovedArtist && (
          <>
            <TabPanel value={value} index={'arts'}>
              {value === 'arts' && <MyArtListTable />}
            </TabPanel>
            <TabPanel value={value} index={'sales'}>
              {value === 'sales' && <MySaleListTable />}
            </TabPanel>
          </>
        )}
      </div>
    </main>
  )
}

export default Account
