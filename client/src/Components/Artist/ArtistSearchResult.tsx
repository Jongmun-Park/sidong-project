import React, { FC, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { MemoizedPoster } from '../Artist/Poster'
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

const SEARCH_ARTISTS = gql`
  query SearchArtists($word: String!, $lastId: ID) {
    searchArtists(word: $word, lastId: $lastId) {
      lastId
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

interface ArtistSearchResultProps {
  word: String | null
}

const ArtistSearchResult: FC<ArtistSearchResultProps> = ({ word }) => {
  const classes = useStyles()
  const [noMoreArtists, setNoMoreArtists] = useState<boolean>(false)
  const [lastArtistId, setLastArtistId] = useState<string | null>(null)

  const { data, fetchMore } = useQuery(SEARCH_ARTISTS, {
    variables: { word, lastId: null },
    onCompleted: (data) => {
      setLastArtistId(data.searchArtists?.lastId)
    },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }

  const handleLoadMore = () => {
    if (noMoreArtists) {
      alert('더 불러올 작가는 없습니다.')
      return
    }
    fetchMore({
      query: SEARCH_ARTISTS,
      variables: {
        word,
        lastId: lastArtistId,
      },
      updateQuery: (previousResult: any, { fetchMoreResult }) => {
        const previousSearchArtists = previousResult.searchArtists
        const newArtists = fetchMoreResult.searchArtists.artists
        const newLastArtistId = fetchMoreResult.searchArtists.lastId

        if (newArtists.length === 0) {
          alert('더 불러올 작가는 없습니다.')
          setNoMoreArtists(true)
        } else {
          setLastArtistId(newLastArtistId)
        }

        return newArtists.length
          ? {
              searchArtists: {
                lastId: newLastArtistId,
                artists: [...previousSearchArtists.artists, ...newArtists],
                __typename: previousSearchArtists.__typename,
              },
            }
          : previousResult
      },
    })
  }

  return (
    <>
      {data.searchArtists ? (
        <div className={classes.posterContainer}>
          <div className={classes.posters}>
            {data.searchArtists.artists.map((artist: any) => (
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
          {data.searchArtists.artists.length >= 20 && <LoadMoreButton onClick={handleLoadMore} />}
        </div>
      ) : (
        <p style={{ padding: '15px' }}>검색어가 포함된 작가가 없습니다.</p>
      )}
    </>
  )
}

export default ArtistSearchResult
