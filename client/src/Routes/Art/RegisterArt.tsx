import React, { FC, ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Checkbox,
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
import { Medium, SaleStatus, ArtOptions } from '../../types'
import { ART_OPTIONS } from '../../querys'
import { useCurrentUser } from '../../Hooks/User'

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
    maxWidth: 'inherit',
    maxHeight: 'inherit',
    margin: '15px auto auto auto',
  },
  imagePreview: {
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
    fontWeight: 'bold',
    color: 'black',
  },
  checkBox: {
    marginTop: '8px',
    '& .MuiTypography-body1': {
      fontSize: '12px',
    },
  },
})

const REGISTER_ART_MUTATION = gql`
  mutation RegisterArt(
    $artImages: Upload!
    $description: String!
    $height: Int!
    $isFramed: Boolean!
    $medium: ID!
    $name: String!
    $price: Int
    $deliveryFee: Int
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

const RegisterArt: FC = () => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const [isForSale, setIsForSale] = useState<boolean>(false)
  const [isFramed, setIsFramed] = useState<boolean>(false)
  const [checkedPolicy, setCheckedPolicy] = useState<boolean>(false)
  const [artOptions, setArtOptions] = useState<ArtOptions | null>(null)
  const [imagePreviewList, setImagePreviewList] = useState<Array<string>>([])
  const [registerArt] = useMutation(REGISTER_ART_MUTATION)
  const { register, handleSubmit, errors } = useForm()

  const { data: artOptionData } = useQuery(ART_OPTIONS, {
    variables: {
      mediumId: Medium.PAINTING,
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

  if (!artOptionData) {
    return null
  }

  const onSubmit = async (data: any) => {
    if (!checkedPolicy) {
      alert('작품 관리 및 판매 정책에 동의하셔야 작품 등록이 가능합니다.')
      return
    }

    const registerResult = await registerArt({
      variables: {
        artImages: data.artImages,
        description: data.description,
        height: data.height,
        isFramed: data.isFramed,
        medium: data.medium,
        name: data.name,
        price: data.price,
        deliveryFee: data.deliveryFee,
        saleStatus: data.saleStatus,
        style: data.style,
        technique: data.technique,
        theme: data.theme,
        width: data.width,
      },
    })
    if (registerResult.data.createArt.success) {
      alert('작품 등록이 완료됐습니다. 감사합니다.')
      window.location.href = '/account/arts'
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

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedPolicy(event.target.checked)
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
            <RadioGroup name="saleStatus" defaultValue="0" onChange={handleSaleStatus}>
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
                <FormHelperText>
                  - 1,500,000원을 초과하는 고가의 작품은 등록할 수 없습니다.
                </FormHelperText>
                <div className={classes.inputElement}>
                  <input
                    style={{ width: '85px' }}
                    type="number"
                    step="100"
                    name="price"
                    min="10000"
                    max="1500000"
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
              작품 크기
            </FormLabel>
            <FormHelperText>- 가로/세로 최대 길이는 200cm</FormHelperText>
            <FormHelperText>
              - 한 면의 길이가 200cm를 초과하는 대형 작품은 등록할 수 없습니다.
            </FormHelperText>
            <div className={classes.inputElement}>
              가로 &nbsp;
              <input
                ref={register}
                type="number"
                step="0.1"
                name="width"
                required={true}
                min="1"
                max="200"
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
                max="200"
              ></input>
              &nbsp;cm
            </div>
          </div>
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              작품 사진
            </FormLabel>
            <FormHelperText style={{ color: 'crimson' }}>
              - 최대 5개의 이미지 파일 선택 가능
            </FormHelperText>
            <FormHelperText>- 각 파일 용량은 10MB까지</FormHelperText>
            <FormHelperText>- 첫 번째 미리보기 사진이 대표 사진으로 사용됩니다.</FormHelperText>
            <FormHelperText>
              - 대표 사진과{' '}
              <span style={{ color: 'crimson' }}>사진 순서는 등록 후 수정 가능합니다.</span>
            </FormHelperText>
            <FormHelperText>
              - 앞, 뒤, 옆면 등 다양한 각도에서 작품을 보여주면 좋습니다.
            </FormHelperText>
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
                <img
                  alt="작품 미리보기 이미지"
                  className={classes.imagePreview}
                  src={imagePreview}
                />
              </Paper>
            ))}
          </div>
          <div className={classes.inputBox}>
            <FormLabel component="div" className={classes.formLabel}>
              작품 관리 및 판매 정책
            </FormLabel>
            <div style={{ height: '10px' }}></div>
            <FormHelperText>
              <span className={classes.highlightFont}>
                - 작품 판매 수수료는 작품 가격의 6% 입니다. (카드 결제 수수료 포함)
              </span>
            </FormHelperText>
            <FormHelperText>- 판매 수수료는 대금 정산시 반영됩니다.</FormHelperText>
            <FormHelperText>
              - 정산은 매월 마지막 주에 이뤄지며 등록하신 정산 계좌로 입금 후 문자 안내드립니다.
            </FormHelperText>
            <div style={{ height: '10px' }}></div>
            <FormHelperText>
              - 타인의 작품을 도용하거나 허위로 작품을 등록할 경우(위작, 모작) 그에 따라 법적 책임을
              질 수 있습니다.
            </FormHelperText>
            <div style={{ height: '10px' }}></div>
            <FormHelperText>
              <span className={classes.highlightFont}>
                - 아래 예시와 같이 작품이 Jakupteo 정책과 맞지 않는 경우, 해당 작품은 노출되지
                않거나 임의 삭제될 수 있습니다.
              </span>
            </FormHelperText>
            <FormHelperText>
              &ensp;예1) 작품의 이미지가 선명치 않아 작품을 확인하기 힘든 경우
            </FormHelperText>
            <FormHelperText>&ensp;예2) 위작 또는 모작으로 추정되거나 신고 받은 경우</FormHelperText>
            <FormHelperText>&ensp;예3) 작가가 직접 만들지 않은 상품의 경우</FormHelperText>
            <FormHelperText>&ensp;예4) 무성의한 작품이라 판단되는 경우</FormHelperText>
            <FormControlLabel
              className={classes.checkBox}
              control={
                <Checkbox
                  size="small"
                  checked={checkedPolicy}
                  onChange={handleCheckBox}
                  color="primary"
                />
              }
              label="'작품 관리 및 판매 정책' 에 동의합니다."
            />
          </div>
          {currentUser?.artist?.isApproved ? (
            <Button
              className={classes.submitButton}
              type="submit"
              color="primary"
              variant="contained"
            >
              등록하기
            </Button>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '28px' }}>
              <p>승인된 작가만 작품 등록이 가능합니다.</p>
              <p>관리자에게 문의해주세요.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default RegisterArt
