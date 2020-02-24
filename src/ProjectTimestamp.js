import React, { Fragment } from 'react'
import timestamp from './most-recent-commit.js'

const getTimestamp = () => {
  let d = new Date(timestamp)
  return d.toLocaleString()
}

function ProjectTimestamp() {
  return <Fragment><strong>{getTimestamp()}</strong></Fragment>
}

export default ProjectTimestamp
