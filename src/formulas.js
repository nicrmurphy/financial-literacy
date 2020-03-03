import { getStudentLoanAnnual } from './constants'

/**
 * Returns an object containing calculated income, expenses, and investments
 * @param {Object} choices input data from user choices
 * @param {Number} years the number of years to calculate for
 */
export function calcSummary({ salary, investmentPercentage, studentLoan, apartment, car }, years) {
  salary += (salary * .01 * Math.max(years - 1, 0)) // after first year, raise salary by 1% annually
  console.log('salary: ', salary, 'years: ', years)
  
  // calculate net income
  const taxRate = 0.75 // income tax, property tax, etc
  const miscCostRate = 0.7 // miscellaneous costs and purchases
  const netIncome = salary * taxRate * miscCostRate * years

  // calculate total expenses
  const retirementContributionPercent = investmentPercentage // % of salary
  const investments = salary * retirementContributionPercent * years
  const studentLoanAnnual = years <= studentLoan ? getStudentLoanAnnual(studentLoan) : 0
  const apartmentAnnual = apartment * 12
  const carPayment = years === 1 ? car : 0  // car is one-time payment
  const totalExpenses = 
    (studentLoanAnnual + apartmentAnnual) * years + investments + carPayment

  return { netIncome: netIncome, totalExpenses: totalExpenses, investments: investments }
}
