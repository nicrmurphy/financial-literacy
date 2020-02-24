import React, { useState } from 'react'
import './App.css'
import {
  Container,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Grid
} from '@material-ui/core'
import logo from './logo.png'

function Simulation() {
  const blusGoldLink = (
    <a href="https://blusgold.com/" target="_blank" rel="noopener noreferrer">
      Blu'$ Gold
    </a>
  )

  const sourceCodeLink = (
    <a
      href="https://github.com/nicrmurphy/financial-literacy"
      target="_blank"
      rel="noopener noreferrer">
      here
    </a>
  )

  const [step, setStep] = useState(0)

  const steps = [
    <Box>
      <p>
        Welcome to the simulation! This app is in active development. For
        comments or inquiries, please contact {blusGoldLink}. The source code
        for this app can be found {sourceCodeLink}.
      </p>
      <img id="blusgold-logo" src={logo} alt="Blu$ Gold logo"></img>
      <br />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '75px' }}
        onClick={() => setStep(step + 1)}>
        Begin!
      </Button>
    </Box>,
    <Box>
      <h3 style={{ marginBottom: 0 }}>Make a choice:</h3>
      <List>
        <ListItem>
          <Checkbox edge="start" checked={true} tabIndex={-1} disableRipple />
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem>
          <Checkbox edge="start" checked={false} tabIndex={-1} disableRipple />
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <Checkbox edge="start" checked={false} tabIndex={-1} disableRipple />
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>
    </Box>
  ]

  return (
    <Container maxWidth="sm" /*style={{backgroundColor: "white"}}*/>
      <Box>{steps[step] ? steps[step] : `Step ${step}`}</Box>
      {step !== 0 && (
        <div id="button-navigation">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="default"
                onClick={() => setStep(step - 1)}>
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStep(step + 1)}>
                Next
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  )
}

export default Simulation
