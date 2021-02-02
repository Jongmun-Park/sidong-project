import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import About from './About'
import Home from '../Routes/Home/HomeContainer'
import Art from '../Routes/Art/ArtContainer'
import ArtistList from '../Routes/Artist/ArtistListContainer'
import RegisterArt from './Art/RegisterArt'
import RegisterArtist from './Artist/RegisterArtist'

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/arts" component={Art} />
          <Route exact path="/art/register" component={RegisterArt} />
          <Route exact path="/artists" component={ArtistList} />
          <Route exact path="/artist/register" component={RegisterArtist} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
