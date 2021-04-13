import React, { FC, useState } from 'react'
import gql from 'graphql-tag'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from '@material-ui/core'
import { useCurrentUser } from '../../Hooks/User'
import { currencyFormatter } from '../../utils'

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: '100vh',
    maxWidth: '650px',
    padding: '30px 60px 100px 60px',
    margin: '0px auto 0px auto',
    backgroundColor: 'white',
    '@media (max-width: 823px)': {
      padding: '20px 23px 100px 23px',
    },
  },
  h3: {
    '@media (max-width: 823px)': {
      fontSize: '14px',
    },
  },
  artInfo: {
    marginTop: '45px',
    '@media (max-width: 823px)': {
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
    borderRadius: '13px',
    borderColor: theme.palette.primary.light,
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
    '@media (max-width: 823px)': {
      fontSize: '13px',
    },
  },
  pTag: {
    margin: '3px 0',
    fontSize: '13px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width: 823px)': {
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
    marginTop: '24px',
    '@media (max-width: 823px)': {
      marginTop: '19px',
      fontSize: '13px',
    },
  },
  checkBox: {
    '& .MuiTypography-body1': {
      fontSize: '12px',
    },
  },
  table: {
    width: '100%',
    marginTop: '24px',
    '@media (max-width: 823px)': {
      marginTop: '19px',
    },
  },
  th: {
    color: theme.palette.greyFont.main,
    width: '60%',
    padding: '6px 6px 6px 0',
    fontSize: '0.929em',
    borderBottom: 'none',
    textAlign: 'right',
    '@media (max-width: 823px)': {
      fontSize: '12px',
    },
  },
  td: {
    width: '40%',
    padding: '6px',
    fontSize: '1em',
    fontWeight: 400,
    borderBottom: 'none',
    textAlign: 'right',
    '@media (max-width: 823px)': {
      fontSize: '12.4px',
    },
  },
  categoryTabContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '20px',
  },
  categoryTab: {
    color: theme.palette.primary.main,
    borderStyle: 'none none solid none',
    borderWidth: '2px',
    maxWidth: '100px',
    minWidth: '72px',
    minHeight: '40px',
    lineHeight: '40px',
    textAlign: 'center',
    fontWeight: 500,
    letterSpacing: '0.02857em',
    '@media (max-width: 823px)': {
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
  ) {
    createOrder(
      artId: $artId
      address: $address
      name: $name
      phone: $phone
      recipientAddress: $recipientAddress
      recipientName: $recipientName
      recipientPhone: $recipientPhone
    ) {
      success
      msg
    }
  }
`

const OrderArt: FC = () => {
  const classes = useStyles()
  const { userinfo } = useCurrentUser()
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

  if (!data) {
    return null
  }

  const { art } = data

  const onSubmit = async (data: any) => {
    const result = await createOrder({
      variables: {
        artId,
        address: data.address,
        name: data.name,
        phone: data.phone,
        recipientAddress: data.recipientAddress,
        recipientName: data.recipientName,
        recipientPhone: data.recipientPhone,
      },
    })
    if (result.data.createOrder.success) {
      alert('작품 주문이 완료됐습니다.')
      window.location.href = '/account/orders'
    } else {
      alert(result.data.createOrder.msg)
    }
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
          autoFocus
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
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                작품 가격
              </TableCell>
              <TableCell className={classes.td}>{currencyFormatter(art.price)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                배송비
              </TableCell>
              <TableCell className={classes.td}>{currencyFormatter(0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                총 금액
              </TableCell>
              <TableCell className={classes.td}>{currencyFormatter(art.price)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button type="submit" color="primary" variant="contained" className={classes.submitButton}>
          결제하기
        </Button>
      </form>
    </main>
  )
}

export default OrderArt
