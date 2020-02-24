import React, { Fragment } from 'react'
import timestamp from './most-recent-commit.js'

const getTimestamp = () => {
  return timestamp
}

function ProjectTimestamp() {
  return <Fragment><strong>{getTimestamp()}</strong></Fragment>
}

export default ProjectTimestamp
