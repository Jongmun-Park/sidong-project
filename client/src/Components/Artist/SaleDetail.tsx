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
    '@media (max-width: 823px)': {
      fontSize: '12px',
    },
  },
  td: {
    width: '73%',
    padding: '6px',
    fontSize: '1em',
    fontWeight: 600,
    borderBottom: 'none',
    '@media (max-width: 823px)': {
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

  const handleCancelOrder = async (orderId: number) => {
    // if (window.confirm('정말로 취소하시겠습니까?')) {
    //   const result = await cancelOrder({ variables: { orderId } })
    //   if (result.data.cancelOrder.success) {
    //     alert('주문 취소가 완료됐습니다.')
    //     refetchSales({ page })
    //   } else {
    //     alert(result.data.cancelOrder.msg)
    //   }
    // }
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
        <Button onClick={() => handleCancelOrder(order.id)} color="primary">
          수정
        </Button>
        <Button onClick={handleClose} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SaleDetail
