import React, {  } from 'react'
import { Box, Button, Link } from '@material-ui/core'
import ProjectTimestamp from '../ProjectTimestamp'
import logo from '../logo.png'

function Welcome(props) {
  const blusGoldLink = (
    <Link href="https://blusgold.com/" target="_blank" rel="noopener noreferrer">
      Blu'$ Gold
    </Link>
  )

  const sourceCodeLink = (
    <Link
      href="https://github.com/nicrmurphy/financial-literacy"
      target="_blank"
      rel="noopener noreferrer">
      here
    </Link>
  )

  return (
    <Box>
      <p id="welcome-text">
        Welcome to the simulation! This app is in active development. For
        comments or inquiries, please contact {blusGoldLink}. The source code
        for this app can be found {sourceCodeLink}. Most recent update was{' '}
        <ProjectTimestamp />.
      </p>
      <img id="blusgold-logo" src={logo} alt="Blu$ Gold logo"></img>
      <br />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '75px' }}
        onClick={() => props.nextPage()}>
        Begin!
      </Button>
    </Box>
  )
}

export default Welcome
