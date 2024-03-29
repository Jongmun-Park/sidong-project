import React, { FC, useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import { serializeParams } from '../../utils'
import { useCurrentUser } from '../../Hooks/User'
import PriceInfoTable from '../../Components/Art/PriceInfoTable'

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: '100vh',
    maxWidth: '650px',
    padding: '80px 60px 100px 60px',
    margin: '0px auto 0px auto',
    backgroundColor: 'white',
    '@media (max-width: 834px)': {
      padding: '70px 23px 100px 23px',
    },
  },
  h3: {
    '@media (max-width: 834px)': {
      fontSize: '14px',
    },
  },
  artInfo: {
    marginTop: '45px',
    '@media (max-width: 834px)': {
      marginTop: '30px',
    },
  },
  figure: {
    margin: 0,
  },
  representativeImageWrapper: {
    display: 'inline-block',
    width: '49%',
    verticalAlign: 'top',
  },
  image: {
    width: '80%',
    height: 'auto',
    maxHeight: '170px',
    objectFit: 'contain',
    border: '4px double',
    borderRadius: '8px',
    borderColor: theme.palette.BgColor.main,
    boxShadow: '4px 4px 10px 0 rgb(0 0 0 / 25%)',
  },
  figcaption: {
    display: 'inline-block',
    width: '49%',
  },
  artName: {
    fontSize: '17px',
    fontWeight: 500,
    margin: '10px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width: 834px)': {
      fontSize: '13px',
    },
  },
  pTag: {
    margin: '3px 0',
    fontSize: '13px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width: 834px)': {
      fontSize: '11px',
    },
  },
  inputBox: {
    width: '100%',
    marginTop: '1em',
  },
  form: {
    marginTop: '30px',
  },
  errorMessage: {
    color: 'red',
  },
  submitButton: {
    width: '100%',
    marginTop: '30px',
    '@media (max-width: 834px)': {
      fontSize: '13px',
      // marginTop: '19px',
    },
  },
  checkBox: {
    '& .MuiTypography-body1': {
      fontSize: '12px',
    },
  },
  table: {
    width: '100%',
    marginTop: '30px',
    // '@media (max-width: 834px)': {
    //   marginTop: '19px',
    // },
  },
  categoryTabContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '30px',
  },
  categoryTab: {
    color: theme.palette.primary.main,
    borderStyle: 'none none solid none',
    borderWidth: '2px',
    minWidth: '78px',
    lineHeight: '40px',
    textAlign: 'center',
    fontWeight: 500,
    letterSpacing: '0.02857em',
    '@media (max-width: 834px)': {
      fontSize: '13px',
      maxWidth: '72px',
      minHeight: '33px',
      lineHeight: '33px',
    },
  },
}))

const ART_FOR_ORDER = gql`
  query ArtForOrder($artId: ID!) {
    art(artId: $artId) {
      id
      artist {
        id
        artistName
        realName
      }
      name
      price
      deliveryFee
      width
      height
      representativeImageUrl
    }
  }
`

const CREATE_ORDER = gql`
  mutation CreateOrder(
    $artId: ID!
    $address: String!
    $name: String!
    $phone: String!
    $recipientAddress: String!
    $recipientName: String!
    $recipientPhone: String!
    $impUid: String!
  ) {
    createOrder(
      artId: $artId
      address: $address
      name: $name
      phone: $phone
      recipientAddress: $recipientAddress
      recipientName: $recipientName
      recipientPhone: $recipientPhone
      impUid: $impUid
    ) {
      success
      msg
    }
  }
`

const OrderArt: FC = () => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const userinfo = currentUser?.userinfo ? currentUser.userinfo : null
  const { artId } = useParams<{ artId: string }>()
  const [checkedSameInfo, setCheckedSameInfo] = useState<boolean>(false)
  const [username, setUsername] = useState<string>(userinfo ? userinfo.name : '')
  const [phone, setPhone] = useState<string>(userinfo ? userinfo.phone : '')
  const [address, setAddress] = useState<string>(userinfo ? userinfo.address : '')
  const [recipientUsername, setRecipientUsername] = useState<string>('')
  const [recipientPhone, setRecipientPhone] = useState<string>('')
  const [recipientAddress, setRecipientAddress] = useState<string>('')

  const { register, handleSubmit, errors } = useForm()
  const [createOrder] = useMutation(CREATE_ORDER)
  const { data } = useQuery(ART_FOR_ORDER, {
    variables: { artId },
    onError: (error) => console.error(error.message),
  })

  useEffect(() => {
    if (!currentUser) {
      alert('로그인이 필요합니다.')
      window.location.href = '/'
    }
    // eslint-disable-next-line
  }, [])

  if (!data) {
    return null
  }

  const { art } = data

  const onSubmit = (data: any) => {
    const IMP = window['IMP'] as any
    IMP.init(process.env.REACT_APP_IMP)

    const orderData = {
      artId,
      address: data.address,
      name: data.name,
      phone: data.phone,
      recipientAddress: data.recipientAddress,
      recipientName: data.recipientName,
      recipientPhone: data.recipientPhone,
    }

    const paymentData = {
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${art.id}_${new Date().getTime()}`, // 주문번호
      amount: art.price + art.deliveryFee, // 결제금액
      name: art.name, // 주문명
      buyer_name: data.name, // 구매자 이름
      buyer_tel: data.phone, // 구매자 전화번호
      buyer_addr: data.address, // 구매자 주소
      buyer_email: currentUser.username, // 이메일 주소
      m_redirect_url:
        process.env.REACT_APP_API_URI +
        '/api/create/order?' +
        serializeParams({ ...orderData, userId: currentUser.id }),
    }

    const callback = async (response: any) => {
      const { success, imp_uid, error_msg } = response

      if (success) {
        const result = await createOrder({
          variables: {
            ...orderData,
            impUid: imp_uid,
          },
        })
        if (result.data.createOrder.success) {
          alert('작품 주문이 완료됐습니다.')
          window.location.href = '/account/orders'
        } else {
          alert(result.data.createOrder.msg)
        }
      } else {
        alert(`결제 실패: ${error_msg}`)
      }
    }

    IMP.request_pay(paymentData, callback)
  }

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedSameInfo(event.target.checked)
    if (event.target.checked) {
      setRecipientUsername(username)
      setRecipientPhone(phone)
      setRecipientAddress(address)
    }
  }

  return (
    <main className={classes.main}>
      <h3 className={classes.h3}>&ensp;작품 구매</h3>
      <div className={classes.artInfo}>
        <figure className={classes.figure}>
          <div className={classes.representativeImageWrapper}>
            <img alt="작품 이미지" className={classes.image} src={art.representativeImageUrl} />
          </div>
          <figcaption className={classes.figcaption}>
            <p className={classes.artName}>
              <a href={`/art/${art.id}`}>{art.name}</a>
            </p>
            <p className={classes.pTag}>
              {art.artist.realName}({art.artist.artistName})
            </p>
            <p className={classes.pTag}>
              {art.width}x{art.height}cm
            </p>
          </figcaption>
        </figure>
      </div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.categoryTabContainer}>
          <div className={classes.categoryTab}>주문 정보</div>
        </div>
        <TextField
          size="small"
          className={classes.inputBox}
          name="name"
          label="성명"
          variant="outlined"
          defaultValue={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value)
          }}
          required={true}
          inputRef={register({
            maxLength: {
              value: 8,
              message: '성명은 8자 이내로 입력해주세요.',
            },
            minLength: {
              value: 2,
              message: '성명은 2자 이상 입력해주세요.',
            },
          })}
        />
        {errors.name?.type && <p className={classes.errorMessage}>{errors.name?.message}</p>}
        <TextField
          size="small"
          className={classes.inputBox}
          name="phone"
          type="tel"
          label="휴대전화 번호"
          helperText="주문 진행 상태를 안내 받을 번호로 정확히 입력해주세요."
          variant="outlined"
          defaultValue={phone}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPhone(event.target.value)
          }}
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
          size="small"
          className={classes.inputBox}
          name="address"
          label="주문자 주소"
          variant="outlined"
          multiline
          defaultValue={address}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAddress(event.target.value)
          }}
          required={true}
          inputRef={register}
        />
        <div className={classes.categoryTabContainer}>
          <div className={classes.categoryTab}>배송 정보</div>
          <FormControlLabel
            className={classes.checkBox}
            control={
              <Checkbox
                size="small"
                checked={checkedSameInfo}
                onChange={handleCheckBox}
                color="primary"
              />
            }
            label="주문 정보와 동일"
          />
        </div>
        <TextField
          size="small"
          className={classes.inputBox}
          name="recipientName"
          label="받는 이의 성명"
          variant="outlined"
          value={recipientUsername}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRecipientUsername(event.target.value)
          }}
          required={true}
          inputRef={register({
            maxLength: {
              value: 8,
              message: '성명은 8자 이내로 입력해주세요.',
            },
            minLength: {
              value: 2,
              message: '성명은 2자 이상 입력해주세요.',
            },
          })}
        />
        {errors.recipientName?.type && (
          <p className={classes.errorMessage}>{errors.recipientName?.message}</p>
        )}
        <TextField
          size="small"
          className={classes.inputBox}
          name="recipientPhone"
          type="tel"
          label="받는 이의 휴대전화 번호"
          helperText="배송 상황을 안내 받을 번호로 정확히 입력해주세요."
          variant="outlined"
          value={recipientPhone}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRecipientPhone(event.target.value)
          }}
          required={true}
          inputRef={register({
            minLength: {
              value: 10,
              message: '휴대전화 번호는 10자 이상으로 입력해주세요.',
            },
          })}
        />
        {errors.recipientPhone?.type && (
          <p className={classes.errorMessage}>{errors.recipientPhone?.message}</p>
        )}
        <TextField
          size="small"
          className={classes.inputBox}
          name="recipientAddress"
          label="배송지"
          variant="outlined"
          multiline
          value={recipientAddress}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRecipientAddress(event.target.value)
          }}
          required={true}
          inputRef={register}
        />
        <div className={classes.categoryTabContainer}>
          <div className={classes.categoryTab} style={{ width: '100px' }}>
            교환 및 환불
          </div>
        </div>
        <div style={{ lineHeight: '25px', padding: '1em', fontSize: '12px' }}>
          [ 교환 안내 ]
          <div style={{ fontWeight: 600 }}>
            * 작품 특성상 추가 재고가 없기 때문에 '교환'은 불가능합니다.
          </div>
          <div style={{ height: '1em' }}></div>
          [ 환불 안내 ]
          <br />
          * 작품을 수령한 후 7일 이내에 환불 요청할 수 있습니다.
          <br />
          <span style={{ fontWeight: 600 }}>
            * 구매자의 단순 변심에 의한 환불시, 결제 금액에서 왕복 배송비를 차감한 금액이
            환불됩니다.
          </span>
          <br />
          * 아래 사항에 해당하는 경우에만 작가가 왕복 배송비를 부담합니다.
          <br />
          &emsp;1) 실제 작품의 내용이 작품 상세 정보에 표기된 내용과 상이한 경우
          <br />
          &emsp;2) 배송 중 파손되었을 경우
          <br />
          &emsp;3) 위작 또는 명시되지 않은 모작의 경우
        </div>
        <div className={classes.table}>
          <PriceInfoTable artPrice={art.price} deliveryFee={art.deliveryFee} />
        </div>
        <Button type="submit" color="primary" variant="contained" className={classes.submitButton}>
          결제하기
        </Button>
      </form>
    </main>
  )
}

export default OrderArt
