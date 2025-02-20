/**
 * Retrieves a string representing BRL currency format.
 * @param value - The value to be converted.
 * @returns The value formatted as R$ xx,xx.
 */
const formatBrlCurrency = (value: number): string => {
    const newValue: string = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return newValue;
  };
  
  export default formatBrlCurrency;
  