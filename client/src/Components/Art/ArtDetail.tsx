import React, { FC, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Tabs, Tab, Typography } from '@material-ui/core'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Art, SaleStatus } from '../../types'
import { ART } from '../../querys'
import { translateSaleStatus } from '../../utils'
import ArtInfoTable from './InfoTable'
import Like from './Like'
import Login from '../User/Login'
import PriceInfoTable from './PriceInfoTable'
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
    width: '80%',
    margin: 'auto',
  },
  artName: {
    fontWeight: 600,
    marginRight: '12px',
    '@media (max-width: 834px)': {
      fontSize: '17px',
    },
  },
  table: {
    marginBottom: '25px',
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
  saleStatus: {
    textAlign: 'right',
    fontWeight: 600,
    color: theme.palette.secondary.main,
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
            dynamicHeight={true}
            thumbWidth={45}
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
              <div className={classes.table}>
                <PriceInfoTable artPrice={art.price} deliveryFee={art.deliveryFee} />
              </div>
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
            <div className={classes.saleStatus}>{translateSaleStatus(art.saleStatus)}</div>
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
          기본적으로 작품 특성상 추가 재고가 없기 때문에 교환이 불가합니다.
          <br />
          <br />
          작품을 수령한 후 7영업일 이내에 반품할 수 있습니다.
          <br />
          <br />
          아래 사항에 해당하는 경우는 배송비는 작가가 부담합니다.
          <br />
          - 실제 작품의 내용이 작품 상세 정보에 표기된 내용과 상이한 경우
          <br />
          - 배송 중 파손되었을 경우
          <br />
          - 위작 또는 명시되지 않은 모작의 경우
          <br />
          <br />
          <span style={{ fontWeight: 600 }}>
            * 단순 변심에 의한 반품(환불)은 왕복 배송비를 제한 금액만 환불됩니다.
          </span>
        </TabPanel>
      </div>
      {openLogin && <Login openDialog={openLogin} handleOpenDialog={setOpenLogin} />}
    </main>
  )
}

export default ArtDetail
