import { AppActions } from "./appActions";
import { AppState, CnpjError, Difference, EfdValuesAndCnpjs, SiafiValueByCollector } from "./appState";

export interface AppAction {
  type: typeof AppActions[keyof typeof AppActions];
  payload: typeof AppState[keyof typeof AppState];
}

export const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActions.BINARYSTRSIAFI:
      return { ...state, binaryStrSiafi: action.payload as string};

    case AppActions.BINARYSTREFDREINF:
      return { ...state, binaryStrEfdReinf: action.payload as string};

    case AppActions.SIAFI_FILE:
      return { ...state, siafiFile: action.payload as string};

    case AppActions.EFD_FILE:
      return { ...state, efdFile: action.payload as string};

    case AppActions.DIFFERENT_VALUES:
      return { ...state, differentValues: action.payload as Difference[]};

    case AppActions.SIAFI_TOTAL_VALUE:
      return { ...state, siafiTotalValue: action.payload as number};

    case AppActions.EFD_TOTAL_VALUE:
      return { ...state, efdTotalValue: action.payload as number};

    case AppActions.TOTAL_VALUE_DIFFERENCE:
      return { ...state, totalValueDifference: action.payload as number};

    case AppActions.CNPJ_ERRORS:
      return { ...state, cnpjErrors: action.payload as CnpjError[]};

    case AppActions.SIAFI_VALUES_COLLECTORS:
      return { ...state, siafiValuesByCollectors: action.payload as SiafiValueByCollector[]};

    case AppActions.EFD_VALUES_CNPJS:
      return { ...state, efdValuesAndCnpjs: action.payload as EfdValuesAndCnpjs[]};

    default:
      return state;
  }
};
