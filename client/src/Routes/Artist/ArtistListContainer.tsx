import React, { FC, useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtistListPresenter from './ArtistListPresenter'

const ARTISTS = gql`
  query Artists($lastArtistId: ID, $pageSize: Int, $category: String, $residence: String) {
    artists(
      lastArtistId: $lastArtistId
      pageSize: $pageSize
      category: $category
      residence: $residence
    ) {
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
  const [artists, setArtists] = useState<Array<any>>([])
  const [noMoreArtist, setNoMoreArtist] = useState<boolean>(false)
  const [filters, setFilters] = useState<any>(null)
  const [lastArtistId, setLastArtistId] = useState<string>('')

  const { data } = useQuery(ARTISTS, {
    onCompleted: (data) => {
      const { artists } = data
      setArtists(artists)
      setLastArtistId(artists[artists.length - 1].id)
    },
    onError: (error) => console.error(error.message),
  })

  const [loadMoreArtist] = useLazyQuery(ARTISTS, {
    onCompleted: (data) => {
      const fetchedArtists = data.artists
      if (fetchedArtists.length === 0) {
        alert('더 불러올 작가가 없습니다.')
        setNoMoreArtist(true)
      } else {
        setArtists([...artists, ...fetchedArtists])
        setLastArtistId(fetchedArtists[fetchedArtists.length - 1].id)
      }
    },
    onError: (error) => console.error(error.message),
  })

  const [filterArtists] = useLazyQuery(ARTISTS, {
    onCompleted: (data) => {
      const filteredArtists = data.artists
      setArtists(filteredArtists)
      if (filteredArtists) {
        setLastArtistId(filteredArtists[filteredArtists.length - 1].id)
      }
    },
    onError: (error) => console.error(error.message),
  })

  useEffect(() => {
    if (filters) {
      filterArtists({
        variables: {
          category: filters.category,
          residence: filters.residence,
        },
      })
      setNoMoreArtist(false)
    }
  }, [filters, filterArtists])

  if (!data) {
    return null
  }

  const handleLoadMore = () => {
    if (noMoreArtist) {
      alert('더 불러올 작가가 없습니다.')
      return
    }
    if (!filters) {
      loadMoreArtist({
        variables: {
          lastArtistId,
        },
      })
    } else {
      loadMoreArtist({
        variables: {
          lastArtistId,
          category: filters.category,
          residence: filters.residence,
        },
      })
    }
  }

  return (
    <>
      <ArtistListPresenter
        artists={artists}
        setFilters={setFilters}
        handleLoadMore={handleLoadMore}
      />
    </>
  )
}

export default ArtistList
