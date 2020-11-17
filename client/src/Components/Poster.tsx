import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography, ButtonBase } from '@material-ui/core'

const useStyles = makeStyles({
  paper: {
    padding: '15px',
    backgroundColor: '#f5f6fa'
  },
  image: {
    // maxWidth: 256,
    // minWidth: 64,
    // maxHeight: 260,
    // minHeight: 64,
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
      <ButtonBase className={classes.image}>
        {/* <img src={imageUrl} /> */}
      </ButtonBase>
    </Paper>
    // <Grid item xs={2}>
    //   <Grid container spacing={2} direction="column">
    //     <Grid item>
    //     </Grid>
    //     <Grid item xs container direction="column" spacing={5}>
    //       <Grid item xs>
    //         <Typography gutterBottom variant="subtitle1">
    //           {title}
    //         </Typography>
    //         <Typography variant="body2" gutterBottom>
    //           {category}, {date}
    //         </Typography>
    //         <Typography variant="body2" gutterBottom>
    //           {medium}
    //         </Typography>
    //         <Typography variant="body2" color="textSecondary">
    //           {saleMessage}
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>
  )
}

export default Poster
