import React, { FC, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useCurrentUser } from '../../Hooks/User'
import { MemoizedPoster } from '../Art/Poster'

const useStyles = makeStyles({
  posters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 252px)',
    gridGap: '18px',
    justifyContent: 'center',
    marginBottom: '32px',
    '@media (max-width: 823px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(157px, auto))',
      gridGap: '12px',
    },
  },
  posterContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '20px 0px 35px 0px',
    '@media (max-width: 823px)': {
      margin: '11px 0px 25px 0px',
    },
  },
  loadMoreButton: {
    fontWeight: 'bold',
  },
})

const USER_LIKING_ARTS = gql`
  query UserLikingArts($userId: ID!, $lastLikeId: ID) {
    userLikingArts(userId: $userId, lastLikeId: $lastLikeId) {
      id
      lastLikeId
      arts {
        id
        name
        saleStatus
        price
        width
        height
        representativeImageUrl
        artist {
          id
          artistName
        }
      }
    }
  }
`

const LikingArts: FC = () => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const userId = currentUser.id
  const [noMoreLikingArts, setNoMoreLikingArts] = useState<boolean>(false)
  const [lastLikeId, setLastLikeId] = useState<string | null>(null)

  const { data, fetchMore } = useQuery(USER_LIKING_ARTS, {
    variables: { userId, lastLikeId: null },
    onCompleted: (data) => {
      setLastLikeId(data.userLikingArts?.lastLikeId)
    },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }

  const handleLoadMore = () => {
    if (noMoreLikingArts) {
      alert('더 불러올 작품이 없습니다.')
      return
    }
    fetchMore({
      query: USER_LIKING_ARTS,
      variables: {
        userId,
        lastLikeId,
      },
      updateQuery: (previousResult: any, { fetchMoreResult }) => {
        const previousUserLikingArts = previousResult.userLikingArts
        const newArts = fetchMoreResult.userLikingArts.arts
        const newLastLikeId = fetchMoreResult.userLikingArts.lastLikeId

        if (newArts.length === 0) {
          alert('더 불러올 작품이 없습니다.')
          setNoMoreLikingArts(true)
        } else {
          setLastLikeId(newLastLikeId)
        }

        return newArts.length
          ? {
              userLikingArts: {
                id: userId,
                lastLikeId: newLastLikeId,
                arts: [...previousUserLikingArts.arts, ...newArts],
                __typename: previousUserLikingArts.__typename,
              },
            }
          : previousResult
      },
    })
  }

  return (
    <>
      {data.userLikingArts ? (
        <div className={classes.posterContainer}>
          <div className={classes.posters}>
            {data.userLikingArts.arts.map((art: any) => (
              <MemoizedPoster
                key={art.id}
                id={art.id}
                name={art.name}
                width={art.width}
                height={art.height}
                artistName={art.artist.artistName}
                saleStatus={art.saleStatus}
                price={art.price}
                representativeImageUrl={art.representativeImageUrl}
              />
            ))}
          </div>
          <Button className={classes.loadMoreButton} onClick={handleLoadMore}>
            더 보기
          </Button>
        </div>
      ) : (
        <p style={{ padding: '15px' }}>관심 작품이 없습니다.</p>
      )}
    </>
  )
}

export default LikingArts
