import { getStudentLoanAnnual } from './constants'

export const presentValue = (n, years) => n / Math.pow(1.0322, years)

/**
 * Returns an object containing calculated income, expenses, and investments
 * @param {Object} choices input data from user choices
 * @param {Number} years the number of years to calculate for
 */
export function calcSummary({ salary, investmentPercentage, studentLoan, apartment, car }, years) {
  salary += (salary * .01 * Math.max(years - 1, 0)) // after first year, raise salary by 1% annually
  // console.log('salary: ', salary, 'years: ', years)
  
  // calculate net income
  const taxRate = 0.75 // income tax, property tax, etc
  const miscCostRate = 0.5 // miscellaneous costs and purchases
  const netIncome = salary * taxRate * miscCostRate * years

  // calculate total expenses
  const retirementContributionPercent = investmentPercentage // % of salary
  const investmentsBeforeInterest = salary * retirementContributionPercent * years
  const investments = investmentsBeforeInterest * Math.pow(1.06, years) - investmentsBeforeInterest

  const studentLoanAnnual = years <= studentLoan ? getStudentLoanAnnual(studentLoan) : 0
  const apartmentAnnual = apartment * 12
  const carPayment = years === 1 ? car : 0  // car is one-time payment
  const totalExpenses = 
    (studentLoanAnnual + apartmentAnnual) * years + investmentsBeforeInterest + carPayment

  return {
    // netIncome: netIncome, years,
    // totalExpenses: totalExpenses, years,
    // investments: investments, years
    netIncome: presentValue(netIncome, years),
    totalExpenses: presentValue(totalExpenses, years),
    investments: presentValue(investments, years)
  }
}

/**
 * Term Life: 1324 / year
 * Full Life: 9198 / year
 */