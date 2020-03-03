import React, { useState } from 'react'
import './App.css'
import { Container, Button, Grid } from '@material-ui/core'
import Welcome from './pages/Welcome'
import Summary from './pages/Summary'
import RadioSelector from './pages/RadioSelector'
import InputSelector from './pages/InputSelector'
import { options } from './constants.js'
import { Prompt } from 'react-router'

function Simulation() {
  const [page, setPage] = useState(0)
  const [pageComplete, setPageComplete] = useState(false)
  const [progress, setProgress] = useState(page) // furthest completed page
  const [choices, setChoices] = useState({
    salary: 0,
    investmentPercentage: '',
    studentLoan: 0,
    apartment: 0,
    car: 0
  })

  /**
   * Returns a RadioSelector component for dynamic page creation.
   * @param {int} pageIndex
   * @param {String} label
   * @param {String} key
   */
  const buildPageComponent = (pageIndex, label, key) => (
    <RadioSelector
      name={label}
      options={options[key]}
      selected={choices[key]}
      complete={result => completePage(pageIndex, key, result)}
    />
  )

  const pages = [
    <Welcome nextPage={() => setPage(page + 1)} />,
    buildPageComponent(1, 'Salary', 'salary'),
    <InputSelector
      name={'Amount'}
      salary={choices.salary}
      selected={
        choices.investmentPercentage ? choices.investmentPercentage * 100 : ''
      }
      complete={result => {
        completePage(2, '', result)
        setChoices({ ...choices, investmentPercentage: result / 100 })
      }}
      incomplete={() => {
        setPageComplete(false)
        setChoices({ ...choices, investmentPercentage: 0 })
      }}
    />,
    buildPageComponent(3, 'Student Loan', 'studentLoan'),
    buildPageComponent(4, 'Apartment', 'apartment'),
    buildPageComponent(5, 'Car', 'car'),
    <Summary choices={{ ...choices }} complete={() => completePage(6)} />
  ]

  const completePage = (pageIndex, key, value) => {
    setPageComplete(true)
    setProgress(progress => Math.max(pageIndex, progress))
    if (key && value) setChoices({ ...choices, [key]: value })
  }

  return (
    <Container maxWidth="sm" style={{ minHeight: '75%' }}>
      <Prompt
        when={progress > 0}
        message="If you leave, all your progress will be lost!"
      />
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
          <Grid item>{pages[page] ? pages[page] : `Step ${page}`}</Grid>
        </Grid>
        {page !== 0 && (
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
                onClick={() => {
                  setPage(page => page - 1)
                  setPageComplete(true)
                }}
                disabled={false}>
                Back
              </Button>
            </Grid>
            <Grid item className={'developer-only'}>
              {process.env.NODE_ENV === 'development' && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setProgress(Infinity)
                    setPageComplete(true)
                    setChoices({
                      salary: 42000,
                      investmentPercentage: 0.1,
                      studentLoan: 10,
                      apartment: 1000,
                      car: 10000
                    })
                  }}>
                  Cheat
                </Button>
              )}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setPage(page => page + 1)
                  setPageComplete(page < progress)
                }}
                disabled={!pageComplete}>
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
