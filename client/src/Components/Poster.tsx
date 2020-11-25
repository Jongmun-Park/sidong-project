import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, ButtonBase } from '@material-ui/core'

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    backgroundColor: '#f5f6fa',
    borderRadius: '17px',
  },
  imageContainer: {
    flex: '210px',
    alignSelf: 'center',
  },
  image: {
    height: '210px',
    objectFit: 'contain',
  },
  posterText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
})

interface PosterProps {
  key: number
  title: string
  category: string
  medium: string
  imageUrl: string
  saleMessage: string
  date: string
}

const Poster: React.FC<PosterProps> = ({
  title,
  medium,
  category,
  imageUrl,
  saleMessage,
  date,
}) => {
  const classes = useStyles({})
  return (
    <Paper className={classes.paper} elevation={2}>
      <ButtonBase className={classes.imageContainer}>
        <img className={classes.image} src={imageUrl} />
      </ButtonBase>
      <Typography className={classes.posterText} gutterBottom variant="subtitle1">
        {title}
      </Typography>
      <Typography className={classes.posterText} variant="body2" gutterBottom>
        {category}, {date}
      </Typography>
      <Typography className={classes.posterText} variant="body2" gutterBottom>
        {medium}
      </Typography>
      <Typography className={classes.posterText} variant="body2" color="textSecondary">
        {saleMessage}
      </Typography>
    </Paper>
  )
}

export default Poster
