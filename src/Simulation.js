import React, { useState, Fragment } from 'react'
import './App.css'
import { Container, Button, Grid, Typography } from '@material-ui/core'
import Footer from './Footer'
import Welcome from './pages/Welcome'
import Summary from './pages/Summary'
import RadioSelector from './pages/RadioSelector'
import InputSelector from './pages/InputSelector'
import CreditScorePage from './pages/CreditScorePage'
import { ageGroups, options, cheatChoices, mortgageYears } from './constants.js'
import { Prompt } from 'react-router'
import {
  getRandomCreditScore,
  evaluateCreditScore,
  getCreditQualityColor
} from './tools'
import 'csshake/dist/csshake.min.css'


function Simulation() {
  const [page, setPage] = useState(0)
  const [pageComplete, setPageComplete] = useState(true)
  const [progress, setProgress] = useState(page) // furthest completed page
  const [choices, setChoices] = useState({
    salary: 42000,
    investmentPercentage: '',
    studentLoanYears: 0,
    apartment: 0,
    carLoanYears: 0,
    fancyCarLoanYears: 0,
    creditScore: getRandomCreditScore(),
    mortgage: 0,
    healthInsurance: 0,
    midlifeCrisis: 0,
    lifeInsurance: 0
  })

  /**
   * Returns a RadioSelector component for dynamic page creation.
   * @param {int} pageIndex
   * @param {String} label
   * @param {String} key
   */
  const buildPageComponent = (pageIndex, label, key, prompt, flavorText, color) => (
    <RadioSelector
      name={label}
      options={options[key]}
      selected={choices[key]}
      complete={result => completePage(pageIndex, key, result)}
      prompt={prompt}
      flavorText={flavorText}
      color={color ? color : 'primary'}
    />
  )

  const pages = [
    <Welcome nextPage={() => setPage(page + 1)} />,
    buildPageComponent(
      1,
      'Salary',
      'salary',
      'Congrats, you got a job!',
      <Typography
        variant="h5"
        color="primary"
        style={{ margin: '.5em', fontWeight: 'bold' }}>
        A JOB WELL DONE
      </Typography>
    ),
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
      flavorText={
        <Typography
          variant="h5"
          color="primary"
          style={{ margin: '.5em', fontWeight: 'bold' }}>
          SAVE IT FOR A RAINY DAY
        </Typography>
      }
    />,
    buildPageComponent(
      3,
      'Student Loan',
      'studentLoanYears',
      'How much is your...',
      <Typography
        variant="h5"
        color="primary"
        style={{ margin: '.5em', fontWeight: 'bold' }}>
        AREN'T I SUPPOSED TO BE <i>MAKING</i> MONEY?
      </Typography>
    ),
    buildPageComponent(
      4,
      'Apartment',
      'apartment',
      'How much is your...',
      <Typography
        variant="h5"
        color="primary"
        style={{ margin: '.5em', fontWeight: 'bold' }}>
        HOME SWEET HOME
      </Typography>
    ),
    buildPageComponent(
      5,
      'Car Loan',
      'carLoanYears',
      'How much is your...',
      <Typography
        variant="h5"
        color="primary"
        style={{ margin: '.5em', fontWeight: 'bold' }}>
        LIFE IS A HIGHWAY
      </Typography>
    ),
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
      'How much is your...',
      <Typography
        variant="h5"
        color="primary"
        style={{ margin: '.5em', fontWeight: 'bold' }}>
        TIME FOR AN UPGRADE
      </Typography>
    ),
    <RadioSelector
      name={'Mortgage'}
      options={options.mortgage[evaluateCreditScore(choices.creditScore)]}
      selected={choices.mortgage}
      complete={result => completePage(10, 'mortgage', result)}
      prompt="How much is your..."
      flavorText={
        <Typography
          variant="h5"
          color="primary"
          style={{ margin: '.5em', fontWeight: 'bold' }}>
          DUE TO YOUR{' '}
          <span style={{ color: getCreditQualityColor(choices.creditScore) }}>
            {evaluateCreditScore(choices.creditScore).toUpperCase()}
          </span>{' '}
          CREDIT SCORE, WE CAN OFFER YOU THESE RATES ON YOUR {mortgageYears}{' '}
          YEAR MORTGAGE...
        </Typography>
      }
    />,
    <RadioSelector
      name={'Home Insurance'}
      options={options.homeInsurance.map(option => { return { ...option, disabled: option.value !== choices.mortgage } })}
      selected={choices.mortgage}
      complete={() => {}}
      prompt="Your home insurance will be..."
      flavorText={
        <Typography
          variant="h5"
          color="primary"
          style={{ margin: '.5em', fontWeight: 'bold' }}>
          I NEED TO BUY A HOUSE <i>AND</i> INSURE IT?
        </Typography>
      }
    />,
    buildPageComponent(
      11,
      'Health Insurance',
      'healthInsurance',
      'How much is your...',
      <Typography
        variant="h5"
        color="primary"
        style={{ margin: '.5em', fontWeight: 'bold' }}>
        THANKS, OBAMA...
      </Typography>
    ),
    <Summary
      choices={{ ...choices }}
      complete={() => completePage(12)}
      startYear={ageGroups.two.start}
      endYear={ageGroups.two.end}
    />,
    buildPageComponent(
      13,
      'Midlife Crisis',
      'midlifeCrisis',
      '',
      <Fragment>
        <Typography
          className="shake shake-little shake-constant"
          variant="h4"
          color="secondary"
          style={{ margin: '.5em', fontWeight: 'bold' }}>
          UH OH, MIDLIFE CRISIS!
        </Typography>
        <Typography
          className="shake shake-constant"
          variant="h6"
          color="secondary"
          style={{ margin: '.5em', fontWeight: 'bold' }}>
          TIME IS RUNNING OUT WAIT MONEY CAN BUY HAPPINESS RIGHT OH GOD
        </Typography>
      </Fragment>,
      'secondary'
    ),
    buildPageComponent(
      14,
      'Life Insurance',
      'lifeInsurance',
      'Would you rather...',
      <Typography
        variant="caption"
        color="primary"
        style={{ margin: '.5em', fontWeight: 'bold' }}>
        I SHOULD REALLY CONSIDER SOME GETTING LIFE INSURANCE AFTER THAT...
      </Typography>
    ),
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
                // onKeyPress={() => alert('test')}
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
