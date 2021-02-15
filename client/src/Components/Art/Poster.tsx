import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, ButtonBase } from '@material-ui/core'

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
  headText: {
    display: 'flex',
    flexDirection: 'column',
  },
  realName: {
    fontSize: '14px',
    fontWeight: 'bold',
    '@media (max-width: 823px)': {
      fontSize: '12px',
    },
  },
  artistName: {
    maxWidth: '103px',
    fontSize: '12px',
    marginBottom: '5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width: 823px)': {
      fontSize: '10px',
      maxWidth: '70px',
    },
  },
}))

interface ArtPosterProps {
  name: string
  width: string
  height: string
  artistName: string
  saleStatus: string
  price: string | null
}

const Poster: React.FC<ArtPosterProps> = ({
  name,
  width,
  height,
  artistName,
  saleStatus,
  price,
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper} elevation={2}>
      <div className={classes.headText}>
        <Typography className={classes.realName} variant="subtitle1">
          {name}
        </Typography>
        <Typography className={classes.artistName} variant="body2">
          {width}x{height}cm
        </Typography>
        <Typography className={classes.artistName} variant="body2">
          {artistName}
        </Typography>
        {price ? (
          <Typography className={classes.artistName} variant="body2">
            {price}원
          </Typography>
        ) : (
          <Typography className={classes.artistName} variant="body2">
            {saleStatus}
          </Typography>
        )}
      </div>
      <ButtonBase className={classes.buttonBase}>
        <img
          className={classes.image}
          // TEST CODE
          src="https://s3.us-east-1.amazonaws.com/pem-org/images/exhibition/landing/_width647Height728/exsouthasiangallLK_REP_002.jpg"
          // src={representativeWorkUrl}
          alt="artImage"
        />
      </ButtonBase>
    </Paper>
  )
}

export const MemoizedPoster = memo(Poster)
