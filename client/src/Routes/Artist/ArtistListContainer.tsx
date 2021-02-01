import React, { FunctionComponent } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtistListPresenter from './ArtistListPresenter'

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

const ArtistList: FunctionComponent = () => {
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
      <ArtistListPresenter artists={artists} handleLoadMore={handleLoadMore} />
    </>
  )
}

export default ArtistList
