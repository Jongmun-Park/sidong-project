import React, { FC, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Tabs, Tab, Typography } from '@material-ui/core'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Art, SaleStatus } from '../../types'
import { ART } from '../../querys'
import { currencyFormatter, translateSaleStatus } from '../../utils'
import ArtInfoTable from './InfoTable'
import Like from './Like'
import Login from '../User/Login'
import { useCurrentUser } from '../../Hooks/User'

const useStyles = makeStyles((theme) => ({
  container: {
    '@media (min-width: 1024px)': {
      margin: '0 auto 0 auto',
    },
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1213px',
    minHeight: '100vh',
    backgroundColor: 'white',
  },
  leftArea: {
    '@media (min-width: 1024px)': {
      flex: '0 0 60%',
      maxWidth: '60%',
    },
    width: '100%',
  },
  rightArea: {
    '@media (min-width: 1024px)': {
      flex: '0 0 40%',
      maxWidth: '40%',
    },
    width: '100%',
  },
  rightBox: {
    width: '85%',
    margin: 'auto',
    color: theme.palette.lightBlack.main,
  },
  rightBoxHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 0 25px 0',
    '@media (max-width: 834px)': {
      margin: '5px 0 13px 0',
    },
  },
  leftBox: {
    // maxWidth: '530px',
    width: '85%',
    margin: 'auto',
  },
  artName: {
    fontWeight: 600,
    marginRight: '12px',
    '@media (max-width: 834px)': {
      fontSize: '17px',
    },
  },
  tabs: {
    width: '100%',
    margin: '0px 30px 0px 30px',
    '@media (max-width: 1024px)': {
      margin: '22px 17px 0px 17px',
    },
  },
  tabPanel: {
    width: '100%',
    marginTop: '6px',
  },
  tab: {
    '@media (max-width: 834px)': {
      fontSize: '12px',
    },
  },
  like: {
    float: 'right',
    cursor: 'pointer',
    alignSelf: 'center',
    '& .MuiSvgIcon-root': {
      fontSize: '19px',
      '@media (max-width: 834px)': {
        fontSize: '1.1rem',
      },
    },
  },
  description: {
    whiteSpace: 'pre-line',
  },
  price: {
    fontSize: '15px',
    fontWeight: 500,
    textAlign: 'right',
    marginBottom: '18px',
  },
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}
interface ArtDetailParams {
  artId: number
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

const ArtDetail: FC<ArtDetailParams> = ({ artId }) => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const [value, setValue] = useState<number>(0)
  const [openLogin, setOpenLogin] = useState(false)

  const { data } = useQuery(ART, {
    variables: {
      artId,
    },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }

  const { art }: { art: Art } = data

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <main className={classes.container}>
      <div className={classes.leftArea}>
        <div className={classes.leftBox}>
          <Carousel
            onClickItem={(index) => {
              window.open(art.imageUrls[index].url)
            }}
          >
            {art.imageUrls.map((image) => (
              <div key={image.id}>
                <img alt="작품 이미지" src={image.url} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className={classes.rightArea}>
        <div className={classes.rightBox}>
          <div className={classes.rightBoxHeader}>
            <Typography className={classes.artName} variant="h6">
              {art.name}
            </Typography>
            <span className={classes.like}>
              <Like artId={artId} />
            </span>
          </div>
          <ArtInfoTable art={art} />
          {art.saleStatus === SaleStatus.ON_SALE ? (
            <div>
              <div className={classes.price}>{currencyFormatter(art.price)}</div>
              <Button
                onClick={() => {
                  if (!currentUser) {
                    setOpenLogin(true)
                    return
                  } else {
                    window.open(`/order/${art.id}`)
                  }
                }}
                variant="contained"
                color="primary"
                fullWidth
              >
                구매하기
              </Button>
            </div>
          ) : (
            <div>{translateSaleStatus(art.saleStatus)}</div>
          )}
        </div>
      </div>
      <div className={classes.tabs}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleChange}
          aria-label="작품 페이지 탭"
        >
          <Tab className={classes.tab} label="작가의 작품 설명" {...a11yProps(0)} />
          <Tab className={classes.tab} label="구매 및 배송" {...a11yProps(1)} />
          <Tab className={classes.tab} label="교환 및 환불" {...a11yProps(2)} />
        </Tabs>
      </div>
      <div className={classes.tabPanel}>
        <TabPanel value={value} index={0}>
          <div className={classes.description}>{art.description}</div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
      {openLogin && <Login openDialog={openLogin} handleOpenDialog={setOpenLogin} />}
    </main>
  )
}

export default ArtDetail
