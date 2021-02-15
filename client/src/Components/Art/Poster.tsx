import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, ButtonBase } from '@material-ui/core'
import { currencyFormatter } from '../../utils'

const useStyles = makeStyles((theme) => ({
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
    marginTop: '11px',
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
}))

interface ArtPosterProps {
  name: string
  width: number
  height: number
  artistName: string
  saleStatus: string
  price: number | null
  representativeImageUrl: string
}

const Poster: React.FC<ArtPosterProps> = ({
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
      <ButtonBase className={classes.buttonBase}>
        <img
          className={classes.image}
          // TEST CODE
          src="https://i.pinimg.com/564x/09/fa/e9/09fae987d6aad479084a1585df692527.jpg"
          // src={representativeImageUrl}
          alt="artImage"
        />
      </ButtonBase>
      <div className={classes.textArea}>
        <Typography className={classes.artName} variant="subtitle1">
          {name}
        </Typography>
        <Typography className={classes.pTag} variant="body2">
          {artistName}
        </Typography>
        <Typography className={classes.pTag} variant="body2">
          {width}x{height}cm
        </Typography>
        {price ? (
          <Typography className={classes.pTag} variant="body2">
            {currencyFormatter(price)}원
          </Typography>
        ) : (
          <Typography className={classes.pTag} variant="body2">
            {saleStatus}
          </Typography>
        )}
      </div>
    </Paper>
  )
}

export const MemoizedPoster = memo(Poster)
