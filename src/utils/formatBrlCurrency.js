/**
 * Retrieves a string represents Brl currency format.
 * @param {number} value - The value to be converted.
 * @returns {string} The value formated R$ xx,xx.
 */

const formatBrlCurrency = (value) => {
  /**
   * @type {string} value converted.
   */
  const newValue = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return newValue;
};

export default formatBrlCurrency;
