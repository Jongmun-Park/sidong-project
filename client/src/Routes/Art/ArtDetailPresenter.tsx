import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { SaleStatus } from '../../types'
import { currencyFormatter, translateSaleStatus } from '../../utils'
import { ArtDetailPresenterProps } from '../../interfaces'
import ArtInfoTable from '../../Components/Art/InfoTable'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1192px',
    minHeight: '100vh',
    padding: '100px 0 100px 0',
    margin: '0 auto 0 auto',
    backgroundColor: 'white',
  },
  leftArea: {
    '@media (min-width: 823px)': {
      flex: '0 0 66%',
      maxWidth: '66%',
    },
  },
  rightArea: {
    '@media (min-width: 823px)': {
      flex: '0 0 33%',
      maxWidth: '33%',
    },
  },
  rightBox: {
    color: '#333',
    margin: '0 30px 0 30px',
  },
  leftBox: {
    margin: '0 115px 0 115px',
  },
  artName: {
    fontWeight: 600,
    marginBottom: '20px',
  },
})

const ArtDetailPresenter: FC<ArtDetailPresenterProps> = ({ art }) => {
  console.log('art:', art)
  const classes = useStyles()
  return (
    <main className={classes.container}>
      <div className={classes.leftArea}>
        <div className={classes.leftBox}>
          <Carousel>
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
    </main>
  )
}

export default ArtDetailPresenter
