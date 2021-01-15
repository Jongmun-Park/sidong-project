import React, { FunctionComponent, ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Avatar,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const useStyles = makeStyles((theme) => ({
  centerArea: {
    minHeight: '100vh',
    maxWidth: '1100px',
    // TODO: 모바일 스타일 적용
    padding: '30px 60px 100px 60px',
    margin: '0px auto 0px auto',
    backgroundColor: 'white',
  },
  section: {
    // TODO: 모바일 스타일 적용
    margin: '50px 80px 50px 80px',
  },
  inputContainer: {
    maxWidth: '400px',
    margin: '30px',
  },
  input: {
    width: '100%',
    marginBottom: '1.5em',
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  submitButton: {
    float: 'right',
    marginTop: '30px',
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

const RegisterArtist: FunctionComponent = () => {
  const classes = useStyles({})
  const [imgBase64, setImgBase64] = useState('')
  const [createPost] = useMutation(UPLOAD_POST_MUTATION)

  const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader()
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files?.[0])
      reader.onload = () => {
        const base64 = reader.result
        if (base64) {
          setImgBase64(base64.toString())
        }
      }
    }
  }

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data: any) => {
    console.log('data:')
    console.log(data)
  }
  console.log('error:', errors)

  return (
    <div className={classes.centerArea}>
      <div className={classes.inputContainer}>
        <h3 style={{ marginBottom: '2em' }}>&ensp;작가 등록</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={classes.input}
            autoFocus
            name="artistName"
            label="필명(닉네임)"
            placeholder="필명(닉네임)"
            variant="outlined"
            required={true}
            inputRef={register({
              maxLength: {
                value: 32,
                message: '필명(닉네임)은 32자 이내로 입력해주세요.',
              },
            })}
          />
          <TextField
            className={classes.input}
            name="realName"
            label="성명"
            placeholder="성명"
            variant="outlined"
            required={true}
            inputRef={register({
              maxLength: {
                value: 32,
                message: '성명은 32자 이내로 입력해주세요.',
              },
            })}
          />
          <TextField
            className={classes.input}
            name="phone"
            type="tel"
            label="휴대전화 번호"
            placeholder="휴대전화 번호"
            variant="outlined"
            required={true}
            inputRef={register({
              minLength: {
                value: 10,
                message: '휴대전화 번호는 10자 이상으로 입력해주세요.',
              },
            })}
          />
          <TextField
            className={classes.input}
            multiline
            label="작가 소개"
            name="description"
            variant="outlined"
            rows={5}
            defaultValue=""
            placeholder="작가를 소개하는 글입니다. 작가로서 가치관, 작품 세계 등 본인의 생각을 자유롭게 표현해주세요."
            inputRef={register}
          />
          <FormControl component="fieldset" className={classes.input}>
            <FormLabel component="legend" style={{ marginBottom: '10px' }}>
              활동 분야
            </FormLabel>
            <RadioGroup name="category">
              <FormControlLabel value="0" control={<Radio inputRef={register} />} label="화가" />
              <FormControlLabel value="1" control={<Radio inputRef={register} />} label="조각가" />
              <FormControlLabel value="2" control={<Radio inputRef={register} />} label="공예가" />
              <FormControlLabel value="3" control={<Radio inputRef={register} />} label="기타" />
            </RadioGroup>
          </FormControl>
          <div className={classes.input}>
            <FormLabel component="div">프로필 이미지</FormLabel>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleChangeThumbnail}
              ref={register}
            />
            <Avatar
              style={{ display: 'inline-flex' }}
              src={imgBase64}
              className={classes.largeAvatar}
            />
          </div>
          <Button
            className={classes.submitButton}
            type="submit"
            color="primary"
            variant="contained"
          >
            등록하기
          </Button>
        </form>
      </div>
    </div>
  )
}

export default RegisterArtist
