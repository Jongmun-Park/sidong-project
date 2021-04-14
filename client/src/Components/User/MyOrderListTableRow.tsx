import React, { FC, useState } from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { currencyFormatter, translateOrderStatus } from '../../utils'
import { Order } from '../../types'
import OrderDetail from './OrderDetail'

const useStyles = makeStyles({
  artName: {
    textDecoration: 'underline',
    maxWidth: '160px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
  },
})

const MyOrderListTableRow: FC<{ order: Order }> = ({ order }) => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <TableRow hover tabIndex={-1} key={order.id}>
        <TableCell align="center">{order.createdAt}</TableCell>
        <TableCell onClick={() => setOpenDialog(true)} className={classes.artName}>
          {order.artName}
        </TableCell>
        <TableCell align="center">{currencyFormatter(order.price)}</TableCell>
        <TableCell align="center">{translateOrderStatus(order.status)}</TableCell>
      </TableRow>
      {openDialog && (
        <OrderDetail openDialog={openDialog} handleOpenDialog={setOpenDialog} orderId={order.id} />
      )}
    </>
  )
}

export default MyOrderListTableRow
