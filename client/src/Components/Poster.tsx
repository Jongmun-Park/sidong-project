import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, ButtonBase } from '@material-ui/core'

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    backgroundColor: '#f5f6fa',
    borderRadius: '10px',
  },
  imageContainer: {
    marginBottom: '20px',
    // flex: '210px',
    // alignSelf: 'center',
  },
  image: {
    width: '268px',
    height: '270px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  posterText: {
    marginLeft: '5px',
    '& h6': {
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
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
      <div className={classes.posterText}>
        <Typography gutterBottom variant="subtitle1">
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {category}, {date}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {medium}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {saleMessage ? saleMessage : 'saleStatus'}
        </Typography>
      </div>
    </Paper>
  )
}

export default Poster
