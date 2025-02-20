import { useContext } from 'react';

import { AppState } from '../../context/appState';
import formatBrlCurrency from '../../utils/formatBrlCurrency';
import { nanoid } from 'nanoid';
import { AppContext } from '../../context/appContext';
import { Charts } from './Charts';


/**
 * Renders a component with general reports.
 * The component uses data from the AppContext to populate the cards.
 * @returns {JSX.Element}
 */
function Report(): JSX.Element {
  /**
   * Retrieves the AppContext using the useContext hook from React. To see what each value represents, look more about in AppState and AppContext.
   */

  const {
    appState: {
      siafiTotalValue,
      efdTotalValue,
      totalValueDifference,
      cnpjErrors,
      siafiValuesByCollectors,
      efdValuesAndCnpjs,
    },
  } = useContext(AppContext) as {
    appState: AppState;
  };

  const siafiTotal = formatBrlCurrency(siafiTotalValue);
  const efdTotal = formatBrlCurrency(efdTotalValue);
  return (
    <section className="bg-green-100 hover:bg-green-200 transition-all p-4">
      <h2 className="text-4xl font-bold mt-6 p-4">Relatório</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-gray-800">
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Valor SIAFI
          </h5>
          <p className=" text-blue-600 dark:text-gray-400 font-bold">
            {!siafiTotal.includes('NaN') ? siafiTotal : ''}
          </p>
        </div>
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Valor EFD
          </h5>
          <p className=" text-blue-600 dark:text-gray-400 font-bold">
            {!efdTotal.includes('NaN') ? efdTotal : ''}
          </p>
        </div>
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Diferença
          </h5>
          <p className=" text-red-600 font-bold dark:text-gray-400">
            {formatBrlCurrency(totalValueDifference)}
          </p>
        </div>
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Consta(m) apenas na planilha SIAFI
          </h5>
          {cnpjErrors?.map(
            (error) =>
              error.worksheet === 'siafi' && (
                <p
                  className="font-bold text-red-600 dark:text-gray-400"
                  key={nanoid(7)}
                >
                  CNPJ n. {error.cnpj}, no valor de{' '}
                  {formatBrlCurrency(
                    siafiValuesByCollectors[error.index].value,
                  )}
                  {'. '}Ver abaixo linha n. {error.index}
                </p>
              ),
          )}
        </div>
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Consta(m) apenas na planilha EFD
          </h5>
          {cnpjErrors?.map(
            (error) =>
              error.worksheet === 'efd' && (
                <p
                  className="font-bold text-red-600 dark:text-gray-400"
                  key={nanoid(7)}
                >
                  CNPJ n. {error.cnpj}, no valor de{' '}
                  {formatBrlCurrency(efdValuesAndCnpjs[error.index].value)}. Ver
                  abaixo linha n. {error.index + 1}
                </p>
              ),
          )}
        </div>
      </div>
      {siafiTotalValue || efdTotalValue ? (
        <div className="w-full flex justify-center bg-white mt-7 rounded-lg m-auto">
          <Charts />
        </div>
      ) : null}

    </section>
  );
}

export default Report;