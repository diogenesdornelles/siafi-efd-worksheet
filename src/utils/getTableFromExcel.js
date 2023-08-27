import XLSX from 'xlsx';

/**
 * Retrieves a table from an Excel file in binary string format.
 * @param {string} data - The binary string representation of the Excel file.
 * @returns {Array<Object>} An array of objects representing the rows of the table.
 */
export default function getTableFromExcel(data) {
  /**
   * Read the Excel file from the binary string data.
   * @type {XLSX.WorkBook}
   */
  const workbook = XLSX.read(data, {
    type: 'binary',
  });

  /**
   * Get the name of the first worksheet in the workbook.
   * @type {string}
   */
  const worksheet = workbook.SheetNames[0];

  /**
   * Convert the sheet to an array of objects representing the rows.
   * @type {Array<Object>}
   */
  const excelRows = XLSX.utils.sheet_to_row_object_array(
    workbook.Sheets[worksheet],
  );

  return excelRows;
}
