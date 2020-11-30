import React from 'react'
import 'typeface-roboto'
import Router from './Router'
import NavBar from './Navbar'

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Router />
      </>
    )
  }
}

export default App
