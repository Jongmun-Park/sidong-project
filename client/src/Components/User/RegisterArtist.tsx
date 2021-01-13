import React, { FunctionComponent, ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Typography, TextField, Button } from '@material-ui/core'
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

  const { 
    register,
    handleSubmit,
    control,
    errors,
    getValues,
    setError,
    clearErrors,
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(data);
    console.log('??????')
  }
  const { artistName } = getValues(['artistName'])
  console.log('artistName:', artistName)
  console.log('error:', errors);

  return (
    <div className={classes.centerArea}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="artistName"
        label="필명(닉네임)"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        inputRef={register({
          required: "필명(닉네임)을 입력해주세요.", 
          maxLength : {
            value: 32,
            message: '필명(닉네임)은 32자 이내로 입력해주세요.'
          }
          })}
      />
      {/* <input type="text" placeholder="필명(닉네임)" name="artistName" ref={register({required: true, maxLength: 64})} /> */}
      <input type="text" placeholder="성명" name="realName" ref={register({required: true, maxLength: 32})} />
      <input type="tel" placeholder="휴대전화 번호" name="phone" ref={register({required: true, minLength: 6, maxLength: 12})} />
      {/* <select name="Title" ref={register({ required: true })}>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>

      <input name="Developer" type="radio" value="Yes" ref={register({ required: true })}/>
      <input name="Developer" type="radio" value="No" ref={register({ required: true })}/> */}

      <input type="submit" />
      </form>
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
