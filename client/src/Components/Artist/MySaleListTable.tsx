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
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { Order } from '../../types'
import MySaleListTableRow from './MySaleListTableRow'
import AccountInfo from './AccountInfo'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '470px',
  },
  button: {
    float: 'right',
    margin: '15px',
    '@media (max-width: 414px)': {
      margin: '9px',
    },
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
  const [openAccountInfo, setOpenAccountInfo] = useState<boolean>(false)
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
    <>
      <Paper className={classes.root}>
        <Button
          className={classes.button}
          startIcon={<AttachMoneyIcon />}
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => {
            setOpenAccountInfo(true)
          }}
        >
          정산 계좌 관리
        </Button>
        <Button
          className={classes.button}
          startIcon={<GetAppIcon />}
          variant="outlined"
          color="default"
          size="small"
          onClick={() => {
            window.location.href =
              'https://s3.ap-northeast-2.amazonaws.com/assets.storage.jakupsil.co.kr/sample/Certificate_Form(Jakupteo).xlsx'
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
                  <MySaleListTableRow
                    key={sale.id}
                    sale={sale}
                    page={page}
                    refetchSales={refetch}
                  />
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
      {openAccountInfo && (
        <AccountInfo openDialog={openAccountInfo} handleOpenDialog={setOpenAccountInfo} />
      )}
    </>
  )
}

export default MySaleListTable
