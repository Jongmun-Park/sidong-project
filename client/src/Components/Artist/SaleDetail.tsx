import React, { ChangeEvent, FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from '@material-ui/core'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { currencyFormatter } from '../../utils'
import { OrderStatus } from '../../types'

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    '& .MuiTypography-h6': {
      fontSize: '1rem',
    },
  },
  th: {
    color: theme.palette.greyFont.main,
    width: '27%',
    padding: '6px',
    fontSize: '0.929em',
    borderBottom: 'none',
    '@media (max-width: 834px)': {
      fontSize: '12px',
    },
  },
  td: {
    width: '73%',
    padding: '6px',
    fontSize: '1em',
    fontWeight: 600,
    borderBottom: 'none',
    '@media (max-width: 834px)': {
      fontSize: '12.4px',
    },
  },
}))

interface SaleDetailProps {
  openDialog: boolean
  handleOpenDialog: (arg: boolean) => void
  orderId: number
  page: number
  refetchSales: (variables: { page: number }) => void
}

const ORDER = gql`
  query Order($orderId: ID!) {
    order(orderId: $orderId) {
      id
      recipientName
      recipientPhone
      recipientAddress
      artName
      price
      status
      createdAt
      art {
        id
      }
      userinfo {
        id
        name
        phone
      }
      deliveryCompany
      deliveryNumber
    }
  }
`

const UPDATE_ORDER = gql`
  mutation UpdateOrder(
    $deliveryCompany: String
    $deliveryNumber: String
    $orderId: ID!
    $status: Int!
  ) {
    updateOrder(
      deliveryCompany: $deliveryCompany
      deliveryNumber: $deliveryNumber
      orderId: $orderId
      status: $status
    ) {
      success
      msg
    }
  }
`

const SaleDetail: FC<SaleDetailProps> = ({
  openDialog,
  handleOpenDialog,
  orderId,
  page,
  refetchSales,
}) => {
  const classes = useStyles()
  const [status, setStatus] = useState<string>('')
  const [deliveryCompany, setDeliveryCompany] = useState<string>('')
  const [deliveryNumber, setDeliveryNumber] = useState<string>('')
  const [updateOrder] = useMutation(UPDATE_ORDER)
  const { data, refetch } = useQuery(ORDER, {
    variables: { orderId },
    onCompleted: (data) => {
      setStatus(data.order.status)
      setDeliveryCompany(data.order.deliveryCompany ? data.order.deliveryCompany : '')
      setDeliveryNumber(data.order.deliveryNumber ? data.order.deliveryNumber : '')
    },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }
  const { order } = data

  const handleClose = () => {
    handleOpenDialog(false)
  }

  const handleSave = async (orderId: number) => {
    if (window.confirm('새로 저장하시겠습니까?')) {
      const result = await updateOrder({
        variables: {
          orderId,
          status,
          deliveryCompany,
          deliveryNumber,
        },
      })
      if (result.data.updateOrder.success) {
        alert('주문을 새로 저장했습니다.')
        refetch()
        refetchSales({ page })
      } else {
        alert(result.data.updateOrder.msg)
      }
    }
  }

  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="order-detail-dialog" fullWidth>
      <DialogTitle className={classes.dialogTitle} id="order-detail-dialog">
        판매 상세 정보
      </DialogTitle>
      <DialogContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                작품 번호
              </TableCell>
              <TableCell className={classes.td}>{order.art.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                작품명
              </TableCell>
              <TableCell
                onClick={() => {
                  window.open(`/art/${order.art.id}`)
                }}
                className={classes.td}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                {order.artName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                가격
              </TableCell>
              <TableCell className={classes.td}>{currencyFormatter(order.price)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={classes.th}
                style={{ color: 'crimson' }}
                component="th"
                scope="row"
              >
                상태
              </TableCell>
              <TableCell className={classes.td}>
                <select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setStatus(e.target.value)
                  }}
                  defaultValue={order.status}
                >
                  <option disabled value={OrderStatus.CANCEL}>
                    주문 취소
                  </option>
                  <option disabled value={OrderStatus.WAIT}>
                    결제 대기
                  </option>
                  <option disabled value={OrderStatus.FAIL}>
                    결제 실패
                  </option>
                  <option disabled value={OrderStatus.SUCCESS}>
                    결제 완료
                  </option>
                  <option value={OrderStatus.PREPARE_DELIVERY}>배송 준비중</option>
                  <option value={OrderStatus.ON_DELIVERY}>배송 중</option>
                  <option value={OrderStatus.DELIVERY_COMPLETED}>배송 완료</option>
                  <option disabled value={OrderStatus.REFUND}>
                    환불 요청
                  </option>
                  <option disabled value={OrderStatus.REFUND_COMPLETED}>
                    환불 완료
                  </option>
                  <option disabled value={OrderStatus.COMPLETED}>
                    구매 확정
                  </option>
                </select>
              </TableCell>
            </TableRow>
            {Number(status) >= OrderStatus.ON_DELIVERY && (
              <>
                <TableRow>
                  <TableCell className={classes.th} component="th" scope="row">
                    택배 회사명
                  </TableCell>
                  <TableCell className={classes.td}>
                    <TextField
                      autoFocus
                      margin="dense"
                      value={deliveryCompany}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setDeliveryCompany(e.target.value)
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.th} component="th" scope="row">
                    송장 번호
                  </TableCell>
                  <TableCell className={classes.td}>
                    <TextField
                      margin="dense"
                      value={deliveryNumber}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setDeliveryNumber(e.target.value)
                      }}
                      fullWidth
                      multiline
                    />
                  </TableCell>
                </TableRow>
              </>
            )}
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                주문 번호
              </TableCell>
              <TableCell className={classes.td}>{order.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                주문일
              </TableCell>
              <TableCell className={classes.td}>{order.createdAt}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                주문자
              </TableCell>
              <TableCell className={classes.td}>{order.userinfo.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                주문자 전화
              </TableCell>
              <TableCell className={classes.td}>{order.userinfo.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                <span style={{ backgroundColor: 'antiquewhite' }}>받는 이</span>
              </TableCell>
              <TableCell className={classes.td}>{order.recipientName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                <span style={{ backgroundColor: 'antiquewhite' }}>받는 이 전화</span>
              </TableCell>
              <TableCell className={classes.td}>{order.recipientPhone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                <span style={{ backgroundColor: 'antiquewhite' }}>배송지</span>
              </TableCell>
              <TableCell className={classes.td}>{order.recipientAddress}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSave(order.id)} color="secondary">
          저 장
        </Button>
        <Button onClick={handleClose} color="primary">
          확 인
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SaleDetail
