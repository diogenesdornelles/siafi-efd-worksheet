import { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import { AppActions } from '../../context/appActions';
import { AppAction } from '../../context/appReducer';


/**
 * A reusable button component. Clear AppContext.
 * @returns {JSX.Element} - The rendered Button component.
 */

function ButtonClear(): JSX.Element {
  /**
   * Retrieves the dispatch function using the useContext hook from React.
   */


  const {
    dispatch,
  } = useContext(AppContext) as {
    dispatch: React.Dispatch<AppAction>;

  };

  /**
   * The click event handler for the button. Return AppState to original set.
   * @returns {void} -
   */
  const handleClick = (): void => {
    dispatch({ type: AppActions.BINARYSTRSIAFI, payload: '' });
    dispatch({ type: AppActions.BINARYSTREFDREINF, payload: '' });
    dispatch({ type: AppActions.SIAFI_FILE, payload: '' });
    dispatch({ type: AppActions.EFD_FILE, payload: '' });
    dispatch({ type: AppActions.DIFFERENT_VALUES, payload: [] });
    dispatch({ type: AppActions.EFD_TOTAL_VALUE, payload: '' });
    dispatch({ type: AppActions.SIAFI_TOTAL_VALUE, payload: '' });
    dispatch({ type: AppActions.CNPJ_ERRORS, payload: [] });
    dispatch({ type: AppActions.TOTAL_VALUE_DIFFERENCE, payload: '' });
    dispatch({ type: AppActions.SIAFI_VALUES_COLLECTORS, payload: [] });
    dispatch({ type: AppActions.EFD_VALUES_CNPJS, payload: [] });
  };

  return (
    <>
      <button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl h-16 px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4"
        onClick={handleClick}
      >
        Limpar
      </button>
    </>
  );
}

export default ButtonClear;