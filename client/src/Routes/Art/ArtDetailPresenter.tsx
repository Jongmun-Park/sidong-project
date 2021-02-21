import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { SaleStatus } from '../../types'
import { currencyFormatter, translateSaleStatus } from '../../utils'
import { ArtDetailPresenterProps } from '../../interfaces'
import InfoTable from '../../Components/Art/InfoTable'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1192px',
    padding: '100px 0 100px 0',
    margin: '0 auto 0 auto',
    backgroundColor: 'white',
  },
  leftArea: {
    '@media (min-width: 823px)': {
      flex: '0 0 60%',
      maxWidth: '60%',
    },
  },
  rightArea: {
    '@media (min-width: 823px)': {
      flex: '0 0 40%',
      maxWidth: '40%',
    },
  },
  rightBox: {
    color: '#333',
    margin: '0 30px 0 30px',
  },
  leftBox: {
    margin: '0 60px 0 60px',
  },
  artName: {
    fontWeight: 600,
    marginBottom: '20px',
  },
})

const ArtDetailPresenter: FC<ArtDetailPresenterProps> = ({ art }) => {
  console.log(art)
  const classes = useStyles()
  return (
    <main className={classes.container}>
      <div className={classes.leftArea}>
        <div className={classes.leftBox}>image box</div>
      </div>
      <div className={classes.rightArea}>
        <div className={classes.rightBox}>
          <Typography className={classes.artName} variant="h6">
            {art.name}
          </Typography>
          <InfoTable art={art} />
          {
            // eslint-disable-next-line
            art.saleStatus == SaleStatus.ON_SALE ? (
              <div>{currencyFormatter(art.price)}</div>
            ) : (
              <div>{translateSaleStatus(art.saleStatus)}</div>
            )
          }
        </div>
      </div>
    </main>
  )
}

export default ArtDetailPresenter
