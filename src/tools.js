/**
 * Format a given number to a currency format
 *  ex: toCurrency(1234) -> $1,234
 * @param {Number} n 
 */
// TODO: fix decimal rounding bug
export const toCurrency = n => `$${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`