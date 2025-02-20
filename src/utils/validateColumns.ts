export default function validateColumns(
    excelRows: Array<Record<string, string | number>>,
    necesseryHeaders: string[]
  ): boolean {
    let columns: number;
    let maxColumns = 0;
    let maj = 0;
  
    // Encontra a linha com o maior número de colunas.
    excelRows.forEach((row, index) => {
      columns = Object.keys(row).length;
      if (columns > maxColumns) {
        maxColumns = columns;
        maj = index;
      }
    });
  
    // Extrai todas as chaves da linha com maior número de colunas.
    let headers = Object.keys(excelRows[maj]);
  
    // Filtra as chaves que não são '__EMPTY'.
    headers = headers.filter((item) => item !== '__EMPTY');
  
    // Verifica se cada header está presente em necesseryHeaders após tratamento.
    for (const header of headers) {
      const sanitizedHeader = header.toLowerCase().trim().replace(' ', '');
      if (!necesseryHeaders.includes(sanitizedHeader)) {
        return false;
      }
    }
    return true;
  }
  