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
  Button,
} from '@material-ui/core'
import { currencyFormatter, translateSaleStatus } from '../../utils'
import { Art, SaleStatus } from '../../types'

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '630px',
    margin: '20px auto',
    '@media (max-width: 834px)': {
      marginTop: '10px',
    },
  },
  artInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  artSpec: {
    marginLeft: '20px',
    '@media (max-width: 834px)': {
      fontSize: '12px',
    },
  },
  artName: {
    display: 'inline-block',
    textDecoration: 'underline',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    maxWidth: '300px',
    '@media (max-width: 834px)': {
      maxWidth: '130px',
    },
  },
  image: {
    height: '90px',
    width: '90px',
    '@media (max-width: 834px)': {
      height: '68px',
      width: '68px',
    },
  },
  button: {
    '@media (max-width: 834px)': {
      fontSize: '12px',
    },
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
        representativeImageUrl
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
  const [totalCount, setTotalCount] = useState<number>(0)
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
      <TableContainer>
        <Table aria-label="나의 작품 목록" size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '75%' }} align="center">
                작품 정보
              </TableCell>
              <TableCell style={{ width: '25%' }} align="center">
                수정/삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arts &&
              arts.map((art: Art) => {
                return (
                  <TableRow hover tabIndex={-1} key={art.id}>
                    <TableCell className={classes.artInfo}>
                      <img
                        className={classes.image}
                        src={art.representativeImageUrl}
                        alt="작품 이미지"
                      />
                      <div className={classes.artSpec}>
                        <div>
                          [No.{art.id}] {art.createdAt}
                        </div>
                        <div
                          onClick={() => window.open(`/art/${art.id}`)}
                          className={classes.artName}
                        >
                          {art.name}
                        </div>
                        <div> {currencyFormatter(art.price)} </div>
                        <div> {translateSaleStatus(art.saleStatus)} </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {art.saleStatus !== SaleStatus.SOLD_OUT && (
                        <Button
                          className={classes.button}
                          size="small"
                          onClick={() => {
                            window.location.href = `/art/update/${art.id}`
                          }}
                        >
                          수 정
                        </Button>
                      )}
                      <Button
                        className={classes.button}
                        size="small"
                        onClick={() => handleDeleteButton(art.id)}
                      >
                        삭 제
                      </Button>
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
