import React, { useState } from 'react'
import './App.css'
import { Container, Button, Grid } from '@material-ui/core'
import Welcome from './pages/Welcome'
import RadioSelector from './pages/RadioSelector'
import { options } from './constants.js'

function Simulation() {
  const [page, setPage] = useState(0)
  const [choices, setChoices] = useState({
    salary: 0,
    studentLoan: 0,
    car: 0,
    apartment: 0
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
    buildPageComponent(2, 'Student Loan', 'studentLoan'),
    buildPageComponent(3, 'Car', 'car'),
    buildPageComponent(4, 'Apartment', 'apartment')
  ]

  const [pageInfo, setPageInfo] = useState([
    { complete: true },
    { complete: false },
    { complete: false },
    { complete: false },
    { complete: false }
  ])

  const completePage = (page, key, value) => {
    pageInfo[page].complete = true
    setPageInfo([...pageInfo])

    setChoices({ ...choices, [key]: value })
  }

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
                onClick={() => setPage(page - 1)}
                disabled={false}>
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setPage(page + 1)}
                disabled={
                  pageInfo[page]
                    ? !pageInfo[page].complete
                    : !pageInfo[page + 1]
                }>
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
