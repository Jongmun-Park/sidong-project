import React, { FC, useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtListPresenter from './ArtListPresenter'

const ARTS = gql`
  query(
    $lastArtId: ID
    $pageSize: Int
    $saleStatus: SaleStatusInput
    $orientation: OrientationInput
    $size: ArtSizeInput
    $price: [Int]
    $medium: String
    $style: String
    $technique: String
    $theme: String
  ) {
    arts(
      lastArtId: $lastArtId
      pageSize: $pageSize
      saleStatus: $saleStatus
      orientation: $orientation
      size: $size
      price: $price
      medium: $medium
      style: $style
      technique: $technique
      theme: $theme
    ) {
      id
      name
      saleStatus
      price
      width
      height
      representativeImageUrl
      currentUserLikesThis
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
  const [filters, setFilters] = useState<any>(null)
  const [lastArtId, setLastArtId] = useState<string>('')

  const { data } = useQuery(ARTS, {
    onCompleted: (data) => {
      const { arts } = data
      setArts(arts)
      if (arts) {
        setLastArtId(arts[arts.length - 1].id)
      }
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

  const [filterArts] = useLazyQuery(ARTS, {
    onCompleted: (data) => {
      const filteredArts = data.arts
      setArts(filteredArts)
      if (filteredArts) {
        setLastArtId(filteredArts[filteredArts.length - 1].id)
      }
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  useEffect(() => {
    if (filters) {
      filterArts({
        variables: {
          saleStatus: filters.saleStatus,
          orientation: filters.orientation,
          size: filters.size,
          price: filters.price,
          medium: filters.medium,
          style: filters.style,
          technique: filters.technique,
          theme: filters.theme,
        },
      })
      setNoMoreArts(false)
    }
  }, [filters, filterArts])

  if (!data) {
    return null
  }

  const handleLoadMore = () => {
    if (noMoreArts) {
      alert('더 불러올 작품이 없습니다.')
      return
    }
    if (!filters) {
      loadMoreArts({
        variables: {
          lastArtId,
        },
      })
    } else {
      loadMoreArts({
        variables: {
          lastArtId,
          saleStatus: filters.saleStatus,
          orientation: filters.orientation,
          size: filters.size,
          price: filters.price,
          medium: filters.medium,
          style: filters.style,
          technique: filters.technique,
          theme: filters.theme,
        },
      })
    }
  }

  return <ArtListPresenter arts={arts} setFilters={setFilters} handleLoadMore={handleLoadMore} />
}

export default ArtList
