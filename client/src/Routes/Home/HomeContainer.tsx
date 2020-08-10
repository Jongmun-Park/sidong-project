import React, { useState, useEffect } from 'react'
import HomePresenter from './HomePresenter'
import { _getToken, _dataApi } from '../../apis'

if (sessionStorage.getItem('artsy-token') === null) {
  _getToken()
}

const Home: React.FC = () => {
  const [artworks, setArtworks] = useState()

  useEffect(() => {
    getArtworks()
  }, [])

  async function getArtworks() {
    const artworksData = await _dataApi.artwork()
    setArtworks(artworksData.data._embedded.artworks)
  }

  return <HomePresenter artworks={artworks} />
}

export default Home
