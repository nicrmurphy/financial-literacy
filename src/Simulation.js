import React, { useState } from 'react'
import './App.css'
import { Container, Button, Grid, Typography } from '@material-ui/core'
import Footer from './Footer'
import Welcome from './pages/Welcome'
import Summary from './pages/Summary'
import RadioSelector from './pages/RadioSelector'
import InputSelector from './pages/InputSelector'
import CreditScorePage from './pages/CreditScorePage'
import InfoPage from './pages/InfoPage'
import { ageGroups, options, cheatChoices, mortgageYears } from './constants.js'
import { Prompt } from 'react-router'
import {
  getRandomCreditScore,
  evaluateCreditScore,
  getCreditQualityColor
} from './tools'

function Simulation() {
  const [page, setPage] = useState(0)
  const [pageComplete, setPageComplete] = useState(false)
  const [progress, setProgress] = useState(page) // furthest completed page
  const [choices, setChoices] = useState({
    salary: 0,
    investmentPercentage: '',
    studentLoanYears: 0,
    apartment: 0,
    carLoanYears: 0,
    fancyCarLoanYears: 0,
    creditScore: getRandomCreditScore(),
    mortgage: 0
  })

  /**
   * Returns a RadioSelector component for dynamic page creation.
   * @param {int} pageIndex
   * @param {String} label
   * @param {String} key
   */
  const buildPageComponent = (pageIndex, label, key, flavorText) => (
    <RadioSelector
      name={label}
      options={options[key]}
      selected={choices[key]}
      complete={result => completePage(pageIndex, key, result)}
      flavorText={flavorText}
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
    buildPageComponent(3, 'Student Loan', 'studentLoanYears'),
    buildPageComponent(4, 'Apartment', 'apartment'),
    buildPageComponent(5, 'Car Loan', 'carLoanYears'),
    <Summary
      choices={{ ...choices }}
      complete={() => completePage(6)}
      startYear={ageGroups.one.start}
      endYear={ageGroups.one.end}
    />,
    <CreditScorePage
    creditScore={choices.creditScore}
    complete={() => completePage(7)}
  />,
    buildPageComponent(
      8,
      'Fancy Car Loan',
      'fancyCarLoanYears',
      <Typography
        variant="h5"
        color="primary"
        style={{ margin: '.5em', fontWeight: 'bold' }}>
        TIME FOR AN UPGRADE...
      </Typography>
    ),
    <RadioSelector
      name={'Mortgage'}
      options={options.mortgage[evaluateCreditScore(choices.creditScore)]}
      selected={choices.mortgage}
      complete={result => completePage(9, 'mortgage', result)}
      flavorText={
        <Typography
          variant="h5"
          color="primary"
          style={{ margin: '.5em', fontWeight: 'bold' }}>
          DUE TO YOUR{' '}
          <span style={{ color: getCreditQualityColor(choices.creditScore) }}>
            {evaluateCreditScore(choices.creditScore).toUpperCase()}
          </span>
          {' '}CREDIT SCORE, WE CAN OFFER YOU THESE RATES ON YOUR {mortgageYears} YEAR MORTGAGE...
        </Typography>
      }
    />,
    <Summary
      choices={{ ...choices }}
      complete={() => completePage(10)}
      startYear={ageGroups.two.start}
      endYear={ageGroups.two.end}
    />,
    <InfoPage title="Final Summary Next" complete={() => completePage(11)} />,
    <Summary
      choices={{ ...choices }}
      complete={() => completePage(-1)}
      startYear={ageGroups.three.start}
      endYear={ageGroups.three.end}
    />
  ]

  const completePage = (pageIndex, key, value) => {
    setPageComplete(true)
    setProgress(progress => Math.max(pageIndex, progress))
    if (key && value) setChoices({ ...choices, [key]: value })
  }

  return (
    <Container id="simulation-container" maxWidth="sm">
      <Prompt
        when={progress > 0}
        message="If you leave, all your progress will be lost!"
      />
      <Grid
        id="simulation-wrapper"
        container
        direction="column"
        justify="space-between"
        alignItems="center">
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
                    setChoices(cheatChoices)
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
                onKeyPress={() => alert('test')}
                disabled={!pageComplete}>
                Next
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Simulation
