import React, { Fragment } from 'react'
import { AppBar, Typography, Box } from '@material-ui/core'
import './styles/DevBanner.css'

function DevBanner() {
  return (
    <Fragment>
      {process.env.NODE_ENV !== 'production' && (
        <Box>
          <AppBar
            position="static"
            style={{ minHeight: '2em', backgroundColor: 'green' }}>
            <Typography variant="h5" style={{ marginTop: '.5vh', fontSize: '2em' }}>
              Running in Development Mode{' '}
              <span id="full-banner-text">on {window.location.href}</span>
            </Typography>
          </AppBar>
        </Box>
      )}
    </Fragment>
  )
}

export default DevBanner
