import React, { useContext, useState } from 'react';

import { Table } from 'flowbite-react';
import formatBrlCurrency from '../../utils/formatBrlCurrency';
import { nanoid } from 'nanoid';
import { AppContext } from '../../context/appContext';
import { AppState } from '../../context/appState';


/**
 * Renders a component in the shape of an Arrow.
 * @returns {JSX.Element}
 */
function ArrowDown(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

/**
 * Renders a component with two tables: SIAFI and EFD.
 * The component uses data from the AppContext to populate the tables.
 * @returns {JSX.Element}
 */
export default function Tables(): JSX.Element {
  /**
   * Retrieves the AppContext using the useContext hook from React.
   * To see what each value represents, look more about in AppState and AppContext.
   */
  const appContext = useContext(AppContext);
  const {
    appState: {
      siafiValuesByCollectors,
      efdValuesAndCnpjs,
      cnpjErrors,
      differentValues,
    },
  } = appContext as unknown as { appState: AppState };


  /**
   * A state variable that store lines by collector siafi that are visibles.
   * @type {Array<number>}
   */
  const [showDocuments, setShowDocuments] = useState<number[]>([]);

  /**
   * Event handler function for handling the click event.
   * @param {number} line - The line number on table.
   */
  const handleClick = (line: number): void => {
    if (!showDocuments.includes(line)) {
      setShowDocuments([...showDocuments, line]);
    } else {
      setShowDocuments(showDocuments.filter((item) => item !== line));
    }
  };

  /**
   * Checks if the provided key matches any CNPJ errors in the cnpjErrors array.
   * @param {string} key - The key to search for in the cnpjErrors array.
   * @returns {boolean} - Returns true if a match is found, false otherwise.
   */
  function checkMatchCnpj(key: number): boolean {
    for (let i = 0; i < cnpjErrors.length; i++) {
      if (key === cnpjErrors[i].cnpj) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if the provided key matches any different values in the differentValues array.
   * @param {string} key - The key to search for in the differentValues array.
   * @returns {boolean} - Returns true if a match is found, false otherwise.
   */
  function checkMatchValues(key: number): boolean {
    for (let i = 0; i < differentValues.length; i++) {
      if (key === differentValues[i].collector) {
        return true;
      }
    }
    return false;
  }

  return (
    <section className="bg-blue-100 hover:bg-blue-200 transition-all p-4">
      <h2 className="text-4xl font-bold mt-6 p-4">Planilhas</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pt-2 border-gray-800 transition-all">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            SIAFI
          </h5>
          <Table striped className="m-auto">
            <Table.Head>
              <Table.HeadCell>Linha</Table.HeadCell>
              <Table.HeadCell>Recolhedor</Table.HeadCell>
              <Table.HeadCell>Valor SIAFI</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {siafiValuesByCollectors?.map((siafi, index) => (
                <React.Fragment key={nanoid(7)}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-blue-50">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>
                    {!checkMatchCnpj(siafi.collector) && (
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {siafi.collector}
                      </Table.Cell>
                    )}
                    {checkMatchCnpj(siafi.collector) && (
                      <Table.Cell className="whitespace-nowrap font-bold text-red-600 dark:text-white">
                        {siafi.collector}
                      </Table.Cell>
                    )}
                    {!checkMatchValues(siafi.collector) && (
                      <Table.Cell>
                        {String(formatBrlCurrency(siafi.value))}
                      </Table.Cell>
                    )}
                    {checkMatchValues(siafi.collector) && (
                      <Table.Cell className=" text-red-600 font-bold">
                        {String(formatBrlCurrency(siafi.value))}
                      </Table.Cell>
                    )}
                    {siafi.documents.length > 0 && (
                      <Table.Cell
                        className="text-gray-600 cursor-pointer scale-75"
                        onClick={() => handleClick(index + 1)}
                      >
                        <div className="flex gap-2 items-center">
                          <ArrowDown />
                          <p>{siafi.documents.length} doc(s)</p>
                        </div>
                      </Table.Cell>
                    )}
                    {!siafi.documents.length && (
                      <Table.Cell className="text-gray-600"></Table.Cell>
                    )}
                  </Table.Row>
                  {siafi.documents.length > 0 &&
                    showDocuments.includes(index + 1) &&
                    siafi.documents.map((document) => (
                      <React.Fragment key={nanoid(6)}>
                        <Table.Row
                          className=" dark:border-gray-700 dark:bg-gray-800"
                          style={{ backgroundColor: '#BFBE9C' }}
                        >
                          <Table.Cell className="whitespace-nowrap  text-gray-200 dark:text-white">
                            {index + 1}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-gray-200 dark:text-white">
                            {document.document}
                          </Table.Cell>
                          <Table.Cell className=" text-gray-200 ">
                            {document.value &&
                              String(formatBrlCurrency(document.value))}
                          </Table.Cell>
                          <Table.Cell className="text-gray-200">
                            {document.partialSum &&
                              String(formatBrlCurrency(document.partialSum))}
                          </Table.Cell>
                        </Table.Row>
                      </React.Fragment>
                    ))}
                </React.Fragment>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            EFD
          </h5>
          <Table striped className="m-auto">
            <Table.Head>
              <Table.HeadCell>Linha</Table.HeadCell>
              <Table.HeadCell>CNPJ</Table.HeadCell>
              <Table.HeadCell>Valor EFD</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {efdValuesAndCnpjs?.map((efd, index) => (
                <Table.Row
                  key={nanoid(7)}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-blue-50"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  {!checkMatchCnpj(efd.cnpj) && (
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {efd.cnpj}
                    </Table.Cell>
                  )}
                  {checkMatchCnpj(efd.cnpj) && (
                    <Table.Cell className="whitespace-nowrap text-red-600 font-bold dark:text-white">
                      {efd.cnpj}
                    </Table.Cell>
                  )}
                  {!checkMatchValues(efd.cnpj) && (
                    <Table.Cell>
                      {String(formatBrlCurrency(efd.value))}
                    </Table.Cell>
                  )}
                  {checkMatchValues(efd.cnpj) && (
                    <Table.Cell className=" text-red-600 font-bold">
                      {String(formatBrlCurrency(efd.value))}
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </section>
  );
}