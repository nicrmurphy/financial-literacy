import React, { useState } from 'react'
import './App.css'
import { Container, Button, Grid } from '@material-ui/core'
import Welcome from './pages/Welcome'
import RadioSelector from './pages/RadioSelector'

function Simulation() {
  const [page, setPage] = useState(0)
  const salaryOptions = [
    { value: 1, label: '$1.00' },
    { value: 2, label: '$2.00' },
    { value: 3, label: '$3.00' }
  ]
  const loanOptions = [
    { value: 10, label: '10 years' },
    { value: 15, label: '15 years' },
    { value: 20, label: '20 years' }
  ]

  const welcomePage = <Welcome nextPage={() => setPage(page + 1)} />
  const salaryPage = <RadioSelector name={'Salary'} options={salaryOptions} complete={() => completePage(1)} />
  const loanPage = <RadioSelector name={'Loan'} options={loanOptions} complete={() => completePage(2)} />

  const [pages, setPages] = useState([
    { component: welcomePage, complete: true },
    { component: salaryPage, complete: false },
    { component: loanPage, complete: false }
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
                onClick={() => setPage(page - 1)}>
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
