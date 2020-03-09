import React from 'react'
import { Box, Button, Link } from '@material-ui/core'
import ProjectTimestamp from '../ProjectTimestamp'
import logo from '../logo.png'

function Welcome(props) {
  const blusGoldLink = (
    <Link
      href="https://blusgold.com/"
      target="_blank"
      rel="noopener noreferrer">
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
        Welcome! Aiming to simulate some of the most important financial
        decisions an individual will make, this app is a tool used in a
        financial literacy curriculum. For comments or inquiries, please contact{' '}
        {blusGoldLink}.{<br />}<br />The source code for this app can be found{' '}
        {sourceCodeLink}.{<br />}Last updated <ProjectTimestamp />.
      </p>
      <br />
      <img id="blusgold-logo" src={logo} alt="Blu$ Gold logo"/>
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
