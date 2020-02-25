import React from 'react'
import './App.css'
import Simulation from './Simulation'
import DevBanner from './DevBanner'
import Footer from './Footer'

function App() {
  return (
    <div className="App">
      <DevBanner />
      <h1 style={{marginBottom: 0}}>The Game of Life</h1>
      <h2 style={{marginTop: 0}}>Financial Simulation</h2>
      <Simulation />
      <Footer />
    </div>
  )
}

export default App
