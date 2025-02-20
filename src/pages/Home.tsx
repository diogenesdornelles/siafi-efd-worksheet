import { useContext } from 'react';
// Components imports

// Utils imports
import EfdTable from '../utils/EfdTable';
import SiafiTable from '../utils/SiafiTable';
import checkValuesBetweenTables from '../utils/checkValuesBetweenTables';
import checkCnpjsBetweenTables from '../utils/checkCnpjsBetweenTables';
import { AppContext } from '../context/appContext';
import { AppActions } from '../context/appActions';
import DifferencesTableValues from '../components/Home/DifferencesTableValues';
import ButtonCheck from '../components/Home/ButtonCheck';
import ButtonClear from '../components/Home/ButtonClear';
import TheFooter from '../components/templates/TheFooter';
import Files from '../components/Home/Files';
import MyDropzone from '../components/Home/MyDropzone';
import Info from '../components/Home/Info';
import Nav from '../components/templates/Nav';
import Report from '../components/Home/Report';
import Tables from '../components/Home/Tables'
import { AppAction } from '../context/appReducer';

// Provider imports

interface Worksheet {
  name: string;
}

const worksheets: Worksheet[] = [
  { name: 'SIAFI' },
  { name: 'EFD' },
];

function Home(): JSX.Element {
  const {
    dispatch,
    appState: { binaryStrSiafi, binaryStrEfdReinf },
  } = useContext(AppContext) as {
    dispatch: React.Dispatch<AppAction>;
    appState: { binaryStrSiafi: string; binaryStrEfdReinf: string };
  };

  const handleClick = (): void => {
    // Verifica se ambas as planilhas possuem dados.
    if (binaryStrEfdReinf.length > 0 && binaryStrSiafi.length > 0) {
      const efd = new EfdTable(binaryStrEfdReinf);
      const siafi = new SiafiTable(binaryStrSiafi);

      if (!efd.isValid || !siafi.isValid) {
        alert(
          'As Planilhas devem conter colunas padronizadas, conforme descrito abaixo.'
        );
        return;
      } else {
        const resultSiafi = siafi.valuesByCollectors;
        dispatch({
          type: AppActions.SIAFI_VALUES_COLLECTORS,
          payload: resultSiafi,
        });

        const resultEfd = efd.valuesAndCnpjs;
        dispatch({ type: AppActions.EFD_VALUES_CNPJS, payload: resultEfd });

        const resultDifferentValues = checkValuesBetweenTables(
          resultSiafi,
          resultEfd
        );
        dispatch({
          type: AppActions.DIFFERENT_VALUES,
          payload: resultDifferentValues,
        });

        const totalValueSiafi = siafi.totalValue;
        dispatch({
          type: AppActions.SIAFI_TOTAL_VALUE,
          payload: totalValueSiafi,
        });

        const totalValueEfd = efd.totalValue;
        dispatch({
          type: AppActions.EFD_TOTAL_VALUE,
          payload: totalValueEfd,
        });

        const totalValueDifference = siafi.totalValue - efd.totalValue;
        dispatch({
          type: AppActions.TOTAL_VALUE_DIFFERENCE,
          payload: totalValueDifference,
        });

        const siafcnpj = siafi.collectors;
        const efdcnpj = efd.cnpjs;
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
      <div className="w-full max-w-screen-md md:max-w-screen-xl mx-auto p-4 md:p-8 rounded-md border border-gray-200 mb-28 mt-8 shadow-md bg-white hover:shadow-xl gap-8 transition-all">
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
