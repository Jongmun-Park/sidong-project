import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp'
import { Order } from '../../types'
import MySaleListTableRow from './MySaleListTableRow'

const useStyles = makeStyles({
  root: {
    width: '100%',
    // marginTop: '20px',
    // '@media (max-width: 834px)': {
    //   marginTop: '10px',
    // },
  },
  container: {
    maxHeight: '470px',
  },
  downloadButton: {
    float: 'right',
    marginBottom: '15px',
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
      <Button
        className={classes.downloadButton}
        startIcon={<GetAppIcon />}
        variant="outlined"
        color="secondary"
        onClick={() => {
          window.location.href =
            'https://s3.ap-northeast-2.amazonaws.com/assets.storage.jakupsil.co.kr/sample/%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%91%E1%85%AE%E1%86%B7+%E1%84%87%E1%85%A9%E1%84%8C%E1%85%B3%E1%86%BC%E1%84%89%E1%85%A5+%E1%84%8B%E1%85%A3%E1%86%BC%E1%84%89%E1%85%B5%E1%86%A8.xlsx'
        }}
      >
        작품보증서 양식
      </Button>
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
