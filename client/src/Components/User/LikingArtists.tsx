import React, { FC, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useCurrentUser } from '../../Hooks/User'
import { MemoizedPoster } from '../Artist/Poster'

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
    margin: '23px 0px 35px 0px',
    '@media (max-width: 823px)': {
      margin: '11px 0px 25px 0px',
    },
  },
  loadMoreButton: {
    fontWeight: 'bold',
  },
})

const USER_LIKING_ARTISTS = gql`
  query UserLikingArtists($userId: ID!, $lastLikeId: ID) {
    userLikingArtists(userId: $userId, lastLikeId: $lastLikeId) {
      id
      lastLikeId
      artists {
        id
        artistName
        realName
        category
        thumbnail {
          id
          url
        }
        representativeWork {
          id
          url
        }
      }
    }
  }
`

const LikingArtists: FC = () => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const userId = currentUser.id
  const [noMoreLikingArtists, setNoMoreLikingArtists] = useState<boolean>(false)
  const [lastLikeId, setLastLikeId] = useState<string | null>(null)

  const { data, fetchMore } = useQuery(USER_LIKING_ARTISTS, {
    variables: { userId, lastLikeId: null },
    onCompleted: (data) => {
      setLastLikeId(data.userLikingArtists.lastLikeId)
    },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }

  const handleLoadMore = () => {
    if (noMoreLikingArtists) {
      alert('더 불러올 작가가 없습니다.')
      return
    }
    fetchMore({
      query: USER_LIKING_ARTISTS,
      variables: {
        userId,
        lastLikeId,
      },
      updateQuery: (previousResult: any, { fetchMoreResult }) => {
        const previousUserLikingArtists = previousResult.userLikingArtists
        const newArtists = fetchMoreResult.userLikingArtists.artists
        const newLastLikeId = fetchMoreResult.userLikingArtists.lastLikeId

        if (newArtists.length === 0) {
          alert('더 불러올 작가가 없습니다.')
          setNoMoreLikingArtists(true)
        } else {
          setLastLikeId(newLastLikeId)
        }

        return newArtists.length
          ? {
              userLikingArtists: {
                id: userId,
                lastLikeId: newLastLikeId,
                artists: [...previousUserLikingArtists.artists, ...newArtists],
                __typename: previousUserLikingArtists.__typename,
              },
            }
          : previousResult
      },
    })
  }

  return (
    <>
      {data ? (
        <div className={classes.posterContainer}>
          <div className={classes.posters}>
            {data.userLikingArtists.artists.map((artist: any) => (
              <MemoizedPoster
                key={artist.id}
                id={artist.id}
                artistName={artist.artistName}
                realName={artist.realName}
                category={artist.category}
                thumbnailUrl={artist.thumbnail.url}
                representativeWorkUrl={artist.representativeWork.url}
              />
            ))}
          </div>
          <Button className={classes.loadMoreButton} onClick={handleLoadMore}>
            더 보기
          </Button>
        </div>
      ) : (
        <p style={{ padding: '15px' }}>좋아요한 작가가 없습니다.</p>
      )}
    </>
  )
}

export default LikingArtists
