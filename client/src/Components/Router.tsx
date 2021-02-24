import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import About from './About'
import Home from '../Routes/Home/HomeContainer'

import ArtList from '../Routes/Art/ArtListContainer'
import ArtDetail from '../Routes/Art/ArtDetailContainer'
import RegisterArt from './Art/RegisterArt'

import ArtistList from '../Routes/Artist/ArtistListContainer'
import ArtistDetail from '../Routes/Artist/ArtistDetail'
import RegisterArtist from './Artist/RegisterArtist'

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />

          <Route exact path="/arts" component={ArtList} />
          <Route exact path="/art/register" component={RegisterArt} />
          <Route exact path="/art/:artID" component={ArtDetail} />

          <Route exact path="/artists" component={ArtistList} />
          <Route exact path="/artist/register" component={RegisterArtist} />
          <Route exact path="/artist/:artistID" component={ArtistDetail} />

          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
