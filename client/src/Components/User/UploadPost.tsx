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

interface UploadPostInputProps {
  title: string
  thumbnail: FileList | null
}

const UPLOAD_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $thumbnail: Upload!) {
    createPost(title: $title, thumbnail: $thumbnail) {
      success
    }
  }
`

const UploadPost: FunctionComponent = () => {
  const classes = useStyles({})
  const [createPost] = useMutation(UPLOAD_POST_MUTATION)
  const [inputs, setInputs] = useState<UploadPostInputProps>({
    title: '',
    thumbnail: null,
  })

  const handleUpload = async () => {
    console.log('inputs.thumbnail :', inputs.thumbnail)
    const { data } = await createPost({
      variables: {
        title: inputs.title,
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
      <Grid container spacing={3} style={{ marginTop: '23px' }}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">제 목</Typography>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleValueChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">썸네일 이미지 선택</Typography>
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

export default UploadPost
