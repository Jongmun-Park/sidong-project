import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography, ButtonBase } from '@material-ui/core'

const useStyles = makeStyles({
  paper: {
    padding: '16px',
    marginTop: '20px',
  },
  image: {
    maxWidth: 256,
    maxHeight: 256,
    minWidth: 64,
    minHeight: 64,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
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
    <Grid item xs={2}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={imageUrl} />
            </ButtonBase>
          </Grid>
          <Grid item xs container direction="column" spacing={5}>
            <Grid item xs>
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
                {saleMessage}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Poster
