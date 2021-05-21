import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableRow, TableCell, TableBody } from '@material-ui/core'
import { currencyFormatter } from '../../utils'
const useStyles = makeStyles((theme) => ({
  th: {
    color: theme.palette.greyFont.main,
    width: '60%',
    padding: '6px 6px 6px 0',
    fontSize: '0.929em',
    borderBottom: 'none',
    textAlign: 'right',
    '@media (max-width: 834px)': {
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
    '@media (max-width: 834px)': {
      fontSize: '12.4px',
    },
  },
}))

interface PriceInfoTableProps {
  artPrice: number
  deliveryFee: number
}

const PriceInfoTable: FC<PriceInfoTableProps> = ({ artPrice, deliveryFee }) => {
  const classes = useStyles()
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            작품 가격
          </TableCell>
          <TableCell className={classes.td}>{currencyFormatter(artPrice)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            배송비
          </TableCell>
          <TableCell className={classes.td}>{currencyFormatter(deliveryFee)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            총 금액
          </TableCell>
          <TableCell className={classes.td} style={{ fontWeight: 600 }}>
            {currencyFormatter(artPrice + deliveryFee)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default PriceInfoTable
