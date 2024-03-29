import React, { FC, useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Tabs, Tab, Typography } from '@material-ui/core'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Art, SaleStatus, Medium } from '../../types'
import { ART } from '../../querys'
import { translateSaleStatus } from '../../utils'
import ArtInfoTable from './InfoTable'
import LikeArt from './LikeArt'
import PriceInfoTable from './PriceInfoTable'
import { useCurrentUser } from '../../Hooks/User'
import mediumBackground from '../../Images/medium-size-background.jpeg'
import smallBackground from '../../Images/small-size-background.jpeg'
import largeBackground from '../../Images/large-size-background.jpg'
import ShareButton from '../ShareButton'
import TabPanel from '../TabPanel'
import { debounce } from 'lodash'

const useStyles = makeStyles((theme) => ({
  container: {
    '@media (min-width: 1024px)': {
      margin: '0 auto 0 auto',
    },
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'baseline',
    maxWidth: '1213px',
    minHeight: '100vh',
    backgroundColor: 'white',
  },
  leftArea: {
    '@media (min-width: 1024px)': {
      flex: '0 0 60%',
      maxWidth: '60%',
      maxHeight: '580px',
    },
    width: '100%',
  },
  rightArea: {
    '@media (min-width: 1024px)': {
      flex: '0 0 40%',
      maxWidth: '40%',
      maxHeight: '580px',
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
    alignItems: 'center',
    margin: '5px 0 25px 0',
    '@media (max-width: 834px)': {
      margin: '5px 0 13px 0',
    },
  },
  leftBox: {
    width: '80%',
    margin: 'auto',
    '& .carousel.carousel-slider': {
      maxHeight: '450px',
      '@media (max-width: 834px)': {
        maxHeight: '310px',
      },
    },
    '& .carousel img': {
      maxHeight: '450px',
      objectFit: 'contain',
      '@media (max-width: 834px)': {
        maxHeight: '310px',
      },
    },
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
    margin: '10px 30px 0px 30px',
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
  iconButtons: {
    display: 'flex',
    cursor: 'pointer',
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
  displayImage: {
    width: '100%',
    maxWidth: '650px',
  },
  displayImageWrapper: {
    width: '100%',
    maxWidth: '650px',
    margin: '70px auto',
    position: 'relative',
    '@media (max-width: 834px)': {
      margin: '50px auto',
    },
  },
  representativeImgWrapper: {
    position: 'absolute',
    width: '100%',
    top: '7%',
    textAlign: 'center',
  },
  representativeImg: {
    boxShadow: '0 6px 10px -1px #333',
  },
}))

interface ArtDetailParams {
  artId: number
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function getBackgroundImageRealSize(size: String) {
  if (size === 'SMALL') {
    return 184
  } else if (size === 'MEDIUM') {
    return 200
  } else {
    return 300 // size === 'LARGE'
  }
}

function getBackgroundImage(size: String) {
  if (size === 'SMALL') {
    return smallBackground
  } else if (size === 'MEDIUM') {
    return mediumBackground
  } else {
    return largeBackground
  }
}

const ArtDetail: FC<ArtDetailParams> = ({ artId }) => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const shareUrl = `${window.location.origin}/art/${artId}`
  const displayImageDiv = useRef<HTMLDivElement>(null)
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [artSize, setArtSize] = useState({
    width: 0,
    height: 0,
    size: 'SMALL',
  })
  const [representativeImgSize, setRepresentativeImgSize] = useState({
    width: 0,
    height: 0,
  })

  const { data } = useQuery(ART, {
    variables: {
      artId,
    },
    onCompleted: (data) => {
      const { art } = data
      if (displayImageDiv.current) {
        const pixelRatio =
          displayImageDiv.current.clientWidth / getBackgroundImageRealSize(art.size)

        setArtSize({
          width: art.width,
          height: art.height,
          size: art.size,
        })
        setRepresentativeImgSize({
          width: art.width * pixelRatio,
          height: art.height * pixelRatio,
        })
      }
    },
    onError: (error) => console.error(error.message),
  })

  useEffect(() => {
    const handleResize = debounce(() => {
      if (displayImageDiv.current) {
        const pixelRatio =
          displayImageDiv.current.clientWidth / getBackgroundImageRealSize(artSize.size)

        setRepresentativeImgSize({
          width: artSize.width * pixelRatio,
          height: artSize.height * pixelRatio,
        })
      }
    }, 1000)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [artSize])

  if (!data) {
    return null
  }

  const { art }: { art: Art } = data

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue)
  }

  return (
    <main className={classes.container}>
      <Helmet>
        <title>{art.name}</title>
        <meta
          name="description"
          content={`${art.name} - ${art.artist.realName}(${art.artist.artistName}) 작품 상세 정보`}
        />
        <meta property="og:title" content={art.name} />
        <meta property="og:url" content={shareUrl} />
        <meta
          property="og:description"
          content={`${art.name} - ${art.artist.realName}(${art.artist.artistName}) 작품 상세 정보`}
        />
        <meta property="og:image" content={art.representativeImageUrl} />
      </Helmet>
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
            <div className={classes.iconButtons}>
              <div style={{ paddingTop: '2px' }}>
                <LikeArt artId={artId} />
              </div>
              <div style={{ marginLeft: '15px' }}>
                <ShareButton shareUrl={shareUrl} />
              </div>
            </div>
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
                    alert('로그인 부탁드립니다.')
                    // setOpenLogin(true)
                    // return
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
          value={tabIndex}
          onChange={handleChange}
          aria-label="작품 페이지 탭"
        >
          <Tab className={classes.tab} label="작품 설명" {...a11yProps(0)} />
          <Tab className={classes.tab} label="구매 및 배송" {...a11yProps(1)} />
          <Tab className={classes.tab} label="교환 및 환불" {...a11yProps(2)} />
        </Tabs>
      </div>
      <div className={classes.tabPanel}>
        <TabPanel value={tabIndex} index={0}>
          <div className={classes.description}>{art.description}</div>
          {art.medium !== Medium.SCULPTURE && (
            <div className={classes.displayImageWrapper} ref={displayImageDiv}>
              <img
                className={classes.displayImage}
                src={getBackgroundImage(art.size)}
                alt="전시 배경 이미지"
              />
              <div className={classes.representativeImgWrapper}>
                <img
                  className={classes.representativeImg}
                  src={art.representativeImageUrl}
                  alt="작품 대표 이미지"
                  width={representativeImgSize.width}
                  height={representativeImgSize.height}
                />
              </div>
            </div>
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <div style={{ lineHeight: '27px' }}>
            <div style={{ fontWeight: 600 }}>
              * 아래 절차가 진행될 때마다 구매자에게 안내 문자를 보내드립니다.
            </div>
            <div style={{ height: '15px' }}></div>
            <div>
              <span style={{ fontWeight: 600 }}>1. 작가에게 판매 알림</span>
              <br />
              작품 구매와 동시에 Jakupteo에서 작가에게 '작품이 판매됨'를 알립니다.
            </div>
            <div style={{ height: '10px' }}></div>
            <div>
              <span style={{ fontWeight: 600 }}>2. 배송 준비</span>
              <br />
              작가가 '작품 보증서'를 포함한 작품 배송을 준비합니다.
            </div>
            <div style={{ height: '10px' }}></div>
            <div>
              <span style={{ fontWeight: 600 }}>3. 배송 시작</span>
              <br />
              작품 배송이 시작됩니다.
            </div>
            <div style={{ height: '10px' }}></div>
            <div>
              <span style={{ fontWeight: 600 }}>4. 배송 완료</span>
              <br />
              작품이 '작품 보증서'와 함께 도착합니다.
            </div>
            <div style={{ height: '10px' }}></div>
            <div>
              <span style={{ fontWeight: 600 }}>5. 구매 결정</span>
              <br />
              구매자는 작품 수취 후 7일 이내에 '구매 확정' 또는 '환불' 여부를 결정합니다. (7일 이후
              자동으로 '구매 확정' 됩니다.)
            </div>
            <div style={{ height: '10px' }}></div>
            <div>
              <span style={{ fontWeight: 600 }}>6. 작품 금액 전달</span>
              <br />
              구매 확정시 정산일에 작품 금액이 작가에게 전달됩니다.
            </div>
          </div>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <div style={{ lineHeight: '27px' }}>
            [ 교환 안내 ]
            <div style={{ fontWeight: 600 }}>
              * 작품 특성상 추가 재고가 없기 때문에 '교환'은 불가능합니다.
            </div>
            <div style={{ height: '15px' }}></div>
            [ 환불 안내 ]
            <br />
            * 작품을 수령한 후 7일 이내에 환불 요청할 수 있습니다.
            <br />
            <span style={{ fontWeight: 600 }}>
              * 구매자의 단순 변심에 의한 환불시, 결제 금액에서 왕복 배송비를 차감한 금액이
              환불됩니다.
            </span>
            <br />
            * 아래 사항에 해당하는 경우에만 작가가 왕복 배송비를 부담합니다.
            <br />
            &emsp;1) 실제 작품의 내용이 작품 상세 정보에 표기된 내용과 상이한 경우
            <br />
            &emsp;2) 배송 중 파손되었을 경우
            <br />
            &emsp;3) 위작 또는 명시되지 않은 모작의 경우
          </div>
        </TabPanel>
      </div>
    </main>
  )
}

export default ArtDetail
