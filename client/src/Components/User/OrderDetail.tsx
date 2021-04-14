import React, { FC, ChangeEvent, useState } from 'react'
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

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    '& .MuiTypography-h6': {
      fontSize: '1rem',
    },
  },
  th: {
    color: theme.palette.greyFont.main,
    width: '40%',
    padding: '6px 6px 6px 0',
    fontSize: '0.929em',
    borderBottom: 'none',
    '@media (max-width: 823px)': {
      fontSize: '12px',
    },
  },
  td: {
    width: '60%',
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
  handleOpenDialog: (arg: boolean) => any
  orderId: number
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
    }
  }
`

const OrderDetail: FC<OrderDetailProps> = ({ openDialog, handleOpenDialog, orderId }) => {
  const classes = useStyles()
  const { data } = useQuery(ORDER, {
    variables: { orderId },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }
  const { order } = data

  const handleClose = () => {
    handleOpenDialog(false)
  }

  const handleJoinButton = async () => {}

  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="order-detail-dialog">
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
                가격
              </TableCell>
              <TableCell className={classes.td}>{currencyFormatter(order.price)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                상태
              </TableCell>
              <TableCell className={classes.td}>{translateOrderStatus(order.status)}</TableCell>
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
                전화 번호
              </TableCell>
              <TableCell className={classes.td}>{order.recipientPhone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.th} component="th" scope="row">
                배송지
              </TableCell>
              <TableCell className={classes.td}>{order.recipientAddress}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          주문 취소
        </Button>
        <Button onClick={handleClose} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OrderDetail
