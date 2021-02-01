import React, { FunctionComponent, useEffect, useState } from 'react'
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
  const [artists, setArtists] = useState<Array<any>>([])
  const [noMoreArtist, setNoMoreArtist] = useState<boolean>(false)
  const [loadMoreArtist, { data: fetchedData, error: fetchError }] = useLazyQuery(ARTISTS)
  const [lastArtistId, setLastArtistId] = useState('')

  useEffect(() => {
    if (fetchedData) {
      const fetchedArtists = fetchedData.artists
      if (fetchedArtists.length === 0) {
        alert('더 불러올 작가가 없습니다.')
        setNoMoreArtist(true)
      } else {
        setArtists([...artists, ...fetchedArtists])
        setLastArtistId(fetchedArtists[fetchedArtists.length - 1].id)
      }
    } else if (artists.length === 0 && data) {
      const { artists } = data
      setArtists(artists)
      setLastArtistId(artists[artists.length - 1].id)
    }
    // eslint-disable-next-line
  }, [data, fetchedData])

  if (!data) {
    return null
  }
  if (error) {
    console.error(error.message)
  }
  if (fetchError) {
    console.error(fetchError.message)
  }

  const handleLoadMore = () => {
    if (noMoreArtist) {
      alert('더 불러올 작가가 없습니다.')
      return
    }
    loadMoreArtist({
      variables: {
        lastArtistId: lastArtistId,
      },
    })
  }

  return (
    <>
      <ArtistListPresenter artists={artists} handleLoadMore={handleLoadMore} />
    </>
  )
}

export default ArtistList
