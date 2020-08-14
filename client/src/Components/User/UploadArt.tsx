import React, { FunctionComponent, ChangeEvent, useState } from 'react'
import { Container, Typography, TextField, Grid, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

interface UploadArtInputProps {
  artName: string
  thumbnail: FileList | null
}

const UploadArt: FunctionComponent = () => {
  const classes = useStyles({})
  const [inputs, setInputs] = useState<UploadArtInputProps>({
    artName: '',
    thumbnail: null,
  })

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.files,
    })
  }

  console.log('inputs:', inputs)
  return (
    <Container maxWidth="md">
      <Typography variant="h5" style={{ marginTop: '30px', marginBottom: '30px' }}>
        작품 등록
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">작품명</Typography>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            name="artName"
            value={inputs.artName}
            onChange={handleValueChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">대표 이미지 선택</Typography>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
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
      <Button color="primary" variant="contained" style={{ marginTop: '25px', float: 'right' }}>
        등록하기
      </Button>
    </Container>
  )
}

export default UploadArt
