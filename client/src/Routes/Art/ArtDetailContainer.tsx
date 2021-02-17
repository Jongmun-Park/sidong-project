import React, { FC } from 'react'
import gql from 'graphql-tag'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import ArtDetailPresenter from './ArtDetailPresenter'

interface ArtDetailParams {
  artID: string
}

const ART = gql`
  query($artId: ID!) {
    art(artId: $artId) {
      id
      createdAt
      artist {
        id
        artistName
        realName
      }
      name
      description
      medium
      theme {
        id
        name
      }
      style {
        id
        name
      }
      technique {
        id
        name
      }
      saleStatus
      isFramed
      price
      orientation
      size
      width
      height
      images
    }
  }
`

const ArtDetail: FC = () => {
  const { artID } = useParams<ArtDetailParams>()
  const { data } = useQuery(ART, {
    variables: {
      artId: artID,
    },
    onCompleted: (data) => {
      console.log('data::', data)
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  return <ArtDetailPresenter />
}

export default ArtDetail
