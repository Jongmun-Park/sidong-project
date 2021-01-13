import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import About from './About'
import RegisterArtist from './User/RegisterArtist'
import Home from '../Routes/Home/HomeContainer'
import Art from '../Routes/Art/ArtContainer'
import Artist from '../Routes/Artist/ArtistContainer'

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/art" component={Art} />
          <Route exact path="/artist" component={Artist} />
          <Route exact path="/artist/register" component={RegisterArtist} />
          <Route exact path="/about" component={About} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
