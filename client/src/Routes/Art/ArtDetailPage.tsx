import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import ArtDetail from '../../Components/Art/ArtDetail'

interface ArtDetailPageParams {
  artID: string
}

const ArtDetailPage: FC = () => {
  const { artID } = useParams<ArtDetailPageParams>()

  return <ArtDetail artID={Number(artID)} />
}

export default ArtDetailPage
