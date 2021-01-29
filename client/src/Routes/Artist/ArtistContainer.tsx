import React, { FunctionComponent } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtistPresenter from './ArtistPresenter'
import { Button } from '@material-ui/core'

const ARTISTS = gql`
  query($lastArtistId: ID, $pageSize: Int) {
    artists(lastArtistId: $lastArtistId, pageSize: $pageSize) {
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
`

const Artist: FunctionComponent = () => {
  const { data, error } = useQuery(ARTISTS)
  const [loadMoreArtist, { data: newData, error: newError }] = useLazyQuery(ARTISTS)
  const handleLoadMore = () => {
    console.log('handleLoadMore')
    loadMoreArtist({
      variables: {
        lastArtistId: 11,
      },
    })
  }

  if (!data) {
    return null
  }
  if (error) {
    console.error(error.message)
  }
  const { artists } = data

  return (
    <>
      <ArtistPresenter artists={artists} />
      <Button onClick={handleLoadMore}>더 보기</Button>
    </>
  )
}

export default Artist
