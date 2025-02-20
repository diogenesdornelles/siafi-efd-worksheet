import * as XLSX from 'xlsx';

export default function getTableFromExcel(data: string): Array<Record<string, string | number>> {
  // Lê o arquivo Excel a partir da string binária.
  const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });

  // Obtém o nome da primeira planilha do workbook.
  const worksheetName: string = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];

  // Converte a planilha para um array de objetos.
  // A opção `defval` garante que células vazias sejam definidas como null (ou outro valor padrão)
  const excelRows: Array<Record<string, string | number>> = XLSX.utils.sheet_to_json(worksheet, { defval: null });
  
  return excelRows;
}