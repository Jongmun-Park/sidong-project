import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery, useMutation } from '@apollo/react-hooks'
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
  IconButton,
} from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { currencyFormatter } from '../../utils'
import { Order } from '../../types'

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
  artName: {
    maxWidth: '160px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
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
        artist {
          id
          artistName
        }
        userinfo {
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

  //   const [deleteArt] = useMutation(DELETE_ART)
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
    // refetch({ page: newPage })
    // setPage(newPage)
  }

  const handleDeleteButton = async (artId: number) => {
    // if (window.confirm('정말로 삭제하시겠습니까?')) {
    //   const result = await deleteArt({
    //     variables: { artId },
    //   })
    //   if (result.data.deleteArt.success) {
    //     alert('작품 삭제가 완료됐습니다.')
    //     refetch({ page })
    //   } else {
    //     alert(result.data.deleteArt.msg)
    //   }
    // }
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table aria-label="나의 작품 목록" size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: '7%' }}>
                ID
              </TableCell>
              <TableCell align="center" style={{ width: '14%' }}>
                등록일
              </TableCell>
              <TableCell align="center" style={{ width: '40%', maxWidth: '160px' }}>
                작품명
              </TableCell>
              <TableCell align="center" style={{ width: '14%' }}>
                가격
              </TableCell>
              <TableCell align="center" style={{ width: '11%' }}>
                상태
              </TableCell>
              <TableCell align="center" style={{ width: '7%' }}>
                수정
              </TableCell>
              <TableCell align="center" style={{ width: '7%' }}>
                삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
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
