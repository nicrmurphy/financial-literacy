import React, { useState, useEffect } from 'react'
import { Grid, Typography, Box, Slide } from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'

/**
 * This is the page that is displayed at key times throughout the
 * simulation to assess and inform the player of their progress.
 */
function Summary() {
  const [sliders, setSliders] = useState([false, false, false, false, false])
  const [sliderIndex, setSliderIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex(sliderIndex => sliderIndex + 1)
    }, 200) // TODO: decide on slow or fast delay for ripple effect

    return () => {
      clearInterval(interval) // TODO: clear interval after sliderIndex === nSliders
    }
  }, [])
  // TODO: maybe get ride of setTimeout altogether - MUI might have a delay prop
  useEffect(() => {
    let sl = [...sliders]
    sl[sliderIndex] = true
    setSliders(sl)
  }, [sliderIndex])

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start">
      <Grid item>
        <Slide direction="right" in={sliders[0]} mountOnEnter unmountOnExit>
          <Typography variant="h3">Summary:</Typography>
        </Slide>
      </Grid>
      <Grid
        item
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start">
        <Grid item>
          <Slide direction="right" in={sliders[1]} mountOnEnter unmountOnExit>
            <Typography variant="h5" className="summary-page-text">
              Account Balance: $30
            </Typography>
          </Slide>
        </Grid>
        <Grid item>
          <Slide direction="right" in={sliders[2]} mountOnEnter unmountOnExit>
            <Typography variant="h5">Debt: $400</Typography>
          </Slide>
        </Grid>
        <Grid item>
          <Slide direction="right" in={sliders[3]} mountOnEnter unmountOnExit>
            <Typography variant="h5">401(k): $85</Typography>
          </Slide>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        justify="space-between"
        alignItems="center">
        {sliders[4] && (
          <Box style={{padding: '14x', marginTop: '10px', marginBottom: '50px'}}>
            <Doughnut
              data={{
                labels: ['Account Balance', 'Debt', '401(k)'],
                datasets: [
                  {
                    label: 'Account Balance',
                    data: [30, 400, 85],
                    backgroundColor: [
                      'rgba(99, 185, 255, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(112, 255, 99, 0.2)'
                    ],
                    borderWidth: 1
                  }
                ]
              }}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default Summary
