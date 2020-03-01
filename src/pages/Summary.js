import React, { useState, useEffect } from 'react'
import { Grid, Typography, Box, Slide } from '@material-ui/core'
import { Doughnut, Line } from 'react-chartjs-2'
import { toCurrency } from '../tools'
import { calcSummary } from '../formulas'

/**
 * This is the page that is displayed at key times throughout the
 * simulation to assess and inform the player of their progress.
 */
function Summary({ choices }) {
  const [sliders, setSliders] = useState([])
  const [years, setYears] = useState([0])

  /**
   * indices of the following arrays = year; values are running totals
   * values[0] = 0; values[1] = val(year1) + values[0];
   * values[2] = val(year2) + values[1] + values[0];
   * values[15] = val(year15) + values[14] + values[13] + ... + values[0];
   */
  const [summaryData, setSummaryData] = useState({
    accountBalance: [0],
    debt: [0],
    investments: [0]
  })

  useEffect(() => {
    const { netIncome, totalExpenses, investments } = calcSummary(
      { ...choices },
      [...years].pop()
    )
    const accountBalance = Math.max(netIncome - totalExpenses, 0)
    const debt = Math.max(totalExpenses - netIncome, 0)

    console.log([...years].pop(), netIncome, totalExpenses, investments)

    setSummaryData(prev => {
      return {
        accountBalance: [...prev.accountBalance, accountBalance],
        debt: [...prev.debt, debt],
        investments: [...prev.investments, investments]
      }
    })
  }, [choices, years])

  // delay element transitions for ripple effect using setInterval()
  const ms = 200
  const nElements = 7 // number of elements sliding in
  useEffect(() => {
    const delayInterval = setInterval(() => {
      setSliders(prevSliders => {
        if (prevSliders.length === nElements) clearInterval(delayInterval)
        return [...prevSliders, true]
      })
    }, ms)

    let yearsInterval
    const delayBeforeCalc = setTimeout(() => {
      const nYears = 15
      yearsInterval = setInterval(() => {
        setYears(years => {
          if (years.length === nYears) {
            clearInterval(yearsInterval)
          }
          return [...years, years[years.length - 1] + 1]
        })
      }, 100)
    }, ms * nElements + 2000) // wait to display calculations until after ripple

    return () => {
      clearInterval(delayInterval)
      clearInterval(yearsInterval)
      clearTimeout(delayBeforeCalc)
    }
  }, [])

  const currentAccountBalance = [...summaryData.accountBalance].pop()
  const currentDebt = [...summaryData.debt].pop()
  const currentInvestments = [...summaryData.investments].pop()

  const renderSummaryText = () => (
    <Box style={{textAlign: 'left'}}>
      <Slide direction="right" in={sliders[0]} mountOnEnter unmountOnExit>
        <Typography variant="h4">Summary:</Typography>
      </Slide>
      <Slide direction="right" in={sliders[1]} mountOnEnter unmountOnExit>
        <Typography variant="h6" className="summary-page-text">
          Account Balance: {toCurrency(currentAccountBalance)}
        </Typography>
      </Slide>
      <Slide direction="right" in={sliders[2]} mountOnEnter unmountOnExit>
        <Typography variant="h6">Debt: {toCurrency(currentDebt)}</Typography>
      </Slide>
      <Slide direction="right" in={sliders[3]} mountOnEnter unmountOnExit>
        <Typography variant="h6">
          401(k): {toCurrency(currentInvestments)}
        </Typography>
      </Slide>
      <Slide direction="right" in={sliders[4]} mountOnEnter unmountOnExit>
        <Typography variant="h6" className="summary-page-text">
          <Box fontWeight="fontWeightBold">
            Net Worth:{' '}
            {toCurrency(
              currentAccountBalance + currentInvestments - currentDebt
            )}
          </Box>
        </Typography>
      </Slide>
    </Box>
  )

  const renderDoughnutGraph = () =>
    sliders[5] && (
      <Box style={{ padding: '14x', marginTop: '10px', marginBottom: '50px' }}>
        <Doughnut
          data={{
            labels: ['Account Balance', 'Debt', '401(k)'],
            datasets: [
              {
                label: 'Totals',
                data: [currentAccountBalance, currentDebt, currentInvestments],
                backgroundColor: [
                  'rgba(99, 185, 255, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(112, 255, 99, 0.2)'
                ],
                borderWidth: 1
              }
            ]
          }}
          options={{
            responsive: true
          }}
        />
      </Box>
    )

  const renderLineGraph = () =>
    sliders[6] && (
      <Box
        style={{
          width: Math.max(window.innerWidth, window.innerHeight) / 2,
          maxWidth: window.innerWidth - 20,
          height: Math.min(window.innerWidth, window.innerHeight),
          maxHeight: Math.max(window.innerWidth, window.innerHeight) / 2
        }}>
        <Line
          data={{
            labels: years,
            datasets: [
              {
                label: 'Account Balance',
                data: summaryData.accountBalance,
                backgroundColor: ['rgba(99, 185, 255, 0.2)'],
                borderWidth: 1
              },
              {
                label: 'Debt',
                data: summaryData.debt,
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderWidth: 1
              },
              {
                label: '401(k)',
                data: summaryData.investments,
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
                    labelString: 'Years'
                  }
                },
              ],
              yAxes: [
                {
                  ticks: {
                    suggestedMin: 0
                  }
                }
              ]
            }
          }}
        />
      </Box>
    )

  return (
    <Grid
      id="summary-wrapper"
      container
      direction="column"
      justify="space-between"
      alignItems="center">
      {/* {process.env.NODE_ENV === 'development' && (
        <Typography>
          {JSON.stringify(summaryData)}
          <br />
          {'years: ' + JSON.stringify(years)}
        </Typography>
      )} */}
      <Grid
        id="summary-upper-group"
        item
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start">
        <Grid id="summary-text-wrapper" item>
          {renderSummaryText()}
        </Grid>
        <Grid id="summary-doughnut-wrapper" item>
          {renderDoughnutGraph()}
        </Grid>
      </Grid>
      <Grid id="summary-lower-group" item>
        {renderLineGraph()}
      </Grid>
    </Grid>
  )
}

export default Summary
