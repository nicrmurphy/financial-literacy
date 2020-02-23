import React from 'react'
import './App.css'
import Simulation from './Simulation'

function App() {
  return (
    <div className="App">
      <Simulation />
      <p style={{ color: 'lightgrey', left: '10%', right: '10%', bottom: '0px', marginTop: '200px'}}>
        This app is developed and hosted by{' '}
        <a style={{ color: 'lightgrey' }} href="https://kapu-kawhe.com/">
          Kapu-Kawhe
        </a>
        .
      </p>
    </div>
  )
}

export default App
