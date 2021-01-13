import React, { FunctionComponent, ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
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
  centerArea: {
    height: '100vh',
    maxWidth: '1100px',
    margin: '0px auto 0px auto',
    backgroundColor: 'white',
  },
  section: {
    // TODO: 모바일 스타일 적용 
    margin: '50px 80px 50px 80px'
  }
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

const RegisterArtist: FunctionComponent = () => {
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

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);
  
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input type="text" placeholder="First name" name="First name" ref={register({required: true, maxLength: 80})} />
    //   <input type="text" placeholder="Last name" name="Last name" ref={register({required: true, maxLength: 100})} />
    //   <input type="text" placeholder="Email" name="Email" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
    //   <input type="tel" placeholder="Mobile number" name="Mobile number" ref={register({required: true, minLength: 6, maxLength: 12})} />
    //   <select name="Title" ref={register({ required: true })}>
    //     <option value="Mr">Mr</option>
    //     <option value="Mrs">Mrs</option>
    //     <option value="Miss">Miss</option>
    //     <option value="Dr">Dr</option>
    //   </select>

    //   <input name="Developer" type="radio" value="Yes" ref={register({ required: true })}/>
    //   <input name="Developer" type="radio" value="No" ref={register({ required: true })}/>

    //   <input type="submit" />
    // </form>
    <div className={classes.centerArea}>
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
      <Typography variant="subtitle1">썸네일 이미지 선택</Typography>
      <input
        type="file"
        name="thumbnail"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginTop: '10px' }}
      ></input>
      <Button
        color="primary"
        variant="contained"
        onClick={handleUpload}
        style={{ marginTop: '25px', float: 'right' }}
      >
        등록하기
      </Button>
  </div>
  )
}

export default RegisterArtist
