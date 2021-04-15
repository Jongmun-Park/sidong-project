import React, { FC, useState } from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { currencyFormatter, translateOrderStatus } from '../../utils'
import { Order } from '../../types'
import SaleDetail from './SaleDetail'

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

interface MySaleListTableRowProps {
  sale: Order
  page: number
  refetchSales: (variables: { page: number }) => void
}

const MySaleListTableRow: FC<MySaleListTableRowProps> = ({ sale, page, refetchSales }) => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <TableRow hover tabIndex={-1} key={sale.id}>
        <TableCell align="center">{sale.createdAt}</TableCell>
        <TableCell onClick={() => setOpenDialog(true)} className={classes.artName}>
          {sale.artName}
        </TableCell>
        <TableCell align="center">{currencyFormatter(sale.price)}</TableCell>
        <TableCell align="center">{translateOrderStatus(sale.status)}</TableCell>
      </TableRow>
      {openDialog && (
        <SaleDetail
          openDialog={openDialog}
          handleOpenDialog={setOpenDialog}
          orderId={sale.id}
          page={page}
          refetchSales={refetchSales}
        />
      )}
    </>
  )
}

export default MySaleListTableRow
