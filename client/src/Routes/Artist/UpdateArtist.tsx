import React, { FC, useState, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  Button,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Avatar,
} from '@material-ui/core'
import { Artist, Residence } from '../../types'
import { ARTIST } from '../../querys'
import { handleImagePreview } from '../../utils'

const useStyles = makeStyles((theme) => ({
  centerArea: {
    minHeight: '100vh',
    maxWidth: '550px',
    padding: '80px 60px 100px 60px',
    margin: '0px auto 0px auto',
    backgroundColor: 'white',
    '@media (max-width: 834px)': {
      padding: '70px 23px 100px 23px',
    },
  },
  inputContainer: {
    maxWidth: '400px',
    margin: 'auto',
  },
  textBox: {
    width: '100%',
    marginTop: '1em',
  },
  inputBox: {
    width: '100%',
    marginTop: '1em',
    padding: '18.5px 14px',
    border: '1px solid',
    borderRadius: '4px',
    borderColor: 'rgba(0, 0, 0, 0.23)',
  },
  inputElement: {
    textAlign: 'right',
  },
  inputFile: {
    marginTop: '10px',
    marginBottom: '20px',
  },
  formLabel: {
    marginBottom: '10px',
  },
  submitButton: {
    float: 'right',
    marginTop: '30px',
  },
  paper: {
    display: 'flex',
    margin: 'auto',
    marginTop: '15px',
  },
  errorMessage: {
    color: 'red',
  },
  largeAvatar: {
    margin: 'auto',
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  representativeWorkPreview: {
    display: 'block',
    margin: 'auto',
    width: '100%',
    maxHeight: '370px',
    objectFit: 'contain',
    borderRadius: '8px',
  },
}))

const UPDATE_ARTIST_MUTATION = gql`
  mutation UpdateArtist(
    $artistName: String!
    $category: Int!
    $description: String!
    $phone: String!
    $realName: String!
    $representativeWork: Upload
    $residence: Int!
    $thumbnail: Upload
    $website: String
  ) {
    updateArtist(
      artistName: $artistName
      category: $category
      description: $description
      phone: $phone
      realName: $realName
      representativeWork: $representativeWork
      residence: $residence
      thumbnail: $thumbnail
      website: $website
    ) {
      success
      msg
    }
  }
`

const UpdateArtist: FC = () => {
  const classes = useStyles()
  const { artistId } = useParams<{ artistId: string }>()
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [representativeWorkPreview, setRepresentativeWorkPreview] = useState('')
  const [updateArtist] = useMutation(UPDATE_ARTIST_MUTATION)
  const { register, handleSubmit, errors, setValue, watch } = useForm()
  const thumbnail = watch('thumbnail')
  const representativeWork = watch('representativeWork')

  const { data } = useQuery(ARTIST, {
    variables: {
      artistId: artistId,
    },
    onCompleted: (data) => {
      const { artist } = data
      setThumbnailPreview(artist.thumbnail.url)
      setRepresentativeWorkPreview(artist.representativeWork.url)
    },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }

  const { artist }: { artist: Artist } = data

  const onSubmit = async (data: any) => {
    const result = await updateArtist({
      variables: {
        artistName: data.artistName,
        category: data.category,
        description: data.description,
        phone: data.phone,
        realName: data.realName,
        residence: data.residence,
        website: data.website,
        representativeWork: data.representativeWork,
        thumbnail: data.thumbnail,
      },
    })
    if (result.data.updateArtist.success) {
      alert('프로필 수정이 완료됐습니다.')
      window.location.href = `/artist/${artistId}`
    } else {
      alert(result.data.updateArtist.msg)
    }
  }

  return (
    <div className={classes.centerArea}>
      <div className={classes.inputContainer}>
        <h3>&ensp;프로필 수정</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={classes.textBox}
            autoFocus
            name="artistName"
            label="예명(닉네임)"
            variant="outlined"
            required={true}
            defaultValue={artist.artistName}
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
            className={classes.textBox}
            name="realName"
            label="성명"
            variant="outlined"
            required={true}
            defaultValue={artist.realName}
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
            className={classes.textBox}
            name="website"
            label="개인 웹사이트 / SNS 주소"
            variant="outlined"
            defaultValue={artist.website}
            inputRef={register({
              maxLength: {
                value: 128,
                message: '주소는 128자 이내로 입력해주세요.',
              },
            })}
          />
          <TextField
            className={classes.textBox}
            name="phone"
            type="tel"
            label="휴대전화 번호"
            helperText="작품 판매 상황을 안내 받을 휴대전화 번호를 정확히 입력해주세요."
            variant="outlined"
            required={true}
            defaultValue={artist.phone}
            inputRef={register({
              minLength: {
                value: 10,
                message: '휴대전화 번호는 10자 이상으로 입력해주세요.',
              },
            })}
          />
          {errors.phone?.type && <p className={classes.errorMessage}>{errors.phone?.message}</p>}
          <TextField
            className={classes.textBox}
            multiline
            label="작가 소개"
            name="description"
            variant="outlined"
            rows={7}
            defaultValue={artist.description}
            helperText="작가를 소개하는 글입니다. 작가로서 가치관, 작품 세계 등 본인의 생각을 자유롭게 표현해주세요."
            inputRef={register}
          />
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              거주 지역
            </FormLabel>
            <div className={classes.inputElement}>
              <select name="residence" ref={register} defaultValue={artist.residence}>
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
          </div>
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              분야
            </FormLabel>
            <div className={classes.inputElement}>
              <RadioGroup name="category" defaultValue={artist.category.toString()}>
                <FormControlLabel value="0" control={<Radio inputRef={register} />} label="화가" />
                <FormControlLabel
                  value="1"
                  control={<Radio inputRef={register} />}
                  label="조각가"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio inputRef={register} />}
                  label="공예가"
                />
                <FormControlLabel value="3" control={<Radio inputRef={register} />} label="기타" />
              </RadioGroup>
            </div>
          </div>
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              프로필 이미지
            </FormLabel>
            <Avatar className={classes.largeAvatar} src={thumbnailPreview} />
            <input
              className={classes.inputFile}
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleImagePreview(e, setThumbnailPreview)
                } else {
                  setThumbnailPreview(artist.thumbnail.url)
                }
              }}
              ref={register}
            />
            {thumbnail?.length > 0 && (
              <Button
                variant="outlined"
                color="default"
                size="small"
                onClick={() => {
                  setValue('thumbnail', '')
                  setThumbnailPreview(artist.thumbnail.url)
                }}
              >
                되돌리기
              </Button>
            )}
          </div>
          {errors.thumbnail?.type && (
            <p className={classes.errorMessage}>{errors.thumbnail?.message}</p>
          )}
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              대표 작품 이미지
            </FormLabel>
            <Paper variant="outlined" className={classes.paper}>
              <img
                alt="대표 작품 미리보기 이미지"
                className={classes.representativeWorkPreview}
                src={representativeWorkPreview}
              />
            </Paper>
            <input
              className={classes.inputFile}
              type="file"
              name="representativeWork"
              accept="image/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleImagePreview(e, setRepresentativeWorkPreview)
                } else {
                  setRepresentativeWorkPreview(artist.representativeWork.url)
                }
              }}
              ref={register}
            />
            {representativeWork?.length > 0 && (
              <Button
                variant="outlined"
                color="default"
                size="small"
                onClick={() => {
                  setValue('representativeWork', '')
                  setRepresentativeWorkPreview(artist.representativeWork.url)
                }}
              >
                되돌리기
              </Button>
            )}
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
            수정하기
          </Button>
        </form>
      </div>
    </div>
  )
}

export default UpdateArtist
