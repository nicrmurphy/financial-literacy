import React, { useState, Fragment } from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
} from '@material-ui/core'

function Salary() {
  const [value, setValue] = useState(null)
  const handleChange = e => {
    setValue(e.target.value)
  }

  return (
    <Fragment>
      <Typography variant="h5" style={{padding: '10px'}}>What is your...</Typography>
      <FormControl component="fieldset" width="500px">
        <FormLabel component="legend">Salary</FormLabel>
        <RadioGroup
          aria-label="salary"
          name="salary"
          value={value}
          onChange={handleChange}>
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="$1.00"
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label="$2.00"
          />
          <FormControlLabel
            value="3"
            control={<Radio color="primary" />}
            label="$3.00"
          />
        </RadioGroup>
      </FormControl>
    </Fragment>
  )
}

export default Salary
