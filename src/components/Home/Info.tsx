/* eslint-disable no-unused-vars */
import { useState, MouseEvent } from 'react';
import imag1 from '../../assets/images/Home/efd-example.png';
import imag2 from '../../assets/images/Home/siafi-example.png';

/**
 * An array containing usage info.
 * @type {Array<string>}
 */

const infos: string[] = [
  'Nominar as planilhas como EFD.xlsx e SIAFI.xlsx;',
  'Planilha SIAFI contendo três colunas, com cabeçalhos incluindo recolhedor, documento e valor;',
  'Planilha EFD-REINF contendo três colunas, com cabeçalhos incluindo cnpj, cno e valor;',
  'Cabeçalhos com letras em minúsculo e sem deixar espaços em branco;',
  'Os documentos devem conter apenas a planilha em si, sem anotações às margens;',
  'As colunas recolhedor, cnpj e valores deverão ser formatadas numericamente -R$-; e',
];

/**
 * Component JSX that render describes general information about using the application
 * @returns {JSX.Element} - return Info
 */

function Info(): JSX.Element {
  /**
   * A state variable that represents the visibility of images examples.
   * @type {boolean}
   */
  const [show, setShow] = useState(false);

  /**
   * Event handler function for handling the click event.
   * @param {MouseEvent<HTMLAnchorElement>} e - The event object.
   */
  const handleClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setShow((s) => !s);
  };

  return (
    <div className="flex flex-col bg-blue-100 hover:bg-blue-200 transition-all p-4">
      <div className="md:p-4">
        <h2 className="text-4xl font-bold mt-6 mb-5">
          Requisitos para análise das planilhas:
        </h2>
        <ul className="space-y-1 text-gray-600 list-disc list-inside dark:text-gray-400">
          {infos.map((info, index) => (
            <li key={`${index}-info`} className="text-xs md:text-base">
              {info}
            </li>
          ))}
          <li className="text-xs md:text-base">
            Para ver exemplos
            <a
              href="#"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              onClick={handleClick}
            >
              clique aqui.
            </a>
          </li>
        </ul>
      </div>
      <div
        className={`flex flex-col md:flex-row md:justify-center gap-6 transition-all duration-700 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none h-0'
          }`}
      >
        <img src={imag2} alt="" className="w-full md:w-1/2 scale-75" />
        <img src={imag1} alt="" className="w-full md:w-1/2 scale-75" />
      </div>
    </div>
  );
}

export default Info;