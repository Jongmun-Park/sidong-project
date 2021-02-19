import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableRow, TableCell, TableBody, Typography } from '@material-ui/core'
import { SaleStatus, Medium } from '../../types'
import { currencyFormatter, translateSaleStatus, translateMedium } from '../../utils'

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
    margin: '0 30px 0 30px',
  },
  artName: {
    color: '#333',
    fontWeight: 600,
    marginBottom: '20px',
  },
  table: {
    marginBottom: '20px',
  },
  th: {
    width: '40%',
    padding: '6px',
    color: '#818181',
    fontSize: '0.929em',
    borderBottom: 'none',
  },
  td: {
    width: '60%',
    padding: '6px',
    color: '#333',
    fontSize: '1em',
    fontWeight: 600,
    borderBottom: 'none',
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
    medium: Medium
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
    price: number
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
      <div className={classes.leftArea}>~~~~~~~~~~~~leftArea~~~~~~~~~~~~~~</div>
      <div className={classes.rightArea}>
        <div className={classes.rightBox}>
          <Typography className={classes.artName} variant="h5">
            {art.name}
          </Typography>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell className={classes.th} component="th" scope="row">
                  작가 | Artist
                </TableCell>
                <TableCell className={classes.td}>{art.artist.realName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.th} component="th" scope="row">
                  매체 | Medium
                </TableCell>
                <TableCell className={classes.td}>{translateMedium(art.medium)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.th} component="th" scope="row">
                  주제 | Theme
                </TableCell>
                <TableCell className={classes.td}>{art.theme.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.th} component="th" scope="row">
                  스타일 | Style
                </TableCell>
                <TableCell className={classes.td}>{art.style.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.th} component="th" scope="row">
                  기법 | Technique
                </TableCell>
                <TableCell className={classes.td}>{art.technique.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.th} component="th" scope="row">
                  크기 | Size
                </TableCell>
                <TableCell className={classes.td}>
                  {art.width}x{art.height}cm (가로x세로)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.th} component="th" scope="row">
                  액자 | Frame
                </TableCell>
                <TableCell className={classes.td}>{art.isFramed ? '포함' : '미포함'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div></div>
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
