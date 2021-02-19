import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SaleStatus } from '../../types'
import { currencyFormatter, translateSaleStatus } from '../../utils'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1192px',
    margin: '100px auto 100px auto',
  },
  leftBox: {
    '@media (min-width: 823px)': {
      flex: '0 0 66.6667%',
      maxWidth: '66.6667%',
    },
  },
  rightBox: {
    '@media (min-width: 823px)': {
      flex: '0 0 33.3333%',
      maxWidth: '33.3333%',
    },
  },
})

interface ArtDetailPresenterProps {
  art: {
    id: number
    createdAt: string
    artist: {
      id: number
      artistName: string
      realName: string
    }
    name: string
    description: string
    medium: string
    theme: {
      id: number
      name: string
    }
    style: {
      id: number
      name: string
    }
    technique: {
      id: number
      name: string
    }
    saleStatus: SaleStatus
    isFramed: boolean
    price: number | null
    width: number
    height: number
    images: Array<number>
  }
}

const ArtDetailPresenter: FC<ArtDetailPresenterProps> = ({ art }) => {
  console.log(art)
  const classes = useStyles()
  return (
    <main className={classes.container}>
      <div className={classes.leftBox}>~~~~~~~~~~~~leftBox~~~~~~~~~~~~~~</div>
      <div className={classes.rightBox}>
        <div>{art.name}</div>
        <div>
          {art.artist.realName}({art.artist.artistName})
        </div>
        <div>{art.medium}</div>
        <div>{art.theme.name}</div>
        <div>{art.style.name}</div>
        <div>{art.technique.name}</div>
        <div>
          {art.width}x{art.height}cm
        </div>
        <div>
          {art.price && currencyFormatter(art.price)} ({translateSaleStatus(art.saleStatus)})
        </div>
        <div>{art.isFramed}</div>
      </div>
    </main>
  )
}

export default ArtDetailPresenter
