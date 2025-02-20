/**
 * Rounds a number to the nearest two decimals.
 * @param number - The number to be rounded.
 * @returns The rounded number with two decimal places.
 */
export default function roundToNearestTwoDecimals(number: number): number {
    // Multiply the number by 100 to shift two decimal places to the left.
    const multipliedNumber: number = number * 100;
  
    // Extract the decimal part of the multiplied number.
    const decimalPart: number = multipliedNumber - Math.floor(multipliedNumber);
  
    // Check if the decimal part is greater than or equal to 0.5.
    if (decimalPart >= 0.5) {
      // If the decimal part is greater than or equal to 0.5,
      // round up the multiplied number to the next integer,
      // then divide it by 100 and fix it to 2 decimal places.
      return parseFloat((Math.ceil(multipliedNumber) / 100).toFixed(2));
    } else {
      // If the decimal part is less than 0.5,
      // round down the multiplied number to the current integer,
      // then divide it by 100 and fix it to 2 decimal places.
      return parseFloat((Math.floor(multipliedNumber) / 100).toFixed(2));
    }
  }
  