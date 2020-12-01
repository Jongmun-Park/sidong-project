import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import UploadPost from './User/UploadPost'
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
          <Route exact path="/upload-post" component={UploadPost} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
