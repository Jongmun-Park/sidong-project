import React, { FC, ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks'
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
  Switch,
  FormHelperText,
} from '@material-ui/core'
import { Medium, SaleStatus, Orientation, ArtOptions, Art } from '../../types'
import { ART_OPTIONS, ART } from '../../querys'
import { ArrowUpward, ArrowDownward } from '@material-ui/icons'

const useStyles = makeStyles({
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
    display: 'flex',
    margin: '15px auto auto auto',
  },
  imagePreview: {
    display: 'block',
    margin: '9px',
    width: '87%',
    maxHeight: '370px',
    objectFit: 'contain',
    borderRadius: '8px',
  },
  errorMessage: {
    color: 'red',
  },
  arrowDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginRight: '9px',
  },
})

const UPDATE_ART_MUTATION = gql`
  mutation UpdateArt(
    $artId: ID!
    $artImages: [ID]!
    $description: String!
    $height: Int!
    $isFramed: Boolean!
    $medium: ID!
    $name: String!
    $orientation: ID!
    $price: Int
    $deliveryFee: Int
    $saleStatus: ID!
    $style: ID!
    $technique: ID!
    $theme: ID!
    $width: Int!
  ) {
    updateArt(
      artId: $artId
      artImages: $artImages
      description: $description
      height: $height
      isFramed: $isFramed
      medium: $medium
      name: $name
      orientation: $orientation
      price: $price
      deliveryFee: $deliveryFee
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

const UpdateArt: FC = () => {
  const classes = useStyles()
  const { artId } = useParams<{ artId: string }>()
  const [isForSale, setIsForSale] = useState<boolean>(false)
  const [isFramed, setIsFramed] = useState<boolean>(false)
  const [theme, setTheme] = useState<string | undefined>()
  const [style, setStyle] = useState<string | undefined>()
  const [technique, setTechnique] = useState<string | undefined>()
  const [artOptions, setArtOptions] = useState<ArtOptions | null>(null)
  const [imagePreviewList, setImagePreviewList] = useState<Array<any>>([])
  const [updateArt] = useMutation(UPDATE_ART_MUTATION)
  const { register, handleSubmit, errors } = useForm()

  const { data } = useQuery(ART, {
    variables: { artId },
    onCompleted: (data) => {
      const { art } = data
      setTheme(art.theme.id)
      setStyle(art.style.id)
      setTechnique(art.technique.id)
      setIsForSale(art.saleStatus === SaleStatus.ON_SALE ? true : false)
      setIsFramed(art.isFramed)
      setImagePreviewList(art.imageUrls)
    },
    onError: (error) => console.error(error.message),
  })

  useQuery(ART_OPTIONS, {
    variables: {
      mediumId: data?.art.medium,
    },
    onCompleted: (data) => {
      setArtOptions(data.artOptions)
    },
    onError: (error) => console.error(error.message),
  })

  const [changeArtOptions] = useLazyQuery(ART_OPTIONS, {
    onCompleted: (data) => {
      setArtOptions(data.artOptions)
    },
    onError: (error) => console.error(error.message),
  })

  // useEffect(() => {
  //   if (data) {
  //     const { art } = data
  //     setTheme(art.theme.id)
  //     setStyle(art.style.id)
  //     setTechnique(art.technique.id)
  //     setIsForSale(art.saleStatus === SaleStatus.ON_SALE ? true : false)
  //     setIsFramed(art.isFramed)
  //     setImagePreviewList(art.imageUrls)
  //   }
  // }, [data])

  if (!data) {
    return null
  }

  const { art }: { art: Art } = data

  const onSubmit = async (data: any) => {
    const result = await updateArt({
      variables: {
        artId,
        artImages: imagePreviewList.map((image) => {
          return image.id
        }),
        description: data.description,
        height: data.height,
        isFramed: data.isFramed,
        medium: data.medium,
        name: data.name,
        orientation: data.orientation,
        price: data.price,
        deliveryFee: data.deliveryFee,
        saleStatus: data.saleStatus,
        style: data.style,
        technique: data.technique,
        theme: data.theme,
        width: data.width,
      },
    })
    if (result.data.updateArt.success) {
      alert('작품 수정이 완료됐습니다.')
      window.location.href = '/account/arts'
    } else {
      alert(result.data.updateArt.msg)
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
        <h3>&ensp;작품 수정</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={classes.textBox}
            autoFocus
            name="name"
            label="작품명"
            variant="outlined"
            required={true}
            defaultValue={art.name}
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
            defaultValue={art.description}
            helperText="작품에 대해 설명해주세요. 자세할수록 좋습니다. :)"
            inputRef={register}
          />
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              매체 (medium)
            </FormLabel>
            <div className={classes.inputElement}>
              <select
                name="medium"
                ref={register}
                onChange={handleChange}
                defaultValue={art.medium}
              >
                <option value={Medium.PAINTING}>회화(painting)</option>
                <option value={Medium.SCULPTURE}>조각(sculpture)</option>
                <option value={Medium.PICTURE}>사진(picture)</option>
                <option value={Medium.DRAWING}>소묘(drawing)</option>
                <option value={Medium.PRINT}>인쇄(print)</option>
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
              <select
                name="theme"
                ref={register}
                value={theme}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setTheme(e.target.value)
                }}
              >
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
              <select
                name="style"
                ref={register}
                value={style}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setStyle(e.target.value)
                }}
              >
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
              <select
                name="technique"
                ref={register}
                value={technique}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setTechnique(e.target.value)
                }}
              >
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
              defaultValue={art.saleStatus.toString()}
              onChange={handleSaleStatus}
            >
              <FormControlLabel value="0" control={<Radio inputRef={register} />} label="비매품" />
              <FormControlLabel value="1" control={<Radio inputRef={register} />} label="판매품" />
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
            <>
              <div className={classes.inputBox}>
                <FormLabel component="div" className={classes.formLabel}>
                  판매 가격
                </FormLabel>
                <FormHelperText>- 판매 가격은 10,000원 ~ 1,500,000원 까지</FormHelperText>
                <div className={classes.inputElement}>
                  <input
                    style={{ width: '85px' }}
                    type="number"
                    step="100"
                    name="price"
                    min="10000"
                    max="1500000"
                    defaultValue={art.price}
                    ref={register({
                      validate: {
                        positive: (value) => value > 0 || '판매 가격을 입력해주세요.',
                      },
                    })}
                  ></input>
                  &nbsp;원
                </div>
              </div>
              {errors.price?.type && (
                <p className={classes.errorMessage}>{errors.price?.message}</p>
              )}
              <div className={classes.inputBox}>
                <FormLabel component="div" className={classes.formLabel}>
                  배송비
                </FormLabel>
                <FormHelperText>- 작품 운송에 소요될 배송비를 정확히 입력해주세요.</FormHelperText>
                <FormHelperText>
                  - 단순 변심에 의한 환불 시, 구매자에게 청구될 금액입니다.
                </FormHelperText>
                <FormHelperText>
                  - 과도한 배송비는 작품 판매에 부정적인 영향을 미칠 수 있습니다.
                </FormHelperText>
                <div className={classes.inputElement}>
                  <input
                    style={{ width: '85px' }}
                    type="number"
                    step="100"
                    name="deliveryFee"
                    min="0"
                    max="100000"
                    defaultValue={art.deliveryFee}
                    ref={register({
                      validate: {
                        positive: (value) => value > 0 || '배송비를 입력해주세요.',
                      },
                    })}
                  ></input>
                  &nbsp;원
                </div>
              </div>
              {errors.deliveryFee?.type && (
                <p className={classes.errorMessage}>{errors.deliveryFee?.message}</p>
              )}
            </>
          )}
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              방향 및 크기
            </FormLabel>
            <FormHelperText>- 가로/세로 최대 길이는 500cm</FormHelperText>
            <div className={classes.inputElement}>
              <select
                name="orientation"
                required={true}
                ref={register}
                defaultValue={art.orientation}
              >
                <option value={Orientation.LANDSCAPE}>가로가 긴 배치</option>
                <option value={Orientation.PORTRAIT}>세로가 긴 배치</option>
                <option value={Orientation.SQUARE}>정사각형</option>
                <option value={Orientation.ETC}>기타</option>
              </select>
            </div>
            <div className={classes.inputElement}>
              가로 &nbsp;
              <input
                ref={register}
                type="number"
                step="0.1"
                name="width"
                required={true}
                min="1"
                max="500"
                defaultValue={art.width}
              ></input>
              &nbsp;cm
            </div>
            <div className={classes.inputElement}>
              세로 &nbsp;
              <input
                ref={register}
                type="number"
                step="0.1"
                name="height"
                required={true}
                min="1"
                max="500"
                defaultValue={art.height}
              ></input>
              &nbsp;cm
            </div>
          </div>
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              작품 사진
            </FormLabel>
            <FormHelperText>- 현재는 사진 순서만 변경 가능합니다.</FormHelperText>
            <FormHelperText>
              - 빠른 시일 내로 파일 추가와 삭제 기능을 추가하겠습니다.
            </FormHelperText>
            <FormHelperText>- 양해 부탁드립니다. 감사합니다.</FormHelperText>
            {imagePreviewList.map((imagePreview, index) => (
              <Paper key={index} variant="outlined" className={classes.paper}>
                <img alt="작품 사진" className={classes.imagePreview} src={imagePreview.url} />
                <div className={classes.arrowDiv}>
                  {index !== 0 && (
                    <ArrowUpward
                      fontSize="small"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        const copyList = [...imagePreviewList]
                        copyList[index] = imagePreviewList[index - 1]
                        copyList[index - 1] = imagePreviewList[index]
                        setImagePreviewList(copyList)
                      }}
                    />
                  )}
                  {imagePreviewList.length - 1 !== index && (
                    <ArrowDownward
                      fontSize="small"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        const copyList = [...imagePreviewList]
                        copyList[index] = imagePreviewList[index + 1]
                        copyList[index + 1] = imagePreviewList[index]
                        setImagePreviewList(copyList)
                      }}
                    />
                  )}
                </div>
              </Paper>
            ))}
          </div>
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

export default UpdateArt
