import validateColumns from './validateColumns';
import getTableFromExcel from './getTableFromExcel';
import roundToNearestTwoDecimals from './roundToNearestTwoDecimals';
import extractNumberFromString from './extractNumberFromString';
import extractFirstFloatNumberFromString from './extractFirstFloatNumberFromString';

/**
 * Class Represents an EfdTable entity.
 * @constructor
 */
export default class EfdTable {
  /**
   * Creates an instance of EfdTable.
   * @param {string} binaryStr - The binary string from excel efd worksheet.
   */
  constructor(binaryStr) {
    /**
     * Necessary headers for the table.
     * @type {Array<String>}
     */
    this.necesseryHeaders = ['cnpj', 'cno', 'valor'];

    /**
     * Rows of the table.
     * @type {Array<Object>}
     */
    this.rows = getTableFromExcel(binaryStr);

    /**
     * Flag indicating if the table is valid.
     * @type {boolean}
     */
    this.isValid = validateColumns(this.rows, this.necesseryHeaders);

    /**
     * CNPJs extracted from the rows.
     * @private
     * @type {Array<Number>}
     */
    this.cnpjs = this.#getCnpjs();

    /**
     * Values and CNPJs extracted from the rows.
     * @private
     * @type {Array<{ cnpj: number, value: number }>}
     */
    this.valuesAndCnpjs = this.#getCnpjAndValues();

    /**
     * Total value calculated from the rows.
     * @private
     * @type {number}
     */
    this.totalValue = this.#getTotalValue();
  }

  /**
   * Private method to extract CNPJs from the rows.
   * @private
   * @returns {{Array<Number>}} The array of CNPJs.
   */
  #getCnpjs() {
    let cnpjs = [];
    this.rows.forEach((row) => {
      if (typeof row.cnpj === 'string') {
        cnpjs.push(extractNumberFromString(row.cnpj));
      } else {
        cnpjs.push(row.cnpj);
      }
    });
    cnpjs.sort();
    cnpjs = new Set(cnpjs);
    cnpjs = Array.from(cnpjs);
    return cnpjs;
  }

  /**
   * Private method to extract values and CNPJs from the rows.
   * @private
   * @returns {Array<{ cnpj: number, value: number }>} The array of values and CNPJs.
   */
  #getCnpjAndValues() {
    let valuesAndCnpjs = [];
    this.cnpjs.forEach((cnpj) => {
      let value = 0;
      this.rows.forEach((row) => {
        if (Number(cnpj) === Number(row.cnpj)) {
          if (typeof row.valor === 'string') {
            value += extractFirstFloatNumberFromString(row.valor);
          } else {
            value += parseFloat(row.valor);
          }
        }
      });
      value = roundToNearestTwoDecimals(value);
      valuesAndCnpjs.push({
        cnpj,
        value: parseFloat(value),
      });
    });
    return valuesAndCnpjs;
  }

  /**
   * Private method to calculate the total value from the values and CNPJs.
   * @private
   * @returns {number} The total value.
   */
  #getTotalValue() {
    let total = 0;
    this.valuesAndCnpjs.forEach((efd) => {
      total += efd.value;
    });
    return roundToNearestTwoDecimals(total);
  }
}
