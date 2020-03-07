/**
 * Format a given number to a currency format
 *  ex: toCurrency(1234) -> $1,234
 * @param {Number} n 
 */
// TODO: fix decimal rounding bug
export const toCurrency = n => `$${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`

/**
 * Returns a random credit score.
 */
export const getRandomCreditScore = () => {
  const [min, max] = [350, 850]
  return Math.floor(Math.random() * Math.floor((max + 1) - min)) + min
}

/**
 * Returns a string describing the quality of a given credit score.
 */
export const evaluateCreditScore = creditScore => {
  const [min, max] = [350, 850]
  if (creditScore < (max - min) / 3 + min) return 'poor'
  if (creditScore < (max - min) * 2 / 3 + min) return 'fair'
  else return 'great'
}

/**
 * Return the color for typography of a given score.
 */
export const getCreditQualityColor = creditScore => {
  switch (evaluateCreditScore(creditScore)) {
    case 'poor':
      return '#e91e63'
    case 'fair':
      return '#ffc107'
    case 'great':
      return '#8bc34a'
    default:
      return ''
  }
}