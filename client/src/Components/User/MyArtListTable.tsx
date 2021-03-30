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
import { currencyFormatter, translateSaleStatus } from '../../utils'
import { Art } from '../../types'

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

const DELETE_ART = gql`
  mutation DeleteArt($artId: ID!) {
    deleteArt(artId: $artId) {
      success
      msg
    }
  }
`

const MyArtListTable: FC = () => {
  const classes = useStyles()
  const [page, setPage] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(30)
  const [arts, setArts] = useState<Array<Art> | null>(null)

  const [deleteArt] = useMutation(DELETE_ART)
  const { data, refetch } = useQuery(CURRENT_USER_ARTS, {
    notifyOnNetworkStatusChange: true,
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

  const handleDeleteButton = async (artId: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const result = await deleteArt({
        variables: { artId },
      })
      if (result.data.deleteArt.success) {
        alert('작품 삭제가 완료됐습니다.')
        refetch({ page })
      } else {
        alert(result.data.deleteArt.msg)
      }
    }
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
          <TableBody>
            {arts &&
              arts.map((art: Art) => {
                return (
                  <TableRow hover tabIndex={-1} key={art.id}>
                    <TableCell align="center">{art.id}</TableCell>
                    <TableCell align="center">{art.createdAt}</TableCell>
                    <TableCell
                      onClick={() => window.open(`/art/${art.id}`)}
                      className={classes.artName}
                    >
                      {art.name}
                    </TableCell>
                    <TableCell align="center">{currencyFormatter(art.price)}</TableCell>
                    <TableCell align="center">{translateSaleStatus(art.saleStatus)}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => {
                          window.location.href = `/art/update/${art.id}`
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => handleDeleteButton(art.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
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
