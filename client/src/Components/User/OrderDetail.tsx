import React, { FC } from 'react'
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
} from '@material-ui/core'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { currencyFormatter, translateOrderStatus } from '../../utils'
import { OrderStatus } from '../../types'

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    '& .MuiTypography-h6': {
      fontSize: '1rem',
    },
  },
  th: {
    color: theme.palette.greyFont.main,
    width: '23%',
    padding: '6px',
    fontSize: '0.929em',
    borderBottom: 'none',
    '@media (max-width: 823px)': {
      fontSize: '12px',
    },
  },
  td: {
    width: '77%',
    padding: '6px',
    fontSize: '1em',
    fontWeight: 600,
    borderBottom: 'none',
    '@media (max-width: 823px)': {
      fontSize: '12.4px',
    },
  },
}))

interface OrderDetailProps {
  openDialog: boolean
  handleOpenDialog: (arg: boolean) => void
  orderId: number
  page: number
  refetchOrders: (variables: { page: number }) => void
}

const ORDER = gql`
  query Order($orderId: ID!) {
    order(orderId: $orderId) {
      id
      recipientName
      recipientPhone
      recipientAddress
      deliveryCompany
      deliveryNumber
      artName
      price
      status
      createdAt
      art {
        id
      }
      artist {
        id
        realName
        phone
      }
    }
  }
`

const CANCEL_ORDER = gql`
  mutation CancelOrder($orderId: ID!) {
    cancelOrder(orderId: $orderId) {
      success
      msg
    }
  }
`

const COMPLETE_ORDER = gql`
  mutation CompleteOrder($orderId: ID!) {
    completeOrder(orderId: $orderId) {
      success
      msg
    }
  }
`

const OrderDetail: FC<OrderDetailProps> = ({
  openDialog,
  handleOpenDialog,
  orderId,
  page,
  refetchOrders,
}) => {
  const classes = useStyles()
  const { data } = useQuery(ORDER, {
    variables: { orderId },
    onError: (error) => console.error(error.message),
  })
  const [cancelOrder] = useMutation(CANCEL_ORDER)
  const [completeOrder] = useMutation(COMPLETE_ORDER)

  if (!data) {
    return null
  }
  const { order } = data

  const handleClose = () => {
    handleOpenDialog(false)
  }

  const handleCancelOrder = async (orderId: number) => {
    if (window.confirm('정말로 취소하시겠습니까?')) {
      const result = await cancelOrder({ variables: { orderId } })
      if (result.data.cancelOrder.success) {
        alert('주문 취소가 완료됐습니다.')
        refetchOrders({ page })
      } else {
        alert(result.data.cancelOrder.msg)
      }
    }
  }

  const handleCompleteOrder = async (orderId: number) => {
    if (window.confirm('구매를 확정하시겠습니까?')) {
      const result = await completeOrder({ variables: { orderId } })
      if (result.data.completeOrder.success) {
        alert('구매가 확정됐습니다.')
        refetchOrders({ page })
      } else {
        alert(result.data.completeOrder.msg)
      }
    }
  }

  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="order-detail-dialog" fullWidth>
      <DialogTitle className={classes.dialogTitle} id="order-detail-dialog">
        주문 상세 정보
      </DialogTitle>
      <DialogContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                주문 번호
              </TableCell>
              <TableCell className={classes.td}>{order.id}</TableCell>
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
                작가명
              </TableCell>
              <TableCell className={classes.td} style={{ color: '#0070b8' }}>
                {order.artist.realName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                연락처
              </TableCell>
              <TableCell className={classes.td} style={{ color: '#0070b8' }}>
                {order.artist.phone}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                가격
              </TableCell>
              <TableCell className={classes.td}>{currencyFormatter(order.price)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                상태
              </TableCell>
              <TableCell className={classes.td} style={{ color: 'crimson' }}>
                {translateOrderStatus(order.status)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                주문일
              </TableCell>
              <TableCell className={classes.td}>{order.createdAt}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                받는 이
              </TableCell>
              <TableCell className={classes.td}>{order.recipientName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                연락처
              </TableCell>
              <TableCell className={classes.td}>{order.recipientPhone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                배송지
              </TableCell>
              <TableCell className={classes.td}>{order.recipientAddress}</TableCell>
            </TableRow>
            {order.deliveryCompany && (
              <>
                <TableRow>
                  <TableCell className={classes.th} component="th" scope="row">
                    <span style={{ backgroundColor: 'antiquewhite' }}>택배 회사</span>
                  </TableCell>
                  <TableCell className={classes.td}>{order.deliveryCompany}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.th} component="th" scope="row">
                    <span style={{ backgroundColor: 'antiquewhite' }}>송장 번호</span>
                  </TableCell>
                  <TableCell className={classes.td}>{order.deliveryNumber}</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        {order.status !== OrderStatus.CANCEL && order.status < OrderStatus.ON_DELIVERY && (
          <Button onClick={() => handleCancelOrder(order.id)} color="secondary">
            주문 취소
          </Button>
        )}
        {(order.status === OrderStatus.ON_DELIVERY ||
          order.status === OrderStatus.DELIVERY_COMPLETED) && (
          <Button onClick={() => handleCompleteOrder(order.id)} color="secondary">
            구매 확정
          </Button>
        )}
        <Button onClick={handleClose} color="primary">
          확 인
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OrderDetail
