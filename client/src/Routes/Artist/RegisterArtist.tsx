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
import { Residence } from '../../types'

const useStyles = makeStyles((theme) => ({
  centerArea: {
    minHeight: '100vh',
    maxWidth: '550px',
    padding: '80px 60px 100px 60px',
    margin: '0px auto 0px auto',
    backgroundColor: 'white',
    '@media (max-width: 834px)': {
      padding: '70px 27px 100px 27px',
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
    margin: 'auto',
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  submitButton: {
    float: 'right',
    marginTop: '20px',
  },
  paper: {
    maxWidth: 'inherit',
    maxHeight: 'inherit',
    margin: 'auto',
  },
  representativeWorkPreview: {
    display: 'block',
    margin: 'auto',
    width: '100%',
    maxHeight: '370px',
    objectFit: 'contain',
    borderRadius: '8px',
  },
  errorMessage: {
    color: 'red',
  },
  highlightFont: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: 'black',
  },
}))

const REGISTER_ARTIST_MUTATION = gql`
  mutation RegisterArtist(
    $artistName: String!
    $realName: String!
    $website: String!
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
      website: $website
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
  const classes = useStyles()
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
        website: data.website,
      },
    })
    if (registerResult.data.createArtist.success) {
      alert('작가 등록이 완료됐습니다. 감사합니다.')
      window.location.href = '/artists'
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
            label="예명(닉네임)"
            variant="outlined"
            required={true}
            inputRef={register({
              maxLength: {
                value: 32,
                message: '예명(닉네임)은 32자 이내로 입력해주세요.',
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
            name="website"
            label="개인 웹사이트 / SNS 주소"
            variant="outlined"
            inputRef={register({
              maxLength: {
                value: 128,
                message: '주소는 128자 이내로 입력해주세요.',
              },
            })}
          />
          <TextField
            className={classes.inputBox}
            name="phone"
            type="tel"
            label="휴대전화 번호"
            helperText="작품 판매 상황을 안내 받을 휴대전화 번호를 정확히 입력해주세요."
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
            helperText="작가를 소개하는 글입니다. 작가로서 가치관, 작품 세계 등 본인의 생각을 자유롭게 표현해주세요."
            inputRef={register}
          />
          <div className={classes.inputDiv}>
            <FormLabel component="div" className={classes.formLabel}>
              거주 지역
            </FormLabel>
            <select style={{ marginTop: '10px' }} name="residence" ref={register}>
              <option value={Residence.SEOUL}>서울특별시</option>
              <option value={Residence.PUSAN}>부산광역시</option>
              <option value={Residence.DAEGU}>대구광역시</option>
              <option value={Residence.INCHEON}>인천광역시</option>
              <option value={Residence.GWANGJU}>광주광역시</option>
              <option value={Residence.DAEJEON}>대전광역시</option>
              <option value={Residence.ULSAN}>울산광역시</option>
              <option value={Residence.SEJONG}>세종특별자치시</option>
              <option value={Residence.GYEONGGI}>경기도</option>
              <option value={Residence.GANGWON}>강원도</option>
              <option value={Residence.CHUNGBUK}>충청북도</option>
              <option value={Residence.CHUNGNAM}>충청남도</option>
              <option value={Residence.JEONBUK}>전라북도</option>
              <option value={Residence.JEONNAM}>전라남도</option>
              <option value={Residence.GYEONGBUK}>경상북도</option>
              <option value={Residence.GYEONGNAM}>경상남도</option>
              <option value={Residence.JEJU}>제주특별자치도</option>
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
            <Avatar src={thumbnailPreview} className={classes.largeAvatar} />
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
                alt="대표 작품 미리보기 이미지"
                className={classes.representativeWorkPreview}
                src={representativeWorkPreview}
              />
            </Paper>
          </div>
          {errors.representativeWork?.type && (
            <p className={classes.errorMessage}>{errors.representativeWork?.message}</p>
          )}
          <div className={classes.inputDiv}>
            <p className={classes.highlightFont}>
              - 추후 작가의 활동이나 작품이 Jakupteo에 부적합하다고 판단되는 경우, 작가 권한이
              박탈될 수 있습니다.
            </p>
            <p className={classes.highlightFont}>- Jakupteo의 작가로 등록해주셔서 감사합니다.</p>
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
