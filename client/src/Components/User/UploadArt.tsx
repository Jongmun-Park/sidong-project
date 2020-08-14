import React, { FunctionComponent } from 'react'
import { Container, Typography, TextField, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const UploadArt: FunctionComponent = () => {
  const classes = useStyles({})

  return (
    <Container maxWidth="md">
      <Typography variant="h5" style={{ marginTop: '30px', marginBottom: '30px' }}>
        작품 등록
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">작품명</Typography>
          <TextField autoFocus margin="dense" type="text" name="artName" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">대표 이미지 선택</Typography>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            style={{ marginTop: '10px' }}
          ></input>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default UploadArt
