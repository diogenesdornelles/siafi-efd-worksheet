import { createContext } from 'react';

/**
 * App context.
 * @typedef {Object} AppContextType
 * @property {string} binaryStrSiafi - Binary string siafi worksheet.
 * @property {string} binaryStrEfdReinf - Binary str efd worksheet.
 * @property {string} siafiFile - Name worksheet siafi gived.
 * @property {string} efdFile - Name worksheet efd gived.
 * @property {Array<Object>} differentValues - Differents values between tables.
 * @property {string | number} siafiTotalValue - Total value of siafi table.
 * @property {string | number} efdTotalValue - Total value of efd table.
 * @property {string | number} totalValueDifference - Total value difference.
 * @property {Array<Object>} cnpjErrors - CNPJ numbers differents between tables.
 * @property {Array<Object>} siafiValuesAndCollectors - Contains values and cnpjs extracteds from siafi worksheet.
 * @property {Array<Object>} efdValuesAndCnpjs - Contains values and cnpjs extracteds from efd worksheet.
 */

/**
 * App context.
 * @type {AppContextType}
 */
export const AppContext = createContext();
