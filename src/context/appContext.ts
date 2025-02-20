// AppContext.ts
import { createContext, Dispatch } from 'react';
import { AppState } from './appState';
import { AppAction } from './appReducer'; // ou o tipo definido no reducer

export interface AppContextType {
  appState: AppState;
  dispatch: Dispatch<AppAction>;
}

// Valor padrão para o contexto (ajuste conforme necessário)
const defaultContext: AppContextType = {
  appState: {
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
  },
  dispatch: () => undefined,
};

export const AppContext = createContext<AppContextType>(defaultContext);