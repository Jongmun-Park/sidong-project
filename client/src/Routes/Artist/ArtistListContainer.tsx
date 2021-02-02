import React, { FC, useEffect, useState } from 'react'
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

const ArtistList: FC = () => {
  const { data, error } = useQuery(ARTISTS)
  const [
    loadMoreArtist,
    { data: fetchedData, error: fetchError, loading: fetchLoading },
  ] = useLazyQuery(ARTISTS)

  const [artists, setArtists] = useState<Array<any>>([])
  const [noMoreArtist, setNoMoreArtist] = useState<boolean>(false)
  const [lastArtistId, setLastArtistId] = useState<string>('')

  useEffect(() => {
    if (data) {
      const { artists } = data
      setArtists(artists)
      setLastArtistId(artists[artists.length - 1].id)
    }
  }, [data])

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
    }
    // eslint-disable-next-line
  }, [fetchLoading])

  if (!data) {
    return null
  }
  if (error) {
    console.error(error.message)
  }
  if (fetchError) {
    console.error(fetchError.message)
  }

  const handleLoadMore = async () => {
    if (noMoreArtist) {
      alert('더 불러올 작가가 없습니다.')
      return
    }
    await loadMoreArtist({
      variables: {
        lastArtistId: lastArtistId,
      },
    })
  }
  console.log('artistListContainer rendered..')
  return (
    <>
      <ArtistListPresenter artists={artists} handleLoadMore={handleLoadMore} />
    </>
  )
}

export default ArtistList
