// filepath: /home/diodornelles/Área de Trabalho/programacao/siafi-efd-worksheet-ts/src/components/Home/DifferencesTableValues.tsx
import { useContext } from 'react';

import { Table } from 'flowbite-react';
import formatBrlCurrency from '../../utils/formatBrlCurrency';
import { AppContext } from '../../context/appContext';


/**
 * Renders a component with table differences between table values.
 * The component uses data from the AppContext to populate the table.
 * @returns {JSX.Element}
 */

export default function DifferencesTableValues() {
  /**
   * Retrieves the AppContext using the useContext hook from React. To see what each value represents, look more about in AppState and AppContext.
   */
  const appContext = useContext(AppContext);
  const {
    appState: { differentValues },
  } = appContext;
  return (
    <div className="overflow-x-auto transition-all">
      <Table striped className="m-auto">
        <Table.Head>
          <Table.HeadCell>Recolhedor/CNPJ</Table.HeadCell>
          <Table.HeadCell>Valor SIAFI</Table.HeadCell>
          <Table.HeadCell>Valor EFD</Table.HeadCell>
          <Table.HeadCell>Diferenças</Table.HeadCell>
          <Table.HeadCell>Observação</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {differentValues?.map((difference) => (
            <Table.Row
              key={difference.collector}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {difference.collector}
              </Table.Cell>
              <Table.Cell>
                {formatBrlCurrency(difference.valueSiafi)}
              </Table.Cell>
              <Table.Cell>{formatBrlCurrency(difference.valueEfd)}</Table.Cell>
              <Table.Cell className="text-red-600 font-bold">
                {formatBrlCurrency(difference.difference)}
              </Table.Cell>
              <Table.Cell className="text-red-600">
                Ver abaixo linha n. {difference.indexes.indexSiafi + 1} (SIAFI)
                e linha n. {difference.indexes.indexEfd + 1} (EFD)
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}