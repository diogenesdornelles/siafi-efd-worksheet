import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

/**
 * Component JSX that render name files given
 * @returns {JSX.Element} - return Files
 */

function Files() {
  /**
   * Retrieves the AppContext using the useContext hook from React. Name files. To see what each value represents, look more about in AppState and AppContext.
   */
  const appContext = useContext(AppContext);
  /**
   * A states contexts that represents the name files.
   * @type {string} - siafiFile
   * @type {string} - edfiFile
   */
  const {
    appState: { siafiFile, efdFile },
  } = appContext;
  return (
    <div className="flex flex-col gap-2 p-4 border-gray-800 bg-blue-100 hover:bg-blue-200 transition-all">
      <h2 className="text-4xl font-bold mt-6 p-4">Arquivos selecionados:</h2>
      <p className="text-2xl font-bold mt-6 p-2">{siafiFile}</p>
      <p className="text-2xl font-bold mt-6 p-2">{efdFile}</p>
    </div>
  );
}

export default Files;
