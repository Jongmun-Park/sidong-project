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
  const [loadMoreArtist, { data: fetchedData, error: fetchError }] = useLazyQuery(ARTISTS)
  const [lastArtistId, setLastArtistId] = useState('')

  useEffect(() => {
    console.log('useEffect')
    if (fetchedData) {
      const fetchedArtists = fetchedData.artists
      setLastArtistId(fetchedArtists[fetchedArtists.length - 1].id)
    } else if (data) {
      setLastArtistId(artists[artists.length - 1].id)
    }
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

  const { artists } = data

  const handleLoadMore = () => {
    console.log('handleLoadMore')
    loadMoreArtist({
      variables: {
        lastArtistId: lastArtistId,
      },
    })
  }

  console.log('data:', data)
  console.log('lastArtistId:', lastArtistId)
  console.log('fetchedData:', fetchedData)

  return (
    <>
      <ArtistListPresenter artists={artists} handleLoadMore={handleLoadMore} />
    </>
  )
}

export default ArtistList
