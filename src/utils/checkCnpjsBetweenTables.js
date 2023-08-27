/**
 * Returns the unique disjunction between cnpjs contained in the two lists.
 * @param {Array<Number>} siafiCollectors - Array of cnpj in siafi.
 * @param {Array<Number>} efdCnpjs - Array of cnpj in efd.
 * @returns {Array<{ cnpj: number, worksheet: string, index: number }> | Array[]} - Array of ocurrences.
 */

export default function checkCnpjsBetweenTables(siafiCollectors, efdCnpjs) {
  /**
   * Regular expression pattern to match a floating-point number.
   * @type {Array}
   */
  const result = [];
  /**
   * Check if some siafi collector is not present on worksheet efd.
   */
  /**
   * @param {number} element
   * @param {number} index
   */
  siafiCollectors.forEach(function (element, index) {
    if (!efdCnpjs.includes(element)) {
      result.push({
        cnpj: element,
        worksheet: 'siafi',
        index,
      });
    }
  });
  /**
   * Check if some efd cnpj is not present on worksheet siafi.
   */
  /**
   * @param {number} element
   * @param {number} index
   */
  efdCnpjs.forEach(function (element, index) {
    if (!siafiCollectors.includes(element)) {
      result.push({
        cnpj: element,
        worksheet: 'efd',
        index,
      });
    }
  });

  return result;
}
