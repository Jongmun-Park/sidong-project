import React, { FC, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { MemoizedPoster } from '../Art/Poster'
import LoadMoreButton from '../LoadMoreButton'

const useStyles = makeStyles((theme) => ({
  posters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 252px)',
    gridGap: '18px',
    justifyContent: 'center',
    marginBottom: '32px',
    '@media (max-width: 834px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(157px, auto))',
      gridGap: '12px',
    },
  },
  posterContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '20px 0px 35px 0px',
    '@media (max-width: 834px)': {
      margin: '11px 0px 25px 0px',
    },
  },
}))

const SEARCH_ARTS = gql`
  query SearchArts($word: String!, $lastId: ID) {
    searchArts(word: $word, lastId: $lastId) {
      lastId
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

interface ArtSearchResultProps {
  word: String | null
}

const ArtSearchResult: FC<ArtSearchResultProps> = ({ word }) => {
  const classes = useStyles()
  const [noMoreArts, setNoMoreArts] = useState<boolean>(false)
  const [lastArtId, setLastArtId] = useState<string | null>(null)

  const { data, fetchMore } = useQuery(SEARCH_ARTS, {
    variables: { word, lastId: null },
    onCompleted: (data) => {
      setLastArtId(data.searchArts?.lastId)
    },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }

  const handleLoadMore = () => {
    if (noMoreArts) {
      alert('더 불러올 작품이 없습니다.')
      return
    }
    fetchMore({
      query: SEARCH_ARTS,
      variables: {
        word,
        lastId: lastArtId,
      },
      updateQuery: (previousResult: any, { fetchMoreResult }) => {
        const previousSearchArts = previousResult.searchArts
        const newArts = fetchMoreResult.searchArts.arts
        const newLastArtId = fetchMoreResult.searchArts.lastId

        if (newArts.length === 0) {
          alert('더 불러올 작품이 없습니다.')
          setNoMoreArts(true)
        } else {
          setLastArtId(newLastArtId)
        }

        return newArts.length
          ? {
              searchArts: {
                lastId: newLastArtId,
                arts: [...previousSearchArts.arts, ...newArts],
                __typename: previousSearchArts.__typename,
              },
            }
          : previousResult
      },
    })
  }

  return (
    <>
      {data.searchArts ? (
        <div className={classes.posterContainer}>
          <div className={classes.posters}>
            {data.searchArts.arts.map((art: any) => (
              <MemoizedPoster
                key={art.id}
                id={art.id}
                artistId={art.artist.id}
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
          {data.searchArts.arts.length >= 20 && <LoadMoreButton onClick={handleLoadMore} />}
        </div>
      ) : (
        <p style={{ padding: '15px' }}>검색어가 포함된 작품이 없습니다.</p>
      )}
    </>
  )
}

export default ArtSearchResult
