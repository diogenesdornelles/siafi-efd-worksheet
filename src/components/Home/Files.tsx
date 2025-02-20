import { useContext } from 'react';

import { AppState } from '../../context/appState';
import { AppContext } from '../../context/appContext';

/**
 * Component JSX that render name files given
 * @returns {JSX.Element} - return Files
 */

function Files(): JSX.Element {
  /**
   * Retrieves the AppContext using the useContext hook from React. Name files. To see what each value represents, look more about in AppState and AppContext.
   */
  /**
   * A states contexts that represents the name files.
   * @type {string} - siafiFile
   * @type {string} - edfiFile
   */

    const {
      appState: { siafiFile, efdFile },
    } = useContext(AppContext) as {
      appState: AppState;
    };
  return (
    <div className="flex flex-col gap-2 p-4 border-gray-800 bg-blue-100 hover:bg-blue-200 transition-all">
      <h2 className="text-4xl font-bold mt-6 p-4">Arquivos selecionados:</h2>
      <p className="text-2xl font-bold mt-6 p-2">{siafiFile}</p>
      <p className="text-2xl font-bold mt-6 p-2">{efdFile}</p>
    </div>
  );
}

export default Files;