import { getStudentLoanAnnual } from './constants'

export function calculateSummary({ salary, studentLoan, apartment, car }) {
  console.log('calculating summary...')
  /* calculations for one year */
  // calculate net income
  const taxRate = 0.75 // income tax, property tax, etc
  const miscCostRate = 0.7 // miscellaneous costs and purchases
  const netIncome = salary * taxRate * miscCostRate
  // calculate total expenses
  const retirementContributionPercent = 0.1 // 10% of salary
  const investments = salary * retirementContributionPercent
  const studentLoanAnnual = getStudentLoanAnnual(studentLoan)
  const apartmentAnnual = apartment * 12
  const totalExpenses =
    investments + studentLoanAnnual + apartmentAnnual + car

  return { netIncome: netIncome, totalExpenses: totalExpenses, investments: investments }
}
