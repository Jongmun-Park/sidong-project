import React, { FC, useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtListPresenter from './ArtListPresenter'

const ARTS = gql`
  query Arts(
    $page: Int
    $saleStatus: SaleStatusInput
    $orientation: OrientationInput
    $size: ArtSizeInput
    $price: [Int]
    $medium: String
    $style: String
    $technique: String
    $theme: String
    $orderingPriority: [String]
  ) {
    arts(
      page: $page
      saleStatus: $saleStatus
      orientation: $orientation
      size: $size
      price: $price
      medium: $medium
      style: $style
      technique: $technique
      theme: $theme
      orderingPriority: $orderingPriority
    ) {
      id
      name
      saleStatus
      price
      width
      height
      representativeImageUrl
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
  const [filters, setFilters] = useState<any>({
    saleStatus: {
      all: true,
      onSale: false,
      soldOut: false,
      notForSale: false,
    },
    size: {
      all: true,
      small: false,
      medium: false,
      large: false,
    },
    orientation: {
      all: true,
      landscape: false,
      portrait: false,
      square: false,
      etc: false,
    },
    price: [0, 1500000],
    medium: 'all',
    theme: 'all',
    style: 'all',
    technique: 'all',
  })

  const [page, setPage] = useState<number>(0)

  const { data } = useQuery(ARTS, {
    onCompleted: (data) => {
      const { arts } = data
      setArts(arts)
      if (arts) {
        setPage(1)
      }
    },
    onError: (error) => console.error(error.message),
  })

  const [loadMoreArts] = useLazyQuery(ARTS, {
    onCompleted: (data) => {
      const fetchedArts = data.arts
      if (fetchedArts.length === 0) {
        alert('더 불러올 작품이 없습니다.')
        setNoMoreArts(true)
      } else {
        setArts([...arts, ...fetchedArts])
        setPage(page + 1)
      }
    },
    onError: (error) => console.error(error.message),
  })

  const [filterArts] = useLazyQuery(ARTS, {
    onCompleted: (data) => {
      const filteredArts = data.arts
      setArts(filteredArts)
      if (filteredArts) {
        setPage(1)
      }
    },
    onError: (error) => console.error(error.message),
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
          orderingPriority: filters.orderingPriority,
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
          page,
        },
      })
    } else {
      loadMoreArts({
        variables: {
          page,
          saleStatus: filters.saleStatus,
          orientation: filters.orientation,
          size: filters.size,
          price: filters.price,
          medium: filters.medium,
          style: filters.style,
          technique: filters.technique,
          theme: filters.theme,
          orderingPriority: filters.orderingPriority,
        },
      })
    }
  }

  return (
    <ArtListPresenter
      arts={arts}
      filters={filters}
      setFilters={setFilters}
      handleLoadMore={handleLoadMore}
    />
  )
}

export default ArtList
