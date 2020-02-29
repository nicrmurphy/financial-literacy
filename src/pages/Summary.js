import React, { useState, useEffect } from 'react'
import { Grid, Typography, Box, Slide } from '@material-ui/core'
import { Doughnut, Line } from 'react-chartjs-2'
import { toCurrency } from '../tools'
import { calculateSummary } from '../formulas'

/**
 * This is the page that is displayed at key times throughout the
 * simulation to assess and inform the player of their progress.
 */
function Summary({ choices }) {
  const [sliders, setSliders] = useState([])
  const [accountBalance, setAccountBalance] = useState(0)
  const [debt, setDebt] = useState(0)
  const [investments, setInvestments] = useState(0)

  /**
   * indices of the following arrays = year; values are running totals
   * values[0] = 0; values[1] = val(year1) + values[0];
   * values[2] = val(year2) + values[1] + values[0];
   * values[15] = val(year15) + values[14] + values[13] + ... + values[0];
   */
  const [accountBalanceOverTime, setAccountBalanceOverTime] = useState([])

  /* chart data */
  const [totals, setTotals] = useState([])

  // delay element transitions for ripple effect using setInterval()
  useEffect(() => {
    const nTimes = 7 // number of elements sliding in
    const interval = setInterval(() => {
      if (sliders.length === nTimes) clearInterval(interval)
      setSliders([...sliders, true])
    }, 200)

    return () => {
      clearInterval(interval)
    }
  }, [sliders])

  useEffect(() => setTotals([accountBalance, debt, investments]), [
    accountBalance,
    debt,
    investments
  ])

  useEffect(() => {
    const { netIncome, totalExpenses, investments } = calculateSummary({ ...choices })
    console.log(netIncome, totalExpenses, investments)
    setAccountBalance(Math.max(netIncome - totalExpenses, 0))
    setDebt(Math.max(totalExpenses - netIncome, 0))
    setInvestments(investments)
  }, [])

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start">
      {/* {JSON.stringify(accountBalanceOverTime)} */}
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
            <Typography variant="h6">Debt: {toCurrency(debt)}</Typography>
          </Slide>
        </Grid>
        <Grid item>
          <Slide direction="right" in={sliders[3]} mountOnEnter unmountOnExit>
            <Typography variant="h6">
              401(k): {toCurrency(investments)}
            </Typography>
          </Slide>
        </Grid>
        <Grid item>
          <Slide direction="right" in={sliders[4]} mountOnEnter unmountOnExit>
            <Typography variant="h6" className="summary-page-text">
              <Box fontWeight="fontWeightBold">
                Net Worth: {toCurrency(accountBalance + investments - debt)}
              </Box>
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
