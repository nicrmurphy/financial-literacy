import { toCurrency } from './tools'

export const ageOffset = 20 // ex: if 20 => simulation starts at age = 21
export const ageGroups = {
  one: {
    start: 0,
    end: 15
  },
  two: {
    start: 15,
    end: 30
  },
  three: {
    start: 30,
    end: 45
  }
}

export const cheatChoices = {
  salary: 42000,
  investmentPercentage: 0.1,
  studentLoanYears: 10,
  apartment: 1000,
  carLoanYears: 10,
  fancyCarLoanYears: 5
}

export const options = {
  salary: [
    { value: 42000, label: '$42,000' }
  ],
  studentLoanYears: [
    { value: 10, label: '10 years ($3,360 / year)' },
    { value: 15, label: '15 years ($2,664 / year)' },
    { value: 20, label: '20 years ($2,292 / year)' }
  ],
  carLoanYears: [
    { value: 5, label: '$3,000 ($648 / year for 5 years)' },
    { value: 10, label: '$10,000 ($1,164 / year for 10 years)' },
    { value: 15, label: '$18,000 ($1,500 / year for 15 years)' }
  ],
  apartment: [
    { value: 300, label: '$300 / month' },
    { value: 600, label: '$600 / month' },
    { value: 1000, label: '$1,000 / month' }
  ],
  fancyCarLoanYears: [ // TODO: add interest
    { value: 5, label: `$13,000 (${toCurrency(13000/5)} / year for 5 years)` },
    { value: 10, label: `$24,225 (${toCurrency(24225/10)} / year for 10 years)` },
    { value: 15, label: `$33,650 (${toCurrency(33650/15)} / year for 15 years)` }
  ]
}

export const getStudentLoanAnnual = years => {
  switch (years) {
    case 10:
      return 3360
    case 15:
      return 2264
    case 20:
      return 2292
    default:
      return 0
  }
}

export const getCarLoanAnnual = years => {
  switch (years) {
    case 5:
      return 648
    case 10:
      return 1164
    case 15:
      return 1500
    default:
      return 0
  }
}

export const getFancyCarLoanAnnual = years => {
  switch (years) {
    case 5:
      return 13000/5
    case 10:
      return 24225/10
    case 15:
      return 33650/15
    default:
      return 0
  }
}