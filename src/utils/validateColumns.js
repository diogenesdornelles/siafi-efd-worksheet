

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

  for (const header of headers) {
    if (!necesseryHeaders.includes(header.toLowerCase().trim().replace(' ', ''))) {
      return false;
    }
  }
  return true
}
