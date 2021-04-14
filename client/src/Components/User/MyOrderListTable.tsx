import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import { Order } from '../../types'
import MyOrderListTableRow from './MyOrderListTableRow'

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '20px',
    '@media (max-width: 823px)': {
      marginTop: '10px',
    },
  },
  container: {
    maxHeight: '470px',
  },
})

const ORDERS = gql`
  query Orders($page: Int, $pageSize: Int) {
    orders(page: $page, pageSize: $pageSize) {
      totalCount
      orders {
        id
        createdAt
        artName
        price
        status
        art {
          id
        }
      }
    }
  }
`

const MyOrderListTable: FC = () => {
  const classes = useStyles()
  const [page, setPage] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [orders, setOrders] = useState<Array<Order> | null>(null)

  const { data, refetch } = useQuery(ORDERS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setOrders(data.orders.orders)
      setTotalCount(data.orders.totalCount)
    },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }

  const handleChangePage = (e: unknown, newPage: number) => {
    refetch({ page: newPage })
    setPage(newPage)
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table aria-label="나의 작품 목록" size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: '20%' }}>
                주문일
              </TableCell>
              <TableCell align="center" style={{ width: '40%' }}>
                작품명
              </TableCell>
              <TableCell align="center" style={{ width: '20%' }}>
                가격
              </TableCell>
              <TableCell align="center" style={{ width: '20%' }}>
                상태
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.map((order: Order) => <MyOrderListTableRow key={order.id} order={order} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={totalCount}
        rowsPerPage={10}
        page={page}
        onChangePage={handleChangePage}
      />
    </Paper>
  )
}

export default MyOrderListTable
