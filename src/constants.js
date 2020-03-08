import { toCurrency, getRandomCreditScore } from './tools'

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
export const mortgageYears = 20 // length of your mortgage contract

export const cheatChoices = {
  salary: 42000,
  investmentPercentage: 0.1,
  studentLoanYears: 10,
  apartment: 1000,
  carLoanYears: 10,
  fancyCarLoanYears: 5,
  creditScore: getRandomCreditScore(),
  mortgage: 100000,
  healthInsurance: 3600
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
  ],
  mortgage: { // mortgages are 20 years; object is broken up by quality of credit score
    great: [
      { value: 100000, label: `${toCurrency(100000)} home (${toCurrency(5724)} / year)`, annual: 5724 },
      { value: 200000, label: `${toCurrency(200000)} home (${toCurrency(11460)} / year)`, annual: 11460 },
      { value: 400000, label: `${toCurrency(400000)} home (${toCurrency(22920)} / year)`, annual: 22920 }
    ],
    fair: [
      { value: 100000, label: `${toCurrency(100000)} home (${toCurrency(6444)} / year)`, annual: 6444 },
      { value: 200000, label: `${toCurrency(200000)} home (${toCurrency(12888)} / year)`, annual: 12888 },
      { value: 400000, label: `${toCurrency(400000)} home (${toCurrency(25764)} / year)`, annual: 25764 }
    ],
    poor: [
      { value: 100000, label: `${toCurrency(100000)} home (${toCurrency(7200)} / year)`, annual: 7200 },
      { value: 200000, label: `${toCurrency(200000)} home (${toCurrency(14388)} / year)`, annual: 14388 },
      { value: 400000, label: `${toCurrency(400000)} home (${toCurrency(28776)} / year)`, annual: 28776 }
    ]
  },
  homeInsurance: [
    { value: 100000, label: `${toCurrency(100000)} home (${toCurrency(600)} / year)`, annual: 600 },
    { value: 200000, label: `${toCurrency(200000)} home (${toCurrency(1200)} / year)`, annual: 1200 },
    { value: 400000, label: `${toCurrency(400000)} home (${toCurrency(2400)} / year)`, annual: 2400 }
  ],
  healthInsurance: [
    { value: 2400, label: `${toCurrency(2400)} / year` },
    { value: 3600, label: `${toCurrency(3600)} / year` },
    { value: 4800, label: `${toCurrency(4800)} / year` }
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