import AppActions from './AppActions';

/**
 * Reducer states and actions from Context.
 *
 * @param {Object} state  - The application general state.
 * @param {string} action - The action to be switched.
 * @returns {Object} - The application general state.
 */

export const reducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case AppActions.BINARYSTRSIAFI: {
      const { payload } = action;
      return {
        ...state,
        binaryStrSiafi: payload,
      };
    }
    case AppActions.BINARYSTREFDREINF: {
      const { payload } = action;
      return {
        ...state,
        binaryStrEfdReinf: payload,
      };
    }
    case AppActions.SIAFI_FILE: {
      const { payload } = action;
      return {
        ...state,
        siafiFile: payload,
      };
    }
    case AppActions.EFD_FILE: {
      const { payload } = action;
      return {
        ...state,
        efdFile: payload,
      };
    }
    case AppActions.DIFFERENT_VALUES: {
      const { payload } = action;
      return {
        ...state,
        differentValues: payload,
      };
    }
    case AppActions.SIAFI_TOTAL_VALUE: {
      const { payload } = action;
      return {
        ...state,
        siafiTotalValue: payload,
      };
    }
    case AppActions.EFD_TOTAL_VALUE: {
      const { payload } = action;
      return {
        ...state,
        efdTotalValue: payload,
      };
    }
    case AppActions.TOTAL_VALUE_DIFFERENCE: {
      const { payload } = action;
      return {
        ...state,
        totalValueDifference: payload,
      };
    }
    case AppActions.CNPJ_ERRORS: {
      const { payload } = action;
      return {
        ...state,
        cnpjErrors: payload,
      };
    }
    case AppActions.SIAFI_VALUES_COLLECTORS: {
      const { payload } = action;
      return {
        ...state,
        siafiValuesByCollectors: payload,
      };
    }
    case AppActions.EFD_VALUES_CNPJS: {
      const { payload } = action;
      return {
        ...state,
        efdValuesAndCnpjs: payload,
      };
    }
  }
  return { ...state };
};
