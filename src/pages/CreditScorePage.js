import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import InfoPage from './InfoPage'
import { evaluateCreditScore, getCreditQualityColor } from '../tools'

function CreditScorePage({ creditScore, complete }) {
  return (
    <InfoPage
      content={
        <Fragment>
          <Typography
            variant="h4"
            color="primary"
            style={{ marginTop: '.5em', fontWeight: 'bold' }}>
            WE ARE {evaluateCreditScore(creditScore) === 'great' ? 'PLEASED' : 'HERE'} TO INFORM YOU THAT YOUR CREDIT SCORE IS...{' '}
            <span
              style={{
                fontWeight: 'bolder',
                color: getCreditQualityColor(creditScore)
              }}>
              {creditScore}
            </span>
          </Typography>
          <Typography
            variant="h4"
            color="primary"
            style={{
              marginTop: '1em',
              marginBottom: '1em',
              fontWeight: 'bold'
            }}>
            THAT IS{' '}
            <span
              style={{
                fontWeight: 'bolder',
                color: getCreditQualityColor(creditScore)
              }}>
              {evaluateCreditScore(creditScore).toUpperCase()}
            </span>
          </Typography>
        </Fragment>
      }
      complete={complete}
    />
  )
}

export default CreditScorePage
