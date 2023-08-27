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
    <div className="flex flex-col p-4 gap-2 border-t-2 border-b-2 border-gray-800">
      <h6 className="text-lg font-bold dark:text-white">
        Arquivos selecionados:
      </h6>
      <p>{siafiFile}</p>
      <p>{efdFile}</p>
    </div>
  );
}

export default Files;
