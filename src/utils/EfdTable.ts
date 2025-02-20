import validateColumns from './validateColumns';
import getTableFromExcel from './getTableFromExcel';
import roundToNearestTwoDecimals from './roundToNearestTwoDecimals';

import extractFirstFloatNumberFromString from './extractFirstFloatNumberFromString';
import sanitizeColumns from './sanitizeColumns';
import extractNumberFromString from './extractNumberFromString';


interface EfdRow {
  [key: string]: string | number;
  cnpj: string | number;
  valor: string | number;
}

interface ValueAndCnpj {
  cnpj: number;
  value: number;
}

export default class EfdTable {
  public necesseryHeaders: string[];
  public rows: EfdRow[];
  public isValid: boolean;
  public cnpjs: number[];
  public valuesAndCnpjs: ValueAndCnpj[];
  public totalValue: number;

  constructor(binaryStr: string) {
    // Cabeçalhos necessários para a tabela.
    this.necesseryHeaders = ['cnpj', 'cno', 'valor'];

    // Obtém as linhas da tabela a partir do binário.
    this.rows = sanitizeColumns(getTableFromExcel(binaryStr)) as EfdRow[];

    // Valida as colunas necessárias.
    this.isValid = validateColumns(this.rows, this.necesseryHeaders);

    // Extrai os CNPJs e os valores.
    this.cnpjs = this.#getCnpjs();
    this.valuesAndCnpjs = this.#getCnpjAndValues();
    this.totalValue = this.#getTotalValue();
  }

  /**
   * Extrai os CNPJs únicos das linhas.
   * @returns {number[]} Array de CNPJs.
   */
  #getCnpjs(): number[] {
    let cnpjs: number[] = [];
    this.rows.forEach((row) => {
      if (typeof row.cnpj === 'string') {
        cnpjs.push(extractNumberFromString(row.cnpj));
      } else {
        cnpjs.push(row.cnpj as number);
      }
    });
    // Ordena os números e remove duplicatas.
    cnpjs.sort((a, b) => a - b);
    cnpjs = Array.from(new Set(cnpjs));
    return cnpjs;
  }

  /**
   * Extrai os valores e respectivos CNPJs das linhas.
   * @returns {ValueAndCnpj[]} Array de objetos contendo cnpj e valor.
   */
  #getCnpjAndValues(): ValueAndCnpj[] {
    const valuesAndCnpjs: ValueAndCnpj[] = [];
    this.cnpjs.forEach((cnpj) => {
      let value = 0;
      this.rows.forEach((row) => {
        // Compara os CNPJs convertendo ambos para número.
        if (
          Number(cnpj) === Number(
            extractNumberFromString(String(row.cnpj))
          )
        ) {
          if (typeof row.valor === 'string') {
            const firstFloat = extractFirstFloatNumberFromString(row.valor);
            value += firstFloat ? firstFloat : 0.0;
          } else {
            value += parseFloat(String(row.valor));
          }
        }
      });
      value = roundToNearestTwoDecimals(value);
      valuesAndCnpjs.push({
        cnpj,
        value: parseFloat(String(value)),
      });
    });
    return valuesAndCnpjs;
  }

  /**
   * Calcula o valor total a partir dos valores extraídos.
   * @returns {number} O valor total.
   */
  #getTotalValue(): number {
    let total = 0;
    this.valuesAndCnpjs.forEach((item) => {
      total += item.value;
    });
    return roundToNearestTwoDecimals(total);
  }
}
