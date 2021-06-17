import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import About from '../Routes/About'
import Account from '../Routes/Account'
import ArtList from '../Routes/Art/ArtListContainer'
import ArtDetailPage from '../Routes/Art/ArtDetailPage'
import RegisterArt from '../Routes/Art/RegisterArt'
import UpdateArt from '../Routes/Art/UpdateArt'
import OrderArt from '../Routes/Art/OrderArt'
import ArtistList from '../Routes/Artist/ArtistListContainer'
import ArtistDetailPage from '../Routes/Artist/ArtistDetailPage'
import RegisterArtist from '../Routes/Artist/RegisterArtist'
import UpdateArtist from '../Routes/Artist/UpdateArtist'

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ArtList} />
          <Route exact path="/about" component={About} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/account/likes" component={Account} />
          <Route exact path="/account/orders" component={Account} />
          <Route exact path="/account/arts" component={Account} />
          <Route exact path="/account/sales" component={Account} />

          <Route exact path="/arts" component={ArtList} />
          <Route exact path="/art/register" component={RegisterArt} />
          <Route exact path="/art/update/:artId" component={UpdateArt} />
          <Route exact path="/art/:artId" component={ArtDetailPage} />
          <Route exact path="/order/:artId" component={OrderArt} />

          <Route exact path="/artists" component={ArtistList} />
          <Route exact path="/artist/register" component={RegisterArtist} />
          <Route exact path="/artist/update/:artistId" component={UpdateArtist} />
          <Route exact path="/artist/:artistId" component={ArtistDetailPage} />

          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
