import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Chip, Paper, Typography, ButtonBase } from '@material-ui/core'
import { ArtistCategory } from '../../types'
import { translateArtistCategory } from '../../utils'

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
  head: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '11px',
    '@media (max-width: 823px)': {
      marginBottom: '4px',
    },
  },
  headText: {
    display: 'flex',
    flexDirection: 'column',
  },
  realName: {
    color: '#333',
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
  largeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    alignSelf: 'center',
    '@media (max-width: 823px)': {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  },
  chipLable: {
    width: '43px',
    fontSize: '9px',
    fontWeight: 600,
  },
}))

interface ArtistPosterProps {
  artistName: string
  realName: string
  thumbnailUrl: string
  representativeWorkUrl: string
  category: ArtistCategory
}

const Poster: React.FC<ArtistPosterProps> = ({
  artistName,
  realName,
  thumbnailUrl,
  representativeWorkUrl,
  category,
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper} elevation={2}>
      <div className={classes.head}>
        <Avatar
          alt="artist-thumbnail"
          className={classes.largeAvatar}
          // TEST CODE
          src="https://img.favpng.com/22/0/21/computer-icons-user-profile-clip-art-png-favpng-MhMHJ0Fw21MJadYjpvDQbzu5S.jpg"
          // src={thumbnailUrl}
        />
        <div className={classes.headText}>
          <Typography className={classes.realName} variant="subtitle1">
            {realName}
          </Typography>
          <Typography className={classes.artistName} variant="body2">
            {artistName}
          </Typography>
          <Chip
            className={classes.chipLable}
            size="small"
            label={translateArtistCategory(category)}
          />
        </div>
      </div>
      <ButtonBase className={classes.buttonBase}>
        <img
          alt="artImage"
          className={classes.image}
          // TEST CODE
          src="https://s3.us-east-1.amazonaws.com/pem-org/images/exhibition/landing/_width647Height728/exsouthasiangallLK_REP_002.jpg"
          // src={representativeWorkUrl}
        />
      </ButtonBase>
    </Paper>
  )
}

export const MemoizedPoster = memo(Poster)
