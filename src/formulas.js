import { ageGroups, mortgageYears, getStudentLoanAnnual, getCarLoanAnnual, getFancyCarLoanAnnual, options } from './constants'
import { evaluateCreditScore } from './tools'

export const presentValue = (n, years) => {
  if (!years) throw Error('Years undefined')
  return n / Math.pow(1.0322, years)
}

export const debugLoanCalculations = (years, loanType, loanYears, loanStartYear) => {
  console.log(
    `${loanType} loan =>`,
    'year:', years,
    'total:', getLoanPayments(loanYears + loanStartYear, loanType, loanYears, loanStartYear),
    'payment:', getLoanPayments(years <= loanYears + loanStartYear && years > loanStartYear ?
      loanStartYear + 1 : 0, loanType, loanYears, loanStartYear),
    'paid:', getLoanPayments(years, loanType, loanYears, loanStartYear),
    'remaining:', getLoanRemaining(years, loanType, loanYears, loanStartYear)
  )
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

// TODO: clean up and avoid copied code; see TODO at bottom of page
const getMortgagePayments = (years, homeValue, loanStartYear, creditScore) => {
  if (years <= loanStartYear) return 0 // loan hasn't started yet
  years = Math.min(years, mortgageYears + loanStartYear) // total caps when loan is complete
  const annual = options.mortgage[evaluateCreditScore(creditScore)].find(mortgage => mortgage.value === homeValue).annual
  return annual * (years - loanStartYear)
}

const getMortgageRemaining = (years, homeValue, loanStartYear, creditScore) => {
  if (years <= loanStartYear) return 0 // loan hasn't started yet
  return getMortgagePayments(mortgageYears + loanStartYear, homeValue, loanStartYear, creditScore)
  - getMortgagePayments(years, homeValue, loanStartYear, creditScore)
}

/**
 * Returns the total loan payments made over the course of a given number of years
 * @param {Number} years how many years to calculate for
 * @param {String} loanType the type of loan
 * @param {Number} loanYears length of loan
 * @param {Number} loanStartYear what year the loan starts
 */
const getLoanPayments = (years, loanType, loanYears, loanStartYear) => {
  if (years <= loanStartYear) return 0 // loan hasn't started yet
  years = Math.min(years, loanYears + loanStartYear) // total caps when loan is complete
  switch (loanType) {
    case 'car':
      return getCarLoanAnnual(loanYears) * (years - loanStartYear)
    case 'student':
      return getStudentLoanAnnual(loanYears) * (years - loanStartYear)
    case 'fancy car':
      return getFancyCarLoanAnnual(loanYears) * (years  - loanStartYear)
      default:
        return NaN
      }
    }

/**
 * Returns the total loan payments remaining after a given number of years
 * @param {Number} years how many years to calculate for
 * @param {String} loanType the type of loan
 * @param {Number} loanYears length of loan
 * @param {Number} loanStartYear what year the loan starts
 */
const getLoanRemaining = (years, loanType, loanYears, loanStartYear) => {
  if (years <= loanStartYear) return 0 // loan hasn't started yet
  return getLoanPayments(loanYears + loanStartYear, loanType, loanYears, loanStartYear)
  - getLoanPayments(years, loanType, loanYears, loanStartYear)
}

/**
 * Returns an object containing calculated income, expenses, debt and investments
 * @param {Object} choices input data from user choices
 * @param {Number} years the number of years to calculate for
 */
export function calcSummary({ salary, investmentPercentage, studentLoanYears, apartment,
  carLoanYears, fancyCarLoanYears, mortgage: homeValue, creditScore }, years) {
  // console.log('calc year', years)
  const investmentContributions = getInvestmentContributions(years, salary, investmentPercentage)
  salary = raiseSalary(years, salary, .01) // after first year, raise salary by 1% annually
  
  /* calculate net income */
  const taxRate = 0.75 // income tax, property tax, etc
  const miscCostRate = 0.5 // miscellaneous costs and purchases
  const netIncome = salary * taxRate * miscCostRate * years

  /* calculate total expenses */
  const investments = investmentContributions * Math.pow(1.06, years) - investmentContributions // TODO: calculation might be wrong

  const studentLoanPayments = getLoanPayments(years, 'student', studentLoanYears, ageGroups.one.start)
  const apartmentPayments = apartment * 12 * years
  const carPayments =
    getLoanPayments(years, 'car', carLoanYears, ageGroups.one.start)
    + getLoanPayments(years, 'fancy car', fancyCarLoanYears, ageGroups.two.start)
  const mortgagePayments = getMortgagePayments(years, homeValue, ageGroups.two.start, creditScore)
  const totalExpenses = 
  studentLoanPayments + apartmentPayments + carPayments + investmentContributions + mortgagePayments
  
  /* calculate total debt */
  const debt =
  getLoanRemaining(years, 'car', carLoanYears, ageGroups.one.start)
  + getLoanRemaining(years, 'student', studentLoanYears, ageGroups.one.start)
  + getLoanRemaining(years, 'fancy car', fancyCarLoanYears, ageGroups.two.start)
  + getMortgageRemaining(years, homeValue, ageGroups.two.start, creditScore)
  


  // debugLoanCalculations(years, 'car', carLoanYears, ageGroups.one.start)
  // debugLoanCalculations(years, 'student', studentLoanYears, ageGroups.one.start)
  // debugLoanCalculations(years, 'fancy car', fancyCarLoanYears, ageGroups.two.start)

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

 // BIG TODO: convert all the radio buttons and options in constants.js to use index as primary key instead of value