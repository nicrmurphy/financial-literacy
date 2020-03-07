import React from 'react'
import { Box, Typography } from '@material-ui/core'

/**
 * title: title text
 * titleVariant: h1, h2, ..., h6
 * desc: page block text
 * descVariant: body1, body2
 * content: additional component(s) to be appended 
 * @param {Object} props 
 */
function InfoPage(props) {
  props.complete()
  return (
    <Box>
      <Typography className="title" variant={props.titleVariant || 'h4'}>{props.title}</Typography>
      <Typography className="description" variant={props.descVariant || 'body1'}>{props.desc}</Typography>
      {props.content}
    </Box>
  )
}

export default InfoPage
