import React, { FC, ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Avatar,
  TextField,
  Button,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { handleImagePreview } from '../../utils'

const useStyles = makeStyles((theme) => ({
  centerArea: {
    minHeight: '100vh',
    maxWidth: '550px',
    padding: '30px 60px 100px 60px',
    margin: '0px auto 0px auto',
    backgroundColor: 'white',
    '@media (max-width: 823px)': {
      padding: '20px 45px 100px 45px',
    },
  },
  inputContainer: {
    maxWidth: '400px',
    margin: 'auto',
  },
  inputBox: {
    width: '100%',
    marginTop: '1em',
  },
  inputDiv: {
    width: '100%',
    marginTop: '1em',
    padding: '18.5px 14px',
    border: '1px solid',
    borderRadius: '4px',
    borderColor: 'rgba(0, 0, 0, 0.23)',
  },
  inputFile: {
    marginTop: '10px',
    marginBottom: '20px',
  },
  formLabel: {
    marginBottom: '10px',
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  submitButton: {
    float: 'right',
    marginTop: '30px',
  },
  paper: {
    maxWidth: 'inherit',
    maxHeight: 'inherit',
    margin: 'auto',
  },
  representativeWorkPreview: {
    display: 'block',
    margin: 'auto',
    width: '-webkit-fill-available',
    maxHeight: '370px',
    objectFit: 'contain',
    borderRadius: '4px',
  },
  errorMessage: {
    color: 'red',
  },
}))

const REGISTER_ARTIST_MUTATION = gql`
  mutation(
    $artistName: String!
    $realName: String!
    $phone: String!
    $description: String!
    $category: Int!
    $residence: Int!
    $thumbnail: Upload!
    $representativeWork: Upload!
  ) {
    createArtist(
      artistName: $artistName
      realName: $realName
      phone: $phone
      description: $description
      category: $category
      residence: $residence
      thumbnail: $thumbnail
      representativeWork: $representativeWork
    ) {
      success
      msg
    }
  }
`

const RegisterArtist: FC = () => {
  const classes = useStyles({})
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [representativeWorkPreview, setRepresentativeWorkPreview] = useState(
    'http://i.imgur.com/I86rTVl.jpg'
  )
  const [registerArtist] = useMutation(REGISTER_ARTIST_MUTATION)

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async (data: any) => {
    const registerResult = await registerArtist({
      variables: {
        artistName: data.artistName,
        realName: data.realName,
        phone: data.phone,
        description: data.description,
        category: data.category,
        residence: data.residence,
        thumbnail: data.thumbnail,
        representativeWork: data.representativeWork,
      },
    })
    if (registerResult.data.createArtist.success) {
      alert('작가 등록이 완료됐습니다. 감사합니다.\n관리자가 24시간 내로 확인하겠습니다.')
    } else {
      alert(registerResult.data.createArtist.msg)
    }
  }

  return (
    <div className={classes.centerArea}>
      <div className={classes.inputContainer}>
        <h3>&ensp;작가 등록</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={classes.inputBox}
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
          {errors.artistName?.type && (
            <p className={classes.errorMessage}>{errors.artistName?.message}</p>
          )}
          <TextField
            className={classes.inputBox}
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
          {errors.realName?.type && (
            <p className={classes.errorMessage}>{errors.realName?.message}</p>
          )}
          <TextField
            className={classes.inputBox}
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
          {errors.phone?.type && <p className={classes.errorMessage}>{errors.phone?.message}</p>}
          <TextField
            className={classes.inputBox}
            multiline
            label="작가 소개"
            name="description"
            variant="outlined"
            rows={7}
            defaultValue=""
            placeholder="작가를 소개하는 글입니다. 작가로서 가치관, 작품 세계 등 본인의 생각을 자유롭게 표현해주세요."
            inputRef={register}
          />
          <div className={classes.inputDiv}>
            <FormLabel component="div" className={classes.formLabel}>
              거주 지역
            </FormLabel>
            <select style={{ marginTop: '10px' }} name="residence" required={true} ref={register}>
              <option value="0">서울특별시</option>
              <option value="1">부산광역시</option>
              <option value="2">대구광역시</option>
              <option value="3">인천광역시</option>
              <option value="4">광주광역시</option>
              <option value="5">대전광역시</option>
              <option value="6">울산광역시</option>
              <option value="7">세종특별자치시</option>
              <option value="8">경기도</option>
              <option value="9">강원도</option>
              <option value="10">충청북도</option>
              <option value="11">충청남도</option>
              <option value="12">전라북도</option>
              <option value="13">전라남도</option>
              <option value="14">경상북도</option>
              <option value="15">경상남도</option>
              <option value="16">제주특별자치도</option>
            </select>
          </div>
          <div className={classes.inputDiv}>
            <FormLabel component="div" className={classes.formLabel}>
              분야
            </FormLabel>
            <RadioGroup name="category" defaultValue="0">
              <FormControlLabel value="0" control={<Radio inputRef={register} />} label="화가" />
              <FormControlLabel value="1" control={<Radio inputRef={register} />} label="조각가" />
              <FormControlLabel value="2" control={<Radio inputRef={register} />} label="공예가" />
              <FormControlLabel value="3" control={<Radio inputRef={register} />} label="기타" />
            </RadioGroup>
          </div>
          <div className={classes.inputDiv}>
            <FormLabel component="div" className={classes.formLabel}>
              프로필 이미지
            </FormLabel>
            <input
              className={classes.inputFile}
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleImagePreview(e, setThumbnailPreview)
              }}
              ref={register({
                required: '프로필 이미지를 등록해주세요.',
              })}
            />
            <Avatar
              style={{ margin: 'auto' }}
              src={thumbnailPreview}
              className={classes.largeAvatar}
            />
          </div>
          {errors.thumbnail?.type && (
            <p className={classes.errorMessage}>{errors.thumbnail?.message}</p>
          )}
          <div className={classes.inputDiv}>
            <FormLabel component="div" className={classes.formLabel}>
              대표 작품 이미지
            </FormLabel>
            <input
              className={classes.inputFile}
              type="file"
              name="representativeWork"
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleImagePreview(e, setRepresentativeWorkPreview)
              }}
              ref={register({
                required: '대표 작품을 등록해주세요.',
              })}
            />
            <Paper variant="outlined" className={classes.paper}>
              <img
                alt="representativeWork"
                className={classes.representativeWorkPreview}
                src={representativeWorkPreview}
              />
            </Paper>
          </div>
          {errors.representativeWork?.type && (
            <p className={classes.errorMessage}>{errors.representativeWork?.message}</p>
          )}
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
