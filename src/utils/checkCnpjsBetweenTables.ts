interface CnpjOccurrence {
    cnpj: number;
    worksheet: 'siafi' | 'efd';
    index: number;
  }
  
  export default function checkCnpjsBetweenTables(
    siafiCollectors: number[],
    efdCnpjs: number[]
  ): CnpjOccurrence[] {
    const result: CnpjOccurrence[] = [];
  
    // Verifica se algum CNPJ de siafi não está presente em efd
    siafiCollectors.forEach((element, index) => {
      if (!efdCnpjs.includes(element)) {
        result.push({
          cnpj: element,
          worksheet: 'siafi',
          index,
        });
      }
    });
  
    // Verifica se algum CNPJ de efd não está presente em siafi
    efdCnpjs.forEach((element, index) => {
      if (!siafiCollectors.includes(element)) {
        result.push({
          cnpj: element,
          worksheet: 'efd',
          index,
        });
      }
    });
  
    return result;
  }
  