import React, { useState } from 'react'
import './App.css'
import { Container, Button, Grid } from '@material-ui/core'
import Welcome from './pages/Welcome'
import RadioSelector from './pages/RadioSelector'
import { salaryOptions, loanOptions, carOptions, apartmentOptions } from './constants.js'

function Simulation() {
  const [page, setPage] = useState(0)

  const welcomePage = <Welcome nextPage={() => setPage(page + 1)} />
  const salaryPage = <RadioSelector name={'Salary'} options={salaryOptions} complete={() => completePage(1)} />
  const loanPage = <RadioSelector name={'Student Loan'} options={loanOptions} complete={() => completePage(2)} />
  const carPage = <RadioSelector name={'Car'} options={carOptions} complete={() => completePage(3)} />
  const apartmentPage = <RadioSelector name={'Apartment'} options={apartmentOptions} complete={() => completePage(4)} />

  const [pages, setPages] = useState([
    { component: welcomePage, complete: true },
    { component: salaryPage, complete: false },
    { component: loanPage, complete: false },
    { component: carPage, complete: false },
    { component: apartmentPage, complete: false }
  ])

  const completePage = page => {
    pages[page].complete = true
    setPages([...pages]) // spread required so react knows to render
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
          <Grid item>
            {pages[page] ? pages[page].component : `Step ${page}`}
          </Grid>
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
                disabled={pages[page] ? !pages[page].complete : !pages[page+1]}>
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
