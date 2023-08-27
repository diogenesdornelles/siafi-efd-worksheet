/**
 * Actions for the application.
 * @typedef {Object} AppActions
 * @property {string} BINARYSTRSIAFI - Action for changing the binary string for Siafi.
 * @property {string} BINARYSTREFDREINF - Action for changing the binary string for EfdReinf.
 * @property {string} SIAFI_FILE - Action for changing the Siafi file.
 * @property {string} EFD_FILE - Action for changing the Efd file.
 * @property {string} DIFFERENT_VALUES - Action for changing the different values.
 * @property {string} EFD_TOTAL_VALUE - Action for changing the total value for EfdReinf.
 * @property {string} SIAFI_TOTAL_VALUE - Action for changing the total value for Siafi.
 * @property {string} TOTAL_VALUE_DIFFERENCE - Action for changing the difference in total values.
 * @property {string} CNPJ_ERRORS - Action for changing the CNPJ errors.
 * @property {string} SIAFI_VALUES_COLLECTORS - Action for changing the Siafi values and collectors.
 * @property {string} EFD_VALUES_CNPJS - Action for changing the EfdReinf values and CNPJs.
 */

/**
 * Actions for the application.
 * @type {AppActions}
 */
const AppActions = {
  BINARYSTRSIAFI: 'CHANGE_BINARYSTRSIAFI',
  BINARYSTREFDREINF: 'CHANGE_BINARYSTREFDREINF',
  SIAFI_FILE: 'CHANGE_SIAFI_FILE',
  EFD_FILE: 'CHANGE_EFD_FILE',
  DIFFERENT_VALUES: 'CHANGE_DIFFERENT_VALUES',
  EFD_TOTAL_VALUE: 'CHANGE_EFD_TOTAL_VALUE',
  SIAFI_TOTAL_VALUE: 'CHANGE_SIAFI_TOTAL_VALUE',
  TOTAL_VALUE_DIFFERENCE: 'CHANGE_TOTAL_VALUE_DIFFERENCE',
  CNPJ_ERRORS: 'CHANGE_CNPJ_ERRORS',
  SIAFI_VALUES_COLLECTORS: 'CHANGE_SIAFI_VALUES_COLLECTORS',
  EFD_VALUES_CNPJS: 'CHANGE_EFD_VALUES_CNPJS',
};

export default AppActions;
