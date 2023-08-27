/**
 * Represents the state of the application.
 * @typedef {Object} AppState
 * @property {string} binaryStrSiafi - The binary string for Siafi.
 * @property {string} binaryStrEfdReinf - The binary string for EfdReinf.
 * @property {string} siafiFile - The Siafi file.
 * @property {string} efdFile - The Efd file.
 * @property {Array<Object>} differentValues - Array of different values.
 * @property {string} siafiTotalValue - The total value for Siafi.
 * @property {string} efdTotalValue - The total value for EfdReinf.
 * @property {string} totalValueDifference - The difference in total values.
 * @property {Array<Object>} cnpjErrors - Array of CNPJ errors.
 * @property {Array<{ collector: number, value: number, documents: Array<{document: string, value: number, partialSum: number}> }>} siafiValuesByCollectors - Array of Siafi values and collectors.
 * @property {Array<Object>} efdValuesAndCnpjs - Array of EfdReinf values and CNPJs.
 */
export const AppState = {
  binaryStrSiafi: '',
  binaryStrEfdReinf: '',
  siafiFile: '',
  efdFile: '',
  differentValues: [],
  siafiTotalValue: '',
  efdTotalValue: '',
  totalValueDifference: '',
  cnpjErrors: [],
  siafiValuesByCollectors: [],
  efdValuesAndCnpjs: [],
};
