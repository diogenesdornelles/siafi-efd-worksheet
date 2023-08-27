/**
 * Extracts a number from a string.
 * @param {string} str - The string from which to extract the number.
 * @returns {number} The extracted number.
 */
export default function extractNumberFromString(str) {
  /**
   * Regular expression pattern to match one or more digits.
   * @type {RegExp}
   */
  const regex = /\d+/g;

  /**
   * Matches found in the string using the regular expression.
   * @type {string[]}
   */
  const matches = str.match(regex);

  /**
   * Join the matches and parse the resulting string to an integer.
   * @type {number}
   */
  return parseInt(matches.join(''));
}
