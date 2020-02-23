import React from 'react'
import './App.css'
import {Container, Button} from '@material-ui/core'
import logo from './logo.png'

function Simulation() {
  return (
    <Container maxWidth="sm" /*style={{backgroundColor: "white"}}*/>
      <h1>The Game of Life</h1>
      <h2>Financial Simulation</h2>
      <p>Welcome to the simulation!  This app is in active development.  For comments or inquiries, please contact <a href="https://blusgold.com/">Blu'$ Gold</a>.  The source code for this app can be found <a href="https://github.com/nicrmurphy/financial-literacy">here</a>.</p>
      <img id="blusgold-logo" src={logo} alt="Blu$ Gold logo"></img><br/>
      <Button variant="contained" color="primary" style={{marginTop: '75px'}}>Begin!</Button>
    </Container>
  )
}

export default Simulation
