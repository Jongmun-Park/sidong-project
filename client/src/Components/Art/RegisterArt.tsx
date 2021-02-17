import React, { FC, ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  TextField,
  Button,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Switch,
  FormHelperText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks'
import { handleImagePreviewList } from '../../utils'
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
    margin: '10px 0px 10px 0px',
  },
  formLabel: {
    marginBottom: '10px',
  },
  submitButton: {
    float: 'right',
    marginTop: '30px',
  },
  paper: {
    maxWidth: 'inherit',
    maxHeight: 'inherit',
    margin: '15px auto auto auto',
  },
  imagePreview: {
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

const REGISTER_ART_MUTATION = gql`
  mutation(
    $artImages: Upload!
    $description: String!
    $height: Int!
    $isFramed: Boolean!
    $medium: ID!
    $name: String!
    $orientation: ID!
    $price: Int
    $saleStatus: ID!
    $style: ID!
    $technique: ID!
    $theme: ID!
    $width: Int!
  ) {
    createArt(
      artImages: $artImages
      description: $description
      height: $height
      isFramed: $isFramed
      medium: $medium
      name: $name
      orientation: $orientation
      price: $price
      saleStatus: $saleStatus
      style: $style
      technique: $technique
      theme: $theme
      width: $width
    ) {
      success
      msg
    }
  }
`

const RegisterArt: FC = () => {
  const classes = useStyles()
  const [isForSale, setIsForSale] = useState<boolean>(false)
  const [isFramed, setIsFramed] = useState<boolean>(false)
  const [artOptions, setArtOptions] = useState<ArtOptions | null>(null)
  const [imagePreviewList, setImagePreviewList] = useState<Array<string>>([])
  const [registerArt] = useMutation(REGISTER_ART_MUTATION)
  const { register, handleSubmit, errors } = useForm()

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
    const registerResult = await registerArt({
      variables: {
        artImages: data.artImages,
        description: data.description,
        height: data.height,
        isFramed: data.isFramed,
        medium: data.medium,
        name: data.name,
        orientation: data.orientation,
        price: data.price,
        saleStatus: data.saleStatus,
        style: data.style,
        technique: data.technique,
        theme: data.theme,
        width: data.width,
      },
    })
    if (registerResult.data.createArt.success) {
      alert('작품 등록이 완료됐습니다. 감사합니다.')
      window.location.href = '/arts'
    } else {
      alert(registerResult.data.createArt.msg)
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
            helperText="작품에 대해 설명해주세요. 자세할수록 좋습니다. :)"
            inputRef={register}
          />
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              매체 (medium)
            </FormLabel>
            <div className={classes.inputElement}>
              <select name="medium" ref={register} onChange={handleChange}>
                <option value={Medium.PAINTING}>회화(painting)</option>
                <option value={Medium.SCULPTURE}>조각(sculpture)</option>
                <option value={Medium.DRAWING}>소묘(drawing)</option>
                <option value={Medium.PRINT}>판화(print)</option>
                <option value={Medium.PAPER}>종이(paper)</option>
                <option value={Medium.TEXTILE}>섬유(textile)</option>
                <option value={Medium.ETC}>기타 매체</option>
              </select>
            </div>
          </div>
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              주제 (theme)
            </FormLabel>
            <div className={classes.inputElement}>
              <select name="theme" ref={register}>
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
              스타일 (style)
            </FormLabel>
            <div className={classes.inputElement}>
              <select name="style" ref={register}>
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
              기법 (technique)
            </FormLabel>
            <div className={classes.inputElement}>
              <select name="technique" ref={register}>
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
                  inputRef={register}
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
                <input
                  type="number"
                  name="price"
                  min="0"
                  ref={register({
                    validate: {
                      positive: (value) => value > 0 || '판매 가격을 입력해주세요.',
                    },
                  })}
                ></input>
                원
              </div>
            </div>
          )}
          {errors.price?.type && <p className={classes.errorMessage}>{errors.price?.message}</p>}
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
              가로 &nbsp;
              <input
                ref={register({
                  validate: {
                    positive: (value) => value > 0 || '가로 길이를 0 보다 큰 숫자로 입력해주세요.',
                  },
                })}
                type="number"
                name="width"
                min="0"
              ></input>{' '}
              cm
            </div>
            <div className={classes.inputElement}>
              세로 &nbsp;
              <input
                ref={register({
                  validate: {
                    positive: (value) => value > 0 || '세로 길이를 0 보다 큰 숫자로 입력해주세요.',
                  },
                })}
                type="number"
                name="height"
                min="0"
              ></input>{' '}
              cm
            </div>
          </div>
          {errors.width?.type && <p className={classes.errorMessage}>{errors.width?.message}</p>}
          {errors.height?.type && <p className={classes.errorMessage}>{errors.height?.message}</p>}
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              작품 이미지
            </FormLabel>
            <FormHelperText>- 최대 5개 선택 가능</FormHelperText>
            <FormHelperText>- 첫 번째 이미지가 대표 이미지로 사용됩니다.</FormHelperText>
            <input
              className={classes.inputFile}
              type="file"
              name="artImages"
              accept="image/*"
              multiple
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleImagePreviewList(e, setImagePreviewList)
              }}
              ref={register({
                required: '작품 이미지를 등록해주세요.',
                validate: {
                  lessThanSix: (value) =>
                    value.length < 6 || '작품 이미지는 최대 5개까지 등록 가능합니다.',
                },
              })}
            />
            {errors.artImages?.type && (
              <p className={classes.errorMessage}>{errors.artImages?.message}</p>
            )}
            {imagePreviewList.map((imagePreview, index) => (
              <Paper key={index} variant="outlined" className={classes.paper}>
                <img alt="artImagePreview" className={classes.imagePreview} src={imagePreview} />
              </Paper>
            ))}
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

export default RegisterArt
