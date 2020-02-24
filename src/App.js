import React from 'react'
import './App.css'
import Simulation from './Simulation'

function App() {
  return (
    <div className="App">
      <h1 style={{marginBottom: 0}}>The Game of Life</h1>
      <h2 style={{marginTop: 0}}>Financial Simulation</h2>
      <Simulation />
      <p
        style={{
          color: 'lightgrey',
          left: '10%',
          right: '10%',
          bottom: '0px',
          marginTop: '200px'
        }}>
        This app is developed and hosted by{' '}
        <a
          style={{ color: 'lightgrey' }}
          href="https://kapu-kawhe.com/"
          target="_blank"
          rel="noopener noreferrer">
          Kapu-Kawhe
        </a>
        .
      </p>
    </div>
  )
}

export default App
