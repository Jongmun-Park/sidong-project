import React, { FunctionComponent, useState, useEffect } from 'react'
import ArtistPresenter from './ArtistPresenter'
import { _getToken, _dataApi } from '../../apis'

if (sessionStorage.getItem('artsy-token') === null) {
  _getToken()
}

const Artist: FunctionComponent = () => {
  const [artworks, setArtworks] = useState<Array<any>>([])

  useEffect(() => {
    getArtworks()
  }, [])

  async function getArtworks() {
    const artworksData = await _dataApi.artwork()
    setArtworks(artworksData.data._embedded.artworks)
  }

  return <ArtistPresenter artworks={artworks} />
}

export default Artist
