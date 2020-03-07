import { getStudentLoanAnnual, getCarLoanAnnual } from './constants'

export const presentValue = (n, years) => {
  if (!years) throw Error('Years undefined')
  return n / Math.pow(1.0322, years)
}

const raiseSalary = (years, salary, percentage) => salary * Math.pow(1 + percentage, years)

const getInvestmentContributions = (years, salary, contributionPercentage) => {
  let total = 0
  let raisedSalary = salary
  for (let i = 0; i < years; i++) {
    total += raisedSalary * contributionPercentage
    raisedSalary = raiseSalary(i, salary, .01)
    // console.log('years: ', i, 'salary: ', raisedSalary)
  }
  return total
}

/**
 * Returns the total loan payments made over the course of a given number of years
 * @param {Number} years how many years to calculate for
 * @param {String} loanType the type of loan
 * @param {Number} carLoanYears length of loan
 */
const getLoanPayments = (years, loanType, loanYears) => {
  years = Math.min(years, loanYears) // total caps when loan is complete
  switch (loanType) {
    case 'car':
      return getCarLoanAnnual(loanYears) * years
    case 'student':
      return getStudentLoanAnnual(loanYears) * years
    default:
      return NaN
  }
}

/**
 * Returns the total loan payments remaining after a given number of years
 * @param {Number} years how many years to calculate for
 * @param {String} loanType the type of loan
 * @param {Number} carLoanYears length of loan
 */
const getLoanRemaining = (years, loanType, loanYears) =>
  getLoanPayments(loanYears, loanType, loanYears) - getLoanPayments(years, loanType, loanYears)

/**
 * Returns an object containing calculated income, expenses, debt and investments
 * @param {Object} choices input data from user choices
 * @param {Number} years the number of years to calculate for
 */
export function calcSummary({ salary, investmentPercentage, studentLoanYears, apartment, carLoanYears }, years) {
  const investmentContributions = getInvestmentContributions(years, salary, investmentPercentage)
  salary = raiseSalary(years, salary, .01) // after first year, raise salary by 1% annually
  
  /* calculate net income */
  const taxRate = 0.75 // income tax, property tax, etc
  const miscCostRate = 0.5 // miscellaneous costs and purchases
  const netIncome = salary * taxRate * miscCostRate * years

  /* calculate total expenses */
  const investments = investmentContributions * Math.pow(1.06, years) - investmentContributions // TODO: calculation might be wrong

  const studentLoanPayments = getLoanPayments(years, 'student', studentLoanYears)
  const apartmentPayments = apartment * 12 * years
  const carPayments = getLoanPayments(years, 'car', carLoanYears)
  const totalExpenses = 
    studentLoanPayments + apartmentPayments + carPayments + investmentContributions

  /* calculate total debt */
  const debt = getLoanRemaining(years, 'car', carLoanYears) + getLoanRemaining(years, 'student', studentLoanYears)
  // console.log(
  //   'Car Loan =>',
  //   'year:', years,
  //   'total:', getLoanPayments(carLoanYears, 'car', carLoanYears),
  //   'payment:', getLoanPayments(years <= carLoanYears ? 1 : 0, 'car', carLoanYears),
  //   'paid:', getLoanPayments(years, 'car', carLoanYears),
  //   'remaining:', getLoanRemaining(years, 'car', carLoanYears)
  // )
  // console.log(
  //   'Student Loan =>',
  //   'year:', years,
  //   'total:', getLoanPayments(studentLoanYears, 'student', studentLoanYears),
  //   'payment:', getLoanPayments(years <= studentLoanYears ? 1 : 0, 'student', studentLoanYears),
  //   'paid:', getLoanPayments(years, 'student', studentLoanYears),
  //   'remaining:', getLoanRemaining(years, 'student', studentLoanYears)
  // )

  return {
    netIncome: presentValue(netIncome, years),
    totalExpenses: presentValue(totalExpenses, years),
    debt: presentValue(debt, years),
    investments: presentValue(investments, years)
  }
}

/**
 * Term Life: 1324 / year
 * Full Life: 9198 / year
 */