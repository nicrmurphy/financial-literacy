import React, { useState, Fragment } from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
} from '@material-ui/core'

function RadioSelector({ name, options, selected, complete }) {
  const [value, setValue] = useState(selected)

  const handleChange = e => {
    setValue(parseInt(e.target.value))
    complete(parseInt(e.target.value))
  }

  return (
    <Fragment>
      <Typography variant="h5" style={{ padding: '10px' }}>
        What is your...
      </Typography>
      <FormControl component="fieldset" width="500px">
        <FormLabel component="legend">{name}</FormLabel>
        <RadioGroup
          aria-label={name}
          name={name}
          value={value}
          onChange={handleChange}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio color="primary" />}
              label={option.label}
              checked={option.value === selected}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Fragment>
  )
}

export default RadioSelector
