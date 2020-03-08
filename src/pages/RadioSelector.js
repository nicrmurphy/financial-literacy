import React, { useState, Fragment } from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
} from '@material-ui/core'

function RadioSelector({ name, options, selected, complete, prompt, flavorText, color }) {
  const [value, setValue] = useState(selected)
  const handleChange = e => {
    setValue(parseInt(e.target.value))
    complete(parseInt(e.target.value))
  }

  return (
    <Fragment>
      {flavorText}
      <Typography variant="h5" style={{ padding: '10px' }}>
        {prompt}
      </Typography>
      <FormControl component="fieldset" width="500px">
        <FormLabel component="legend" color={color ? color : 'primary'}>{name}</FormLabel>
        <RadioGroup
          aria-label={name}
          name={name}
          value={value}
          onChange={handleChange}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio color={color ? color : 'primary'} />}
              label={option.label}
              checked={option.value === selected}
              disabled={option.disabled}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Fragment>
  )
}

export default RadioSelector
