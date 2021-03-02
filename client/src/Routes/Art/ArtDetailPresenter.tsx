import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Tabs, Tab, Typography } from '@material-ui/core'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Art, SaleStatus } from '../../types'
import { currencyFormatter, translateSaleStatus } from '../../utils'
import ArtInfoTable from '../../Components/Art/InfoTable'

const useStyles = makeStyles((theme) => ({
  container: {
    '@media (min-width: 1024px)': {
      padding: '70px 70px 100px 70px',
      margin: '0 auto 0 auto',
    },
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1192px',
    minHeight: '100vh',
    padding: '45px 40px 100px 40px',
    backgroundColor: 'white',
  },
  leftArea: {
    '@media (min-width: 1024px)': {
      flex: '0 0 66.6667%',
      maxWidth: '66.6667%',
    },
    width: '100%',
  },
  rightArea: {
    '@media (min-width: 1024px)': {
      flex: '0 0 33.3333%',
      maxWidth: '33.3333%',
    },
    width: '100%',
  },
  rightBox: {
    '@media (min-width: 1024px)': {
      marginLeft: '40px',
    },
    color: theme.palette.lightBlack.main,
  },
  leftBox: {
    maxWidth: '530px',
    margin: 'auto',
  },
  artName: {
    fontWeight: 600,
    margin: '5px 0 25px 0',
  },
  tabs: {
    width: '100%',
    marginTop: '17px',
  },
  tabPanel: {
    width: '100%',
    marginTop: '6px',
  },
}))

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

const ArtDetailPresenter: FC<Art> = ({ art }) => {
  const classes = useStyles()
  const [value, setValue] = useState<number>(0)

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
          <Typography className={classes.artName} variant="h6">
            {art.name}
          </Typography>
          <ArtInfoTable art={art} />
          {art.saleStatus === SaleStatus.ON_SALE ? (
            <div>{currencyFormatter(art.price)}</div>
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
          <Tab label="작가의 작품 설명" {...a11yProps(0)} />
          <Tab label="구매 및 배송" {...a11yProps(1)} />
          <Tab label="교환 및 환불" {...a11yProps(2)} />
        </Tabs>
      </div>
      <div className={classes.tabPanel}>
        <TabPanel value={value} index={0}>
          {art.description}
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    </main>
  )
}

export default ArtDetailPresenter
