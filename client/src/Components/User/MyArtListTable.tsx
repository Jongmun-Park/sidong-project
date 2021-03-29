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
import { currencyFormatter, translateSaleStatus } from '../../utils'
import { Art } from '../../types'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
})

const CURRENT_USER_ARTS = gql`
  query CurrentUserArtsOffsetBased($page: Int, $pageSize: Int) {
    currentUserArtsOffsetBased(page: $page, pageSize: $pageSize) {
      totalCount
      arts {
        id
        createdAt
        name
        saleStatus
        price
      }
    }
  }
`

const MyArtListTable: FC = () => {
  const classes = useStyles()
  const [page, setPage] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(30)
  const [arts, setArts] = useState<Array<Art> | null>(null)

  const { data, refetch } = useQuery(CURRENT_USER_ARTS, {
    onCompleted: (data) => {
      setArts(data.currentUserArtsOffsetBased.arts)
      setTotalCount(data.currentUserArtsOffsetBased.totalCount)
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
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">등록일</TableCell>
              <TableCell align="center">작품명</TableCell>
              <TableCell align="center">가격</TableCell>
              <TableCell align="center">판매 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arts &&
              arts.map((art: Art) => {
                return (
                  <TableRow hover tabIndex={-1} key={art.id}>
                    <TableCell>{art.id}</TableCell>
                    <TableCell>{art.createdAt}</TableCell>
                    <TableCell>{art.name}</TableCell>
                    <TableCell>{currencyFormatter(art.price)}</TableCell>
                    <TableCell>{translateSaleStatus(art.saleStatus)}</TableCell>
                  </TableRow>
                )
              })}
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

export default MyArtListTable
