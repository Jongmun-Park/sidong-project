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
    marginTop: '23px',
    '@media (max-width: 823px)': {
      marginTop: '16px',
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
    $checkedSave: Boolean!
    $name: String!
    $phone: String!
  ) {
    createOrder(
      artId: $artId
      address: $address
      checkedSave: $checkedSave
      name: $name
      phone: $phone
    ) {
      success
      msg
    }
  }
`

const OrderArt: FC = () => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const { artId } = useParams<{ artId: string }>()
  const [checkedSave, setCheckedSave] = useState<boolean>(false)
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
  const { userinfo } = currentUser

  const onSubmit = async (data: any) => {
    const result = await createOrder({
      variables: {
        artId,
        address: data.address,
        checkedSave: data.checkedSave,
        name: data.name,
        phone: data.phone,
      },
    })
    if (result.data.createOrder.success) {
      alert('작품 주문이 완료됐습니다.')
      window.location.href = '/account/orders'
    } else {
      alert(result.data.createOrder.msg)
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
        <TextField
          size="small"
          className={classes.inputBox}
          autoFocus
          name="name"
          label="성명"
          variant="outlined"
          defaultValue={userinfo?.name}
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
          defaultValue={userinfo?.phone}
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
          label="배송지"
          variant="outlined"
          multiline
          defaultValue={userinfo?.address}
          required={true}
          inputRef={register}
        />
        <FormControlLabel
          className={classes.checkBox}
          control={
            <Checkbox
              size="small"
              checked={checkedSave}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCheckedSave(event.target.checked)
              }}
              name="checkedSave"
              color="primary"
              inputRef={register}
            />
          }
          label="배송 정보 저장"
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
