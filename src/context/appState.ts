// AppState.ts

// Definição de tipos mais específicos para as estruturas aninhadas
export interface DocumentItem {
  document: string;
  value: number;
  partialSum: number;
}

export interface SiafiValueByCollector {
  collector: number;
  value: number;
  documents: DocumentItem[];
}


export interface Difference {
  collector: number;
  valueSiafi: number;
  valueEfd: number;
  difference: number;
  indexes: {
    indexSiafi: number;
    indexEfd: number;
  };
}

export interface CnpjError {
  worksheet: 'efd' | 'siafi';
  cnpj: number;
  index: number;
}

export interface EfdValuesAndCnpjs {
  value: number;
  cnpj: number;
}

export interface AppState {
  binaryStrSiafi: string;
  binaryStrEfdReinf: string;
  siafiFile: string;
  efdFile: string;
  differentValues: Difference[]; // Pode ser refinado conforme necessário
  siafiTotalValue: number;
  efdTotalValue: number;
  totalValueDifference: number;
  cnpjErrors: CnpjError[]; // Pode ser refinado conforme necessário
  siafiValuesByCollectors: SiafiValueByCollector[];
  efdValuesAndCnpjs: EfdValuesAndCnpjs[]; // Pode ser refinado conforme necessário
}

export const AppState: AppState = {
  binaryStrSiafi: '',
  binaryStrEfdReinf: '',
  siafiFile: '',
  efdFile: '',
  differentValues: [],
  siafiTotalValue: 0,
  efdTotalValue: 0,
  totalValueDifference: 0,
  cnpjErrors: [],
  siafiValuesByCollectors: [],
  efdValuesAndCnpjs: [],
};
