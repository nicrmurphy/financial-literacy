import React, { useState, Fragment } from 'react'
import {
  FormControl,
  TextField,
  InputAdornment,
  Typography
} from '@material-ui/core'
import { toCurrency } from '../tools'

function InputSelector({ name, salary, selected, complete, incomplete }) {
  const [value, setValue] = useState(selected)

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
        What percentage of your annual salary ({toCurrency(salary)}) do you want to contribute to your 401(k)?
      </Typography>
      <FormControl component="fieldset">
          <TextField
            id="retirement-percentage"
            value={value}
            label={name}
            onChange={e => handleChange(e)}
            variant="outlined"
            autoComplete="off"
            autoFocus
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
      </FormControl>
    </Fragment>
  )
}

export default InputSelector
