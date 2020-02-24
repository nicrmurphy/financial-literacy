import React, { Fragment } from 'react'
import timestamp from './most-recent-commit.js'
import { Link } from '@material-ui/core'

const getTimestamp = () => {
  let d = new Date(timestamp)
  return d.toLocaleString()
}

function ProjectTimestamp() {
  return (
    <Fragment>
      <Link
        href="https://github.com/nicrmurphy/financial-literacy/commits/master"
        target="_blank"
        rel="noreferrer">
        {getTimestamp()}
      </Link>
    </Fragment>
  )
}

export default ProjectTimestamp
