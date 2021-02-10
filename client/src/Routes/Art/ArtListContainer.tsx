import React, { FC } from 'react'
import ArtListPresenter from './ArtListPresenter'
import gql from 'graphql-tag'

const ARTS = gql`
  query($lastArtId: ID, $pageSize: Int) {
    arts(lastArtId: $lastArtId, pageSize: $pageSize) {
      id
      name
      medium
      style {
        id
        name
      }
      saleStatus
      price
      width
      height
      artist {
        id
        artistName
      }
    }
  }
`

const ArtList: FC = () => {
  return <ArtListPresenter />
}

export default ArtList
