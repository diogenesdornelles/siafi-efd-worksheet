/**
 * Extracts the first floating-point number from a string.
 * @param {string} str - The string from which to extract the number.
 * @returns {number|null} The extracted floating-point number, or null if no match is found.
 */
export default function extractFirstFloatNumberFromString(str) {
  /**
   * Replace commas with dots to handle decimal separators.
   * @type {string}
   */
  str = str.replace(',', '.');

  /**
   * Regular expression pattern to match a floating-point number.
   * @type {RegExp}
   */
  const regex = /[+-]?\d+(\.\d+)?/g;

  /**
   * First match found in the string using the regular expression.
   * @type {string[]|null}
   */
  const match = str.match(regex);

  /**
   * Convert the match to a floating-point number or return null if no match is found.
   * @type {number|null}
   */
  return match ? parseFloat(match[0]) : null;
}
