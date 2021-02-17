import React, { FC } from 'react'
// import { SaleStatusKorean } from '../../types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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

// interface ArtDetailPresenterProps {
//   art: {
//     id: number
//     createdAt: string
//     artist: {
//       id: number
//       artistName: string
//       realName: string
//     }
//     name: string
//     description: string
//     medium: string
//     theme: {
//       id: number
//       name: string
//     }
//     style: {
//       id: number
//       name: string
//     }
//     technique: {
//       id: number
//       name: string
//     }
//     saleStatus: SaleStatusKorean
//     isFramed: boolean
//     price: number | null
//     orientation: string
//     size: string
//     width: number
//     height: number
//     images: [number]
//   }
// }

const ArtDetailPresenter: FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.leftBox}>leftBox</div>
      <div className={classes.rightBox}>rightBox</div>
    </div>
  )
}

export default ArtDetailPresenter
