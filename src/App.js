import React from 'react'
import './App.css'
import Header from './Header'
import DevBanner from './DevBanner'
import Simulation from './Simulation'

function App() {
  return (
    <div className="App">
      <DevBanner />
      <Header />
      <Simulation />
    </div>
  )
}

export default App
