import React, { FC, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtListPresenter from './ArtListPresenter'

const ARTS = gql`
  query($lastArtId: ID, $pageSize: Int) {
    arts(lastArtId: $lastArtId, pageSize: $pageSize) {
      id
      name
      saleStatus
      price
      width
      height
      images
      artist {
        id
        artistName
      }
    }
  }
`

const ArtList: FC = () => {
  const [arts, setArts] = useState<Array<any>>([])
  const [noMoreArts, setNoMoreArts] = useState<boolean>(false)
  const [lastArtId, setLastArtId] = useState<string>('')

  const { data } = useQuery(ARTS, {
    onCompleted: (data) => {
      const { arts } = data
      setArts(arts)
      setLastArtId(arts[arts.length - 1].id)
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  const [loadMoreArts] = useLazyQuery(ARTS, {
    onCompleted: (data) => {
      const fetchedArts = data.arts
      if (fetchedArts.length === 0) {
        alert('더 불러올 작품이 없습니다.')
        setNoMoreArts(true)
      } else {
        setArts([...arts, ...fetchedArts])
        setLastArtId(fetchedArts[fetchedArts.length - 1].id)
      }
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  if (!data) {
    return null
  }

  const handleLoadMore = () => {
    if (noMoreArts) {
      alert('더 불러올 작품이 없습니다.')
      return
    }
    loadMoreArts({
      variables: {
        lastArtId: lastArtId,
      },
    })
  }
  console.log(data)

  return <ArtListPresenter arts={arts} handleLoadMore={handleLoadMore} />
}

export default ArtList
