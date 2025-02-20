import validateColumns from './validateColumns';
import getTableFromExcel from './getTableFromExcel';
import roundToNearestTwoDecimals from './roundToNearestTwoDecimals';
import extractNumberFromString from './extractNumberFromString';
import extractFirstFloatNumberFromString from './extractFirstFloatNumberFromString';

import getPartialSum from './getPartialSum';
import sanitizeColumns from './sanitizeColumns';
import sortDocuments from './sortDocuments';

interface SiafiRow {
  recolhedor: string | number;
  documento: string;
  valor: string | number;
  [key: string]: string | number;
}

export interface SiafiDocument {
  document: string;
  value: number;
  partialSum: number;
}

export interface ValuesByCollector {
  collector: number;
  value: number;
  documents: SiafiDocument[];
}

export default class SiafiTable {
  public necesseryHeaders: string[];
  public rows: SiafiRow[];
  public isValid: boolean;
  public collectors: number[];
  public valuesByCollectors: ValuesByCollector[];
  public totalValue: number;

  constructor(binaryStr: string) {
    // Cabeçalhos necessários para a tabela.
    this.necesseryHeaders = ['recolhedor', 'documento', 'valor'];

    // Obtém as linhas da tabela a partir do Excel e sanitiza as chaves.
    this.rows = sanitizeColumns(getTableFromExcel(binaryStr)) as SiafiRow[];

    // Valida as colunas necessárias.
    this.isValid = validateColumns(this.rows, this.necesseryHeaders);

    // Extrai os coletores e os valores por coletor.
    this.collectors = this.#getCollectors();
    this.valuesByCollectors = this.#getValuesByCollectors();

    // Calcula o valor total.
    this.totalValue = this.#getTotalValue();
  }

  /**
   * Extrai os coletores únicos a partir das linhas.
   * @returns {number[]} Array de coletores.
   */
  #getCollectors(): number[] {
    let collectors: number[] = [];
    this.rows.forEach((row) => {
      if (typeof row.recolhedor === 'string') {
        collectors.push(extractNumberFromString(row.recolhedor));
      } else {
        collectors.push(row.recolhedor as number);
      }
    });
    // Ordena numericamente e remove duplicatas.
    collectors.sort((a, b) => a - b);
    collectors = Array.from(new Set(collectors));
    return collectors;
  }

  /**
   * Extrai os valores e documentos para cada coletor.
   * @returns {ValuesByCollector[]} Array contendo valores e documentos por coletor.
   */
  #getValuesByCollectors(): ValuesByCollector[] {
    const valuesByCollectors: ValuesByCollector[] = [];

    this.collectors.forEach((collector) => {
      let value = 0;
      let documents: SiafiDocument[] = [];

      this.rows.forEach((row) => {
        const rowCollector = extractNumberFromString(String(row.recolhedor));
        if (collector === rowCollector) {
          if (typeof row.valor === 'string') {
            const extracted = extractFirstFloatNumberFromString(row.valor);
            value += extracted !== null ? extracted : 0;
          } else {
            value += parseFloat(String(row.valor));
          }
          // Armazena o documento. O valor aqui pode representar o acumulado até o momento.
          documents.push({
            document: row.documento,
            value,
            partialSum: 0, // Será atualizado por getPartialSum.
          });
        }
      });

      // Ordena os documentos e calcula a soma parcial.
      documents = sortDocuments<SiafiDocument>(documents);
      documents = getPartialSum(documents);
      // Arredonda o valor acumulado e converte para número.
      value = roundToNearestTwoDecimals(value);
      valuesByCollectors.push({
        collector,
        value,
        documents: [...documents],
      });
    });

    return valuesByCollectors;
  }

  /**
   * Calcula o valor total a partir dos valores extraídos por coletor.
   * @returns {number} O valor total.
   */
  #getTotalValue(): number {
    let total = 0;
    this.valuesByCollectors.forEach((siafi) => {
      total += siafi.value;
    });
    return roundToNearestTwoDecimals(total);
  }
}
