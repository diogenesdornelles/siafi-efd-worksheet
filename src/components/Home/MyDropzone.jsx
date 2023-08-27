import { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/AppContext';
import AppActions from '../../context/AppActions';

/**
 * Checks if the provided filename matches extension with excel worksheet type .xlsx.
 * @param {string} file - The key to search for in the cnpjErrors array.
 * @returns {boolean} - Returns true if a match is found, false otherwise.
 */
const validateFile = (file) => {
  const regex = /^.*\.xlsx$/;
  return regex.test(file.name.toLowerCase());
};

/**
 * A component that displays a dropzone for uploading Excel files.
 * @param {Object} props - The component props.
 * @param {Object} props.worksheets - The settings object for the dropzone.
 * @returns {JSX.Element} - The rendered MyDropzone component.
 */

function MyDropzone({ worksheets }) {
  /**
   * Retrieves the dispatch function using the useContext hook from React.
   */
  const appContext = useContext(AppContext);
  const { dispatch } = appContext;

  /**
   * Callback function invoked when files are dropped onto the dropzone.
   * @param {Array} acceptedFiles - The array of accepted files.
   */
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (validateFile(file)) {
          if (typeof FileReader !== 'undefined') {
            const reader = new FileReader();
            // For Browsers other than IE.
            if (reader.readAsBinaryString) {
              reader.onload = function (event) {
                const { result } = event.target;
                changeState(worksheets.name, result, file.name);
              };
              reader.readAsBinaryString(file);
            } else {
              // For IE Browser.
              reader.onabort = () => console.log('file reading was aborted');
              reader.onerror = () => console.log('file reading has failed');
              reader.onload = function (event) {
                let result = '';
                const bytes = new Uint8Array(event.target.result);
                for (let i = 0; i < bytes.byteLength; i++) {
                  result += String.fromCharCode(bytes[i]);
                }
                changeState(worksheets.name, result, file.name);
              };
              reader.readAsArrayBuffer(file);
            }
          } else {
            alert('Este browser não suporta HTML5.');
          }
        } else {
          alert('Por favor, faça o upload de um arquivo excel (.xlsx) válido.');
        }
      });
      /**
       * Changes the application state based on the action, data, and name.
       * @param {string} worksheet - The worksheet to perform the changes.
       * @param {string} data - The data to update in the state.
       * @param {string} name - The name associated with the data.
       */
      const changeState = (worksheet, data, name) => {
        switch (worksheet) {
          case 'SIAFI': {
            dispatch({ type: AppActions.BINARYSTRSIAFI, payload: '' });
            dispatch({ type: AppActions.BINARYSTRSIAFI, payload: data });
            dispatch({ type: AppActions.SIAFI_FILE, payload: '' });
            dispatch({ type: AppActions.SIAFI_FILE, payload: name });
            break;
          }
          case 'EFD': {
            dispatch({ type: AppActions.BINARYSTREFDREINF, payload: '' });
            dispatch({ type: AppActions.BINARYSTREFDREINF, payload: data });
            dispatch({ type: AppActions.EFD_FILE, payload: '' });
            dispatch({ type: AppActions.EFD_FILE, payload: name });
            break;
          }
        }
      };
    },
    [worksheets, dispatch],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col bg-white hover:bg-slate-50 w-full md:w-5/12 h-48 shadow-md rounded-md cursor-pointer "
    >
      {isDragActive ? (
        <p className="bg-gray-900 text-white px-6 py-1 text-center rounded w-full">
          Solte planilha {worksheets.name} aqui ...
        </p>
      ) : (
        <p className="bg-gray-900 text-white px-6 py-1 text-center rounded w-full">
          Arraste e solte planilha {worksheets.name} aqui, ou clique para
          selecionar arquivo
        </p>
      )}
      <input {...getInputProps()} />
    </div>
  );
}

export default MyDropzone;

MyDropzone.propTypes = {
  worksheets: PropTypes.object,
};
