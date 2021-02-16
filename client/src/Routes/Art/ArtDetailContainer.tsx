import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import ArtDetailPresenter from './ArtDetailPresenter'

interface ArtDetailParams {
  artID: string
}

const ArtDetail: FC = () => {
  const { artID } = useParams<ArtDetailParams>()
  console.log('artID:', artID)
  return <ArtDetailPresenter />
}

export default ArtDetail
