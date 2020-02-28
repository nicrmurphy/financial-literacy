import React, { useState, useEffect, useRef } from 'react'
import { Grid, Typography, Box, Slide } from '@material-ui/core'
import { Doughnut, Line } from 'react-chartjs-2'
import { getStudentLoanAnnual } from '../constants'
import { toCurrency } from '../tools'

/**
 * This is the page that is displayed at key times throughout the
 * simulation to assess and inform the player of their progress.
 */
function Summary(props) {
  const [sliders, setSliders] = useState([ false, false, false, false, false, false, false])
  const [sliderIndex, setSliderIndex] = useState(0)
  const [accountBalance, setAccountBalance] = useState(0)
  const [debt, setDebt] = useState(0)
  const [investments, setInvestments] = useState(0)

  /* chart data */
  const [totals, setTotals] = useState([])

  const intervalContainer = useRef(null)

  useEffect(() => {
    intervalContainer.current = setInterval(() => {
      setSliderIndex(sliderIndex => sliderIndex + 1)
    }, 200)

    calculateSummary()

    return () => {
      clearInterval(intervalContainer.current)
    }
    // eslint-disable-next-line
  }, [])

  const calculateSummary = () => {
    const { salary, studentLoan, apartment, car } = props.choices
    
    /* calculations for one year */
    // calculate net income
    const taxRate = .75       // income tax, property tax, etc
    const miscCostRate = .7   // miscellaneous costs and purchases
    const netIncome = salary * taxRate * miscCostRate

    // calculate total expenses
    const retirementContributionPercent = .1 // 10% of salary
    const retirementContribution = salary * retirementContributionPercent
    const studentLoanAnnual = getStudentLoanAnnual(studentLoan)
    const apartmentAnnual = apartment * 12
    const totalExpenses = retirementContribution + studentLoanAnnual + apartmentAnnual + car
    
    setAccountBalance(Math.max(netIncome - totalExpenses, 0))
    setDebt(Math.max(totalExpenses - netIncome, 0))
    setInvestments(retirementContribution)
  }

  useEffect(() => {
    let sl = [...sliders]
    sl[sliderIndex] = true
    setSliders(sl)

    // clear the recurring interval at end of array
    if (sliderIndex === sliders.length) {
      clearInterval(intervalContainer.current)
    }
    // eslint-disable-next-line
  }, [sliderIndex])

  useEffect(() => setTotals([accountBalance, debt, investments]), [accountBalance, debt, investments])

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start">
      <Grid item>
        <Slide direction="right" in={sliders[0]} mountOnEnter unmountOnExit>
          <Typography variant="h4">Summary:</Typography>
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
            <Typography variant="h6" className="summary-page-text">
              Account Balance: {toCurrency(accountBalance)}
            </Typography>
          </Slide>
        </Grid>
        <Grid item>
          <Slide direction="right" in={sliders[2]} mountOnEnter unmountOnExit>
            <Typography variant="h6" >Debt: {toCurrency(debt)}</Typography>
          </Slide>
        </Grid>
        <Grid item>
          <Slide direction="right" in={sliders[3]} mountOnEnter unmountOnExit>
            <Typography variant="h6" >401(k): {toCurrency(investments)}</Typography>
          </Slide>
        </Grid>
        <Grid item>
          <Slide direction="right" in={sliders[4]} mountOnEnter unmountOnExit>
            <Typography variant="h6" className="summary-page-text">
            <Box fontWeight="fontWeightBold">Net Worth: {toCurrency(accountBalance + investments - debt)}</Box>
            </Typography>
          </Slide>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        justify="space-between"
        alignItems="center">
        {sliders[5] && (
          <Box
            style={{ padding: '14x', marginTop: '10px', marginBottom: '50px' }}>
            <Doughnut
              data={{
                labels: ['Account Balance', 'Debt', '401(k)'],
                datasets: [
                  {
                    label: 'Totals',
                    data: totals,
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
        {sliders[6] && (
          <Box
            style={{
              width: Math.max(window.innerWidth, window.innerHeight) / 2,
              maxWidth: window.innerWidth - 20,
              height: Math.min(window.innerWidth, window.innerHeight),
              maxHeight: Math.max(window.innerWidth, window.innerHeight) / 2
            }}>
            <Line
              data={{
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                datasets: [
                  {
                    label: 'Account Balance',
                    data: [],
                    backgroundColor: ['rgba(99, 185, 255, 0.2)'],
                    borderWidth: 1
                  },
                  {
                    label: 'Debt',
                    data: [],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                    borderWidth: 1
                  },
                  {
                    label: '401(k)',
                    data: [],
                    backgroundColor: ['rgba(112, 255, 99, 0.2)'],
                    borderWidth: 1
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  xAxes: [
                    {
                      scaleLabel: {
                        display: true,
                        labelString: 'Year'
                      }
                    }
                  ]
                }
              }}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  )
}

export default Summary
