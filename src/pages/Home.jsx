// React imports
import { useContext } from 'react';
// Components imports
import Files from '../components/Home/Files';
import DifferencesTableValues from '../components/Home/DifferencesTableValues';
import MyDropzone from '../components/Home/MyDropzone';
import Info from '../components/Home/Info';
import Nav from '../components/templates/Nav';
import TheFooter from '../components/templates/TheFooter';
import ButtonCheck from '../components/Home/ButtonCheck';
import ButtonClear from '../components/Home/ButtonClear';
import Report from '../components/Home/Report';
import Tables from '../components/Home/Tables';
// Utils imports
import EfdTable from '../utils/EfdTable';
import SiafiTable from '../utils/SiafiTable';
import checkValuesBetweenTables from '../utils/checkValuesBetweenTables';
import checkCnpjsBetweenTables from '../utils/checkCnpjsBetweenTables';
// Provider imports
import AppActions from '../context/AppActions';
import { AppContext } from '../context/AppContext';

/**
 * An array of worksheets.
 * @typedef {Object} Worksheet
 * @property {string} name - The name of the worksheet.
 */

/**
 * An array of worksheets.
 * @type {Array<Worksheet>}
 */
const worksheets = [
  {
    name: 'SIAFI',
  },
  {
    name: 'EFD',
  },
];

/**
 * Renders the entire Home Page.
 * The page uses data from the AppContext to populate all components.
 * @returns {JSX.Element}
 */
function Home() {
  /**
   * Retrieves the AppContext and dispatch function using the useContext hook from React. To see what each value represents, look more about in AppState and AppContext.
   */
  const appContext = useContext(AppContext);
  const {
    dispatch,
    appState: { binaryStrSiafi, binaryStrEfdReinf },
  } = appContext;

  /**
   * The click event handler for the button.
   * @returns {void} -
   */
  const handleClick = () => {
    /**
     * Checks if there in AppContext binary strings from both tables.
     */
    if (binaryStrEfdReinf.length > 0 && binaryStrEfdReinf.length > 0) {
      /**
       * Represents an instance of the EFD (Escrituração Fiscal Digital) table.
       * @typedef {Object} EfdTable
       * @property {string} binaryStrEfdReinf - The binary string data for the EFD table.
       */
      /**
       * Represents an instance of the SIAFI (Sistema Integrado de Administração Financeira) table.
       * @typedef {Object} SiafiTable
       * @property {string} binaryStrSiafi - The binary string data for the SIAFI table.
       */
      /**
       * if there strings, create instances os Efd Table (Escrituração Fiscal Digital) and Siafi Table (Sistema Integrado de Administração Financeira).
       * @type {EfdTable}
       * @type {SiafiTable}
       */
      const efd = new EfdTable(binaryStrEfdReinf);
      const siafi = new SiafiTable(binaryStrSiafi);
      /**
       * it check if tables data are valids
       * @property {boolean} efd.isValid - The result of validation property.
       */
      if (!efd.isValid || !siafi.isValid) {
        alert(
          'As Planilhas devem conter colunas padronizadas, conforme descrito abaixo.',
        );
        return;
      } else {
        /**
         * if it is valid, call dispatch function to change global state application.
         * @property {Array<Object>} siafi.valuesAndCollectors - The result of extraction os values and Cnpj Collectors from SIAFI Table.
         */
        const resultSiafi = siafi.valuesByCollectors;
        dispatch({
          type: AppActions.SIAFI_VALUES_COLLECTORS,
          payload: resultSiafi,
        });
        /**
         * @property {Array<Object>} efd.valuesAndCnpjs - The result of extraction os values and Cnpj Collectors from SIAFI Table.
         */
        const resultEfd = efd.valuesAndCnpjs;
        dispatch({ type: AppActions.EFD_VALUES_CNPJS, payload: resultEfd });

        /**
         * The result of the comparison between table values
         * @type {Array<Object>}
         */
        const resultDifferentValues = checkValuesBetweenTables(
          resultSiafi,
          resultEfd,
        );
        dispatch({
          type: AppActions.DIFFERENT_VALUES,
          payload: resultDifferentValues,
        });
        /**
         * @property {number} siafi.totalValue - Siafi total value.
         */
        const totalValueSiafi = siafi.totalValue;
        dispatch({
          type: AppActions.SIAFI_TOTAL_VALUE,
          payload: totalValueSiafi,
        });
        /**
         * @property {number} efd.totalValue - Efd total value.
         */
        const totalValueEfd = efd.totalValue;
        dispatch({ type: AppActions.EFD_TOTAL_VALUE, payload: totalValueEfd });
        /**
         * The total difference between table values.
         * @type {number}
         */
        const totalValueDifference = siafi.totalValue - efd.totalValue;
        dispatch({
          type: AppActions.TOTAL_VALUE_DIFFERENCE,
          payload: totalValueDifference,
        });
        /**
         * The collectors (cnpj) existing in siafi table.
         * @type {Array<Number>}
         */
        const siafcnpj = siafi.collectors;
        /**
         * The cnpj existing in efd table.
         * @type {Array<Number>}
         */
        const efdcnpj = efd.cnpjs;
        /**
         * The result of the comparison between table cnpj
         * @type {Array<Object> | Array[]}
         */
        const cnpjsErrors = checkCnpjsBetweenTables(siafcnpj, efdcnpj);
        dispatch({ type: AppActions.CNPJ_ERRORS, payload: cnpjsErrors });
        return;
      }
    } else {
      alert('Fornecer planilhas e ambas devem conter dados.');
      return;
    }
  };
  return (
    <main id="home-page">
      <Nav />
      <div className="w-11/12 md:w-7/12 flex flex-col m-auto p-2 md:p-8 rounded-md border-gray-600 mb-28 mt-8 shadow-md bg-white hover:shadow-xl gap-8 transition-all">
        <Info />
        <section className="bg-green-100 hover:bg-green-200 transition-all p-4">
          <h2 className="text-4xl font-bold mt-6 p-4">Área de seleção:</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center pt-8 border-gray-800">
            {worksheets.map((dropzone) => (
              <MyDropzone key={dropzone.name} worksheets={dropzone} />
            ))}
          </div>
        </section>
        <Files />
        <section className="flex flex-col gap-6 bg-orange-100 hover:bg-orange-200 transition-all p-4">
          <h2 className="text-4xl font-bold mt-6 p-4">Verificar:</h2>
          <ButtonCheck handleClick={handleClick} />
          <DifferencesTableValues />
          <ButtonClear />
        </section>
        <Report />
        <Tables />
      </div>
      <TheFooter />
    </main>
  );
}

export default Home;
