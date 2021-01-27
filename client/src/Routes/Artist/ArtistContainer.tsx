import React, { FunctionComponent, useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ArtistPresenter from './ArtistPresenter'

const ARTISTS = gql`
  {
    artists {
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

const Artist: FunctionComponent = () => {
  const { data, error } = useQuery(ARTISTS)

  if (!data) {
    return null
  }
  if (error) {
    console.error(error.message)
  }

  return <ArtistPresenter artists={data.artists} />
}

export default Artist
