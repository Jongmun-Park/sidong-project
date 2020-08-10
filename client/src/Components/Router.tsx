import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import NavBar from './Navbar'
import UploadArt from './User/UploadArt'
import Home from '../Routes/Home/HomeContainer'
import Art from '../Routes/Art/ArtContainer'
import Practice from '../Routes/Practice/PracticeContainer'

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/art" component={Art} />
            <Route exact path="/practice" component={Practice} />
            <Route exact path="/upload-art" component={UploadArt} />
            <Redirect from="*" to="/" />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default Router
