import React, { FC, useState } from 'react'
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
  console.log('artistListContainer rendered..')
  const [artists, setArtists] = useState<Array<any>>([])
  const [noMoreArtist, setNoMoreArtist] = useState<boolean>(false)
  const [lastArtistId, setLastArtistId] = useState<string>('')

  const { data } = useQuery(ARTISTS, {
    onCompleted: (data) => {
      const { artists } = data
      setArtists(artists)
      setLastArtistId(artists[artists.length - 1].id)
    },
    onError: (error) => {
      console.error(error.message)
    },
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
    onError: (error) => {
      console.log(error.message)
    },
  })

  if (!data) {
    return null
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
