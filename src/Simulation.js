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
import Welcome from './pages/Welcome'

function Simulation() {
  const [step, setStep] = useState(0)

  let welcomePage = <Welcome nextPage={() => setStep(step + 1)} />

  const steps = [
    welcomePage,
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
    <Container maxWidth="sm" style={{minHeight: '75%'}}>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        style={{minHeight: '400px'}}>
        <Grid
          id="simulation-window"
          item
          container
          xs={12}
          direction="column"
          justify="flex-start"
          alignItems="stretch">
          <Grid item>{steps[step] ? steps[step] : `Step ${step}`}</Grid>
        </Grid>
        {step !== 0 && (
          <Grid
            id="button-nav"
            item
            container
            xs={10}
            direction="row"
            justify="space-between"
            alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                color="default"
                onClick={() => setStep(step - 1)}>
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStep(step + 1)}
                disabled={false}>
                Next
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default Simulation
