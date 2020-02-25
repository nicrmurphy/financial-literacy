import React, { useState, Fragment } from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
} from '@material-ui/core'

function RadioSelector(props) {
  const [value, setValue] = useState(null)
  const handleChange = e => {
    setValue(parseInt(e.target.value))
    props.complete()
  }

  return (
    <Fragment>
      <Typography variant="h5" style={{ padding: '10px' }}>
        What is your...
      </Typography>
      <FormControl component="fieldset" width="500px">
        <FormLabel component="legend">{props.name}</FormLabel>
        <RadioGroup
          aria-label={props.name}
          name={props.name}
          value={value}
          onChange={handleChange}>
          {props.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio color="primary" />}
              label={option.label}
              checked={value === option.value}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Fragment>
  )
}

export default RadioSelector