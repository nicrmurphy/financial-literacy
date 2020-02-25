import React, { useState } from 'react'
import './App.css'
import { Container, Button, Grid } from '@material-ui/core'
import Welcome from './pages/Welcome'
import Salary from './pages/Salary'

function Simulation() {
  const [step, setStep] = useState(0)

  let welcomePage = <Welcome nextPage={() => setStep(step + 1)} />
  let salaryPage = <Salary />

  const steps = [welcomePage, salaryPage]

  return (
    <Container maxWidth="sm" style={{ minHeight: '75%' }}>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        style={{ minHeight: '400px' }}>
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
