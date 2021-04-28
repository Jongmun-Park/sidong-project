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
import MySaleListTableRow from './MySaleListTableRow'

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '20px',
    '@media (max-width: 834px)': {
      marginTop: '10px',
    },
  },
  container: {
    maxHeight: '470px',
  },
})

const SALES = gql`
  query Sales($page: Int, $pageSize: Int) {
    sales(page: $page, pageSize: $pageSize) {
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

const MySaleListTable: FC = () => {
  const classes = useStyles()
  const [page, setPage] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [sales, setSales] = useState<Array<Order> | null>(null)

  const { data, refetch } = useQuery(SALES, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setSales(data.sales.orders)
      setTotalCount(data.sales.totalCount)
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
        <Table aria-label="나의 판매 목록" size="small" stickyHeader>
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
            {sales &&
              sales.map((sale: Order) => (
                <MySaleListTableRow key={sale.id} sale={sale} page={page} refetchSales={refetch} />
              ))}
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

export default MySaleListTable
