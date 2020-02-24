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
  Grid,
  Link
} from '@material-ui/core'
import logo from './logo.png'
import ProjectTimestamp from './ProjectTimestamp'

function Simulation() {
  const blusGoldLink = (
    <Link href="https://blusgold.com/" target="_blank" rel="noopener noreferrer">
      Blu'$ Gold
    </Link>
  )

  const sourceCodeLink = (
    <Link
      href="https://github.com/nicrmurphy/financial-literacy"
      target="_blank"
      rel="noopener noreferrer">
      here
    </Link>
  )

  const [step, setStep] = useState(0)

  const steps = [
    <Box>
      <p>
        Welcome to the simulation! This app is in active development. For
        comments or inquiries, please contact {blusGoldLink}. The source code
        for this app can be found {sourceCodeLink}. Most recent update was{' '}
        <ProjectTimestamp />.
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
