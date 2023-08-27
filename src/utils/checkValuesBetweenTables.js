import roundToNearestTwoDecimals from './roundToNearestTwoDecimals';

/**
 * Returns the distincts values between tables.
 * @param {Array<{collector: number, value: number}>} siafiValues - Array of cnpj in siafi.
 * @param {Array<{cnpj: number, value: number}>} efdValues - Array of cnpj in efd.
 * @returns {Array<{ collector: number, valueSiafi: number, valueEfd: number, indexes: {indexEfd, indexSiafi} }> | Array[]} - Array of ocurrences.
 */

export default function checkValuesBetweenTables(siafiValues, efdValues) {
  /**
   * @type {Array}
   */
  const errors = [];
  efdValues.forEach((efd, indexEfd) => {
    siafiValues.forEach((siafi, indexSiafi) => {
      if (efd.cnpj === siafi.collector && efd.value !== siafi.value) {
        let difference = parseFloat(
          roundToNearestTwoDecimals(siafi.value - efd.value),
        );
        errors.push({
          collector: efd.cnpj,
          valueSiafi: siafi.value,
          valueEfd: efd.value,
          difference,
          indexes: {
            indexEfd,
            indexSiafi,
          },
        });
      }
    });
  });

  return errors;
}
