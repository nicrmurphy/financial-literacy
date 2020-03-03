import React, { useState, Fragment } from 'react'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography
} from '@material-ui/core'

function InputSelector({ complete, incomplete }) {
  const [value, setValue] = useState('')

  const handleChange = e => {
    const value = Math.max(Math.min(parseInt(e.target.value), 100), 0)
    if (value || value === 0) {
      setValue(value)
      complete(value)
    } else {
      setValue('')
      incomplete()
    }
  }

  return (
    <Fragment>
      <Typography variant="h5" style={{ padding: '10px' }}>
        What percentage of your annual salary do you want to contribute to your 401(k)?
      </Typography>
      <FormControl component="fieldset" width="500px">
        {/* <FormLabel component="legend">{name}</FormLabel> */}
        <InputLabel htmlFor="retirement-percentage">Amount</InputLabel>
          <OutlinedInput
            id="retirement-percentage"
            value={value}
            onChange={e => handleChange(e)}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            labelWidth={60}
          />
      </FormControl>
    </Fragment>
  )
}

export default InputSelector
