import roundToNearestTwoDecimals from './roundToNearestTwoDecimals';

interface SiafiValue {
  collector: number;
  value: number;
}

interface EfdValue {
  cnpj: number;
  value: number;
}

interface CheckValuesError {
  collector: number;
  valueSiafi: number;
  valueEfd: number;
  difference: number;
  indexes: {
    indexEfd: number;
    indexSiafi: number;
  };
}

export default function checkValuesBetweenTables(
  siafiValues: SiafiValue[],
  efdValues: EfdValue[]
): CheckValuesError[] {
  const errors: CheckValuesError[] = [];

  efdValues.forEach((efd, indexEfd) => {
    siafiValues.forEach((siafi, indexSiafi) => {
      if (efd.cnpj === siafi.collector && efd.value !== siafi.value) {
        const difference = roundToNearestTwoDecimals(siafi.value - efd.value);
        errors.push({
          collector: efd.cnpj,
          valueSiafi: siafi.value,
          valueEfd: efd.value,
          difference,
          indexes: { indexEfd, indexSiafi },
        });
      }
    });
  });

  return errors;
}
