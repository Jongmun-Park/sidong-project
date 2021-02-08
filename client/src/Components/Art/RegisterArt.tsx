import React, { FC, ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Avatar,
  TextField,
  Button,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Switch,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks'
import { handleImagePreview } from '../../utils'
import { Medium, SaleStatus, Orientation } from '../../types'

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
    marginTop: '10px',
    textAlign: 'right',
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

interface ArtOptions {
  styles: Array<any>
  techniques: Array<any>
  themes: Array<any>
}

const ART_OPTIONS = gql`
  query($mediumId: ID!) {
    artOptions(mediumId: $mediumId) {
      themes {
        id
        name
      }
      styles {
        id
        name
      }
      techniques {
        id
        name
      }
    }
  }
`

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

const RegisterArt: FC = () => {
  console.log('registerArt rendered')
  const classes = useStyles({})
  const [isForSale, setIsForSale] = useState<boolean>(false)
  const [isFramed, setIsFramed] = useState<boolean>(false)
  const [artOptions, setArtOptions] = useState<ArtOptions | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [representativeWorkPreview, setRepresentativeWorkPreview] = useState(
    'http://i.imgur.com/I86rTVl.jpg'
  )
  const [registerArtist] = useMutation(REGISTER_ARTIST_MUTATION)
  const { register, handleSubmit, errors } = useForm()

  console.log(artOptions)

  const { data } = useQuery(ART_OPTIONS, {
    variables: {
      mediumId: Medium.PAINTING,
    },
    onCompleted: (data) => {
      setArtOptions(data.artOptions)
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  const [changeArtOptions] = useLazyQuery(ART_OPTIONS, {
    onCompleted: (data) => {
      setArtOptions(data.artOptions)
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  if (!data) {
    return null
  }

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

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    changeArtOptions({
      variables: {
        mediumId: e.target.value,
      },
    })
  }

  const handleSaleStatus = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === SaleStatus.ON_SALE.toString()) {
      setIsForSale(true)
    } else {
      setIsForSale(false)
    }
  }

  const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsFramed(true)
    } else {
      setIsFramed(false)
    }
  }

  return (
    <div className={classes.centerArea}>
      <div className={classes.inputContainer}>
        <h3>&ensp;작품 등록</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={classes.textBox}
            autoFocus
            name="name"
            label="작품명"
            placeholder="작품명"
            variant="outlined"
            required={true}
            inputRef={register({
              maxLength: {
                value: 128,
                message: '작품명은 128자 이내로 입력해주세요.',
              },
            })}
          />
          {errors.name?.type && <p className={classes.errorMessage}>{errors.name?.message}</p>}
          <TextField
            className={classes.textBox}
            multiline
            label="작품 설명"
            name="description"
            variant="outlined"
            rows={7}
            defaultValue=""
            placeholder="작품에 대해 설명해주세요."
            inputRef={register}
          />
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              매체
            </FormLabel>
            <div className={classes.inputElement}>
              <select name="medium" required={true} ref={register} onChange={handleChange}>
                <option value="0">회화</option>
                <option value="1">조각</option>
                <option value="2">소묘</option>
                <option value="3">판화</option>
                <option value="4">종이</option>
                <option value="5">섬유</option>
                <option value="6">기타 매체</option>
              </select>
            </div>
          </div>
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              주제
            </FormLabel>
            <div className={classes.inputElement}>
              <select name="theme" required={true} ref={register}>
                {artOptions?.themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              스타일
            </FormLabel>
            <div className={classes.inputElement}>
              <select name="style" required={true} ref={register}>
                {artOptions?.styles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              기법
            </FormLabel>
            <div className={classes.inputElement}>
              <select name="technique" required={true} ref={register}>
                {artOptions?.techniques.map((technique) => (
                  <option key={technique.id} value={technique.id}>
                    {technique.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              판매 여부
            </FormLabel>
            <RadioGroup
              name="saleStatus"
              defaultValue={SaleStatus.NOT_FOR_SALE}
              onChange={handleSaleStatus}
            >
              <FormControlLabel
                value={SaleStatus.NOT_FOR_SALE}
                control={<Radio inputRef={register} />}
                label="비매품"
              />
              <FormControlLabel
                value={SaleStatus.ON_SALE}
                control={<Radio inputRef={register} />}
                label="판매품"
              />
            </RadioGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isFramed}
                  onChange={handleSwitch}
                  name="isFramed"
                  color="primary"
                />
              }
              label={isFramed ? '액자 포함' : '액자 미포함'}
            />
          </div>
          {isForSale && (
            <div className={classes.inputBox}>
              <FormLabel component="div" className={classes.formLabel}>
                판매 가격 (배송비 포함)
              </FormLabel>
              <div className={classes.inputElement}>
                <input type="number" name="price" min="1000"></input> 원
              </div>
            </div>
          )}
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              방향 및 크기
            </FormLabel>
            <div className={classes.inputElement}>
              <select name="orientation" required={true} ref={register}>
                <option value={Orientation.LANDSCAPE}>가로가 긴 배치</option>
                <option value={Orientation.PORTRAIT}>세로가 긴 배치</option>
                <option value={Orientation.SQUARE}>정사각형</option>
                <option value={Orientation.ETC}>기타</option>
              </select>
            </div>
            <div className={classes.inputElement}>
              가로 &nbsp;<input type="number" name="width" min="0"></input> cm
            </div>
            <div className={classes.inputElement}>
              세로 &nbsp;<input type="number" name="height" min="0"></input> cm
            </div>
          </div>
          <div className={classes.inputBox}>
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
          <div className={classes.inputBox}>
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

export default RegisterArt
