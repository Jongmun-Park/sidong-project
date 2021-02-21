import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, ButtonBase } from '@material-ui/core'
import { currencyFormatter, translateSaleStatus } from '../../utils'
import { SaleStatus } from '../../types'

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    backgroundColor: '#f5f6fa',
    borderRadius: '10px',
    '@media (max-width: 823px)': {
      padding: '11px',
    },
  },
  buttonBase: {
    height: '230px',
    '@media (max-width: 823px)': {
      height: '182px',
    },
  },
  image: {
    width: '100%',
    maxHeight: '230px',
    objectFit: 'cover',
    borderRadius: '10px',
    '@media (max-width: 823px)': {
      maxHeight: '182px',
    },
  },
  textArea: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '14px',
    paddingLeft: '8px',
    color: '#333',
    '@media (max-width: 823px)': {
      marginTop: '10px',
    },
  },
  artName: {
    fontSize: '15px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '5px',
    '@media (max-width: 823px)': {
      fontSize: '12px',
      marginBottom: '3px',
    },
  },
  pTag: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '5px',
    '@media (max-width: 823px)': {
      fontSize: '10px',
      marginBottom: '3px',
    },
  },
  aTag: {
    color: '#333',
    textDecoration: 'none',
  },
})

interface ArtPosterProps {
  id: number
  name: string
  width: number
  height: number
  artistName: string
  saleStatus: SaleStatus
  price: number
  representativeImageUrl: string
}

const Poster: React.FC<ArtPosterProps> = ({
  id,
  name,
  width,
  height,
  artistName,
  saleStatus,
  price,
  representativeImageUrl,
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper} elevation={2}>
      <ButtonBase className={classes.buttonBase} href={'/art/' + id}>
        <img
          alt="작품 이미지"
          className={classes.image}
          // TEST CODE
          src="https://i.pinimg.com/564x/09/fa/e9/09fae987d6aad479084a1585df692527.jpg"
          // src={representativeImageUrl}
        />
      </ButtonBase>
      <div className={classes.textArea}>
        <Typography className={classes.artName} variant="subtitle1">
          <a href={'/art/' + id} className={classes.aTag}>
            {name}
          </a>
        </Typography>
        <Typography className={classes.pTag} variant="body2">
          {artistName}
        </Typography>
        <Typography className={classes.pTag} variant="body2">
          {width}x{height}cm
        </Typography>
        {saleStatus === SaleStatus.ON_SALE ? (
          <Typography className={classes.pTag} variant="body2">
            {currencyFormatter(price)}
          </Typography>
        ) : (
          <Typography className={classes.pTag} variant="body2">
            {translateSaleStatus(saleStatus)}
          </Typography>
        )}
      </div>
    </Paper>
  )
}

export const MemoizedPoster = memo(Poster)
