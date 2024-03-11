import validateColumns from './validateColumns';
import getTableFromExcel from './getTableFromExcel';
import roundToNearestTwoDecimals from './roundToNearestTwoDecimals';
import extractNumberFromString from './extractNumberFromString';
import extractFirstFloatNumberFromString from './extractFirstFloatNumberFromString';
import sortDocuments from './sortDocuments';
import getPartialSum from './getPartialSum';
import sanitizeColumns from './sanitizeColumns';

/**
 * Class Represents a SiafiTable entity.
 * @constructor
 */
export default class SiafiTable {
  /**
   * Creates an instance of SiafiTable.
   * @param {string} binaryStr - The binary string.
   */
  constructor(binaryStr) {
    /**
     * Necessary headers for the table.
     * @type {Array<string>}
     */
    this.necesseryHeaders = ['recolhedor', 'documento', 'valor'];

    /**
     * Rows of the table.
     * @type {Array<Object>}
     */
    this.rows = getTableFromExcel(binaryStr);
    this.rows = sanitizeColumns(this.rows);

    /**
     * Flag indicating if the table is valid.
     * @type {boolean}
     */
    this.isValid = validateColumns(this.rows, this.necesseryHeaders);

    /**
     * Collectors extracted from the rows.
     * @private
     * @type {Array<Number>}
     */
    this.collectors = this.#getCollectors();

    /**
     * Values and collectors extracted from the rows.
     * @private
     * @type {Array<{ collector: number, value: number, documents: Array<{document: string, value: number, partialSum: number}> }>}
     */
    this.valuesByCollectors = this.#getValuesByCollectors();

    /**
     * Total value calculated from the rows.
     * @private
     * @type {number}
     */
    this.totalValue = this.#getTotalValue();
  }

  /**
   * Private method to extract collectors from the rows.
   * @private
   * @returns {Array<Number>} The array of collectors.
   */
  #getCollectors() {
    let collectors = [];
    this.rows.forEach((row) => {
      if (typeof row.recolhedor === 'string') {
        collectors.push(extractNumberFromString(row.recolhedor));
      } else {
        collectors.push(row.recolhedor);
      }
    });
    collectors.sort();
    collectors = new Set(collectors);
    collectors = Array.from(collectors);
    return collectors;
  }

  /**
   * Private method to extract values and collectors from the rows.
   * @private
   * @returns {Array<{ collector: number, value: number, documents: Array<{document: string, value: number, partialSum: number}> }>} The array of values and collectors.
   */
  #getValuesByCollectors() {
    let valuesByCollectors = [];
    this.collectors.forEach((collector) => {
      let value = 0;
      let documents = [];
      this.rows.forEach((row) => {
        if (collector === Number(extractNumberFromString(row.recolhedor))) {
          if (typeof row.valor === 'string') {
            value += extractFirstFloatNumberFromString(row.valor);
          } else {
            value += parseFloat(row.valor);
          }
          documents.push({
            document: row.documento,
            value,
          });
        }
      });
      documents = sortDocuments(documents);
      documents = getPartialSum(documents);
      value = roundToNearestTwoDecimals(value);
      valuesByCollectors.push({
        collector,
        value: parseFloat(value),
        documents: [...documents],
      });
    });
    return valuesByCollectors;
  }

  /**
   * Private method to calculate the total value from the values and collectors.
   * @private
   * @returns {number} The total value.
   */
  #getTotalValue() {
    let total = 0;
    this.valuesByCollectors.forEach((siafi) => {
      total += siafi.value;
    });
    return roundToNearestTwoDecimals(total);
  }
}
