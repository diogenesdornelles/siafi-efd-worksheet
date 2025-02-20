/**
 * Extracts a number from a string.
 * @param str - The string from which to extract the number.
 * @returns The extracted number.
 */
export default function extractNumberFromString(str: string): number {
    const regex = /\d+/g;
    const matches = str.match(regex);
    // Se não houver correspondências, retorna NaN
    if (!matches) {
      return NaN;
    }
    return parseInt(matches.join(''), 10);
  }
  