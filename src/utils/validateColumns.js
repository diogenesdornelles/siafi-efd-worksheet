/**
 * Validate headers from worksheets.
 *
 * @param {Array<Object>} excelRows - The rows from worksheet.
 * @param {Array<String>} necesseryHeaders - The string list of all necessary headers.
 * @returns {boolean} -
 */

export default function validateColumns(excelRows, necesseryHeaders) {
  let columns;
  let i = 0;
  let maj;
  /**
   * Find major row.
   */
  excelRows.forEach((row, index) => {
    columns = Object.keys(row).length;
    if (columns > i) {
      i = columns;
      maj = index;
    }
  });
  /**
   * Extract all keys from major row.
   * @type {Array<Number>}
   */
  let headers = Object.keys(excelRows[maj]);
  /**
   * Check if the headers has empty values.
   */
  headers = headers.filter((item) => item !== '__EMPTY');
  /**
   * Check if headers and necessary headers are identicals.
   */
  if (
    headers.sort().join('').toLowerCase().trim().replace(' ', '') !==
    necesseryHeaders.sort().join('').toLowerCase().trim().replace(' ', '')
  ) {
    return false;
  } else return true;
}
