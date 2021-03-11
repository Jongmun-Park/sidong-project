import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import About from './About'
import ArtList from '../Routes/Art/ArtListContainer'
import ArtDetailPage from '../Routes/Art/ArtDetailPage'
import RegisterArt from './Art/RegisterArt'
import ArtistList from '../Routes/Artist/ArtistListContainer'
import ArtistDetailPage from '../Routes/Artist/ArtistDetailPage'
import RegisterArtist from './Artist/RegisterArtist'

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ArtList} />
          <Route exact path="/about" component={About} />

          <Route exact path="/arts" component={ArtList} />
          <Route exact path="/art/register" component={RegisterArt} />
          <Route exact path="/art/:artID" component={ArtDetailPage} />

          <Route exact path="/artists" component={ArtistList} />
          <Route exact path="/artist/register" component={RegisterArtist} />
          <Route exact path="/artist/:artistId" component={ArtistDetailPage} />

          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
