import React, { FC, useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtistListPresenter from './ArtistListPresenter'

const ARTISTS = gql`
  query Artists($page: Int, $category: String, $residence: String, $orderingPriority: [String]) {
    artists(
      page: $page
      category: $category
      residence: $residence
      orderingPriority: $orderingPriority
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
  const [page, setPage] = useState<number>(0)

  const { data } = useQuery(ARTISTS, {
    onCompleted: (data) => {
      const { artists } = data
      setArtists(artists)
      if (artists) {
        setPage(1)
      }
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
        setPage(page + 1)
      }
    },
    onError: (error) => console.error(error.message),
  })

  const [filterArtists] = useLazyQuery(ARTISTS, {
    onCompleted: (data) => {
      const filteredArtists = data.artists
      setArtists(filteredArtists)
      if (filteredArtists) {
        setPage(1)
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
          orderingPriority: filters.orderingPriority,
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
          page,
        },
      })
    } else {
      loadMoreArtist({
        variables: {
          page,
          category: filters.category,
          residence: filters.residence,
          orderingPriority: filters.orderingPriority,
        },
      })
    }
  }

  return (
    <>
      <ArtistListPresenter
        artists={artists}
        filters={filters}
        setFilters={setFilters}
        handleLoadMore={handleLoadMore}
      />
    </>
  )
}

export default ArtistList
