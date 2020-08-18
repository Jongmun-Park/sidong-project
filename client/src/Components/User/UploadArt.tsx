import React, { FunctionComponent, ChangeEvent, useState } from 'react'
import { Container, Typography, TextField, Grid, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

interface UploadArtInputProps {
  name: string
  thumbnail: FileList | null
}

const UPLOAD_ART_MUTATION = gql`
  mutation CreateArt($name: String!, $thumbnail: Upload!) {
    createArt(name: $name, thumbnail: $thumbnail) {
      success
    }
  }
`

const UploadArt: FunctionComponent = () => {
  const classes = useStyles({})
  const [createArt] = useMutation(UPLOAD_ART_MUTATION)
  const [inputs, setInputs] = useState<UploadArtInputProps>({
    name: '',
    thumbnail: null,
  })

  const handleUpload = async () => {
    console.log('inputs.thumbnail :', inputs.thumbnail)
    const { data } = await createArt({
      variables: {
        name: inputs.name,
        thumbnail: inputs.thumbnail,
      },
    })

    console.log(data)
  }

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
            name="name"
            value={inputs.name}
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
      <Button
        color="primary"
        variant="contained"
        onClick={handleUpload}
        style={{ marginTop: '25px', float: 'right' }}
      >
        등록하기
      </Button>
    </Container>
  )
}

export default UploadArt
