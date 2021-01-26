import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Chip, Paper, Typography, ButtonBase } from '@material-ui/core'

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
  image: {
    width: '100%',
    height: '230px',
    objectFit: 'cover',
    borderRadius: '10px',
    '@media (max-width: 823px)': {
      height: '182px',
    },
  },
  head: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  headText: {
    display: 'flex',
    flexDirection: 'column',
  },
  nameSection: {
    display: 'flex',
    alignItems: 'center',
  },
  realName: {
    // width: '58px',
    fontSize: '15px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  artistName: {
    // width: '89px',
    fontSize: '13px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  chipLable: {
    width: '52px',
    fontWeight: 600,
  },
}))

interface ArtistPosterProps {
  artistName: string
  realName: string
  thumbnailUrl: string
  representativeWorkUrl: string
}

const Poster: React.FC<ArtistPosterProps> = ({
  artistName,
  realName,
  thumbnailUrl,
  representativeWorkUrl,
}) => {
  const classes = useStyles({})

  return (
    <Paper className={classes.paper} elevation={2}>
      <div className={classes.head}>
        <Avatar alt="artist-thumbnail" src={thumbnailUrl} className={classes.largeAvatar} />
        <div className={classes.headText}>
          <div className={classes.nameSection}>
            <Typography className={classes.realName} variant="subtitle1">
              {realName}&ensp;
            </Typography>
            <Typography className={classes.artistName} variant="body2">
              {artistName}
            </Typography>
          </div>
          <Chip className={classes.chipLable} size="small" label="조각가" color="primary" />
        </div>
        {/* <Typography variant="body2" gutterBottom>
          {medium}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {saleMessage ? saleMessage : 'saleStatus'}
        </Typography> */}
      </div>
      <ButtonBase>
        <img className={classes.image} src={representativeWorkUrl} alt="artImage" />
      </ButtonBase>
    </Paper>
  )
}

export default Poster
