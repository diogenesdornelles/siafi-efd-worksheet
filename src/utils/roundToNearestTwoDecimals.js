/**
 * Rounds a number to the nearest two decimals.
 * @param {number} number - The number to be rounded.
 * @returns {string} The rounded number with two decimal places.
 */
export default function roundToNearestTwoDecimals(number) {
  /**
   * Multiply the number by 100 to shift two decimal places to the left.
   * @type {number}
   */
  const multipliedNumber = number * 100;

  /**
   * Extract the decimal part of the multiplied number.
   * @type {number}
   */
  const decimalPart = multipliedNumber - Math.floor(multipliedNumber);

  /**
   * Check if the decimal part is greater than or equal to 0.5.
   */
  if (decimalPart >= 0.5) {
    /**
     * If the decimal part is greater than or equal to 0.5,
     * round up the multiplied number to the next integer,
     * then divide it by 100 and fix it to 2 decimal places.
     * @type {string}
     */
    return (Math.ceil(multipliedNumber) / 100).toFixed(2);
  } else {
    /**
     * If the decimal part is less than 0.5,
     * round down the multiplied number to the current integer,
     * then divide it by 100 and fix it to 2 decimal places.
     * @type {string}
     */
    return (Math.floor(multipliedNumber) / 100).toFixed(2);
  }
}
