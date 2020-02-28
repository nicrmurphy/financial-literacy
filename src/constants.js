export const options = {
  salary: [
    { value: 42000, label: '$42,000' }
  ],
  studentLoan: [
    { value: 10, label: '10 years ($3,360 / year)' },
    { value: 15, label: '15 years ($2,664 / year)' },
    { value: 20, label: '20 years ($2,292 / year)' }
  ],
  car: [
    { value: 3000, label: '$3,000' },
    { value: 10000, label: '$10,000' },
    { value: 18000, label: '$18,000' }
  ],
  apartment: [
    { value: 300, label: '$300 / month' },
    { value: 600, label: '$600 / month' },
    { value: 1000, label: '$1,000 / month' }
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