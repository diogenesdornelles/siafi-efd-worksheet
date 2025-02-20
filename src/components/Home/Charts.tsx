import { useContext } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Doughnut, Scatter } from 'react-chartjs-2';

import { AppState } from '../../context/appState';
import { AppContext } from '../../context/appContext';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  LineElement
);

// Interfaces para tipar os dados

interface ScatterPoint {
  x: number;
  y: number;
}

export function Charts(): JSX.Element {
  const {
    appState: {
      siafiTotalValue,
      efdTotalValue,
      differentValues,
      cnpjErrors,
      siafiValuesByCollectors,
      efdValuesAndCnpjs,
    },
  } = useContext(AppContext) as {
    appState: AppState;
  };

  // Dados para o gráfico do tipo Doughnut
  const dataDoughnut = {
    labels: ['Siafi', 'Efd'],
    datasets: [
      {
        label: 'Siafi-Efd',
        data: [siafiTotalValue, efdTotalValue],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  // Opções para o gráfico Scatter
  const optionsScatter = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
      },
    },
  };

  // Filtra as diferenças positivas e negativas
  const differencesSiafi = differentValues.filter(
    (difference) => difference.difference > 0
  );
  const differencesEfd = differentValues.filter(
    (difference) => difference.difference < 0
  );

  // Mapeia os dados para o gráfico Scatter
  const siafiDataset: ScatterPoint[] = differencesSiafi.map((difference, index) => ({
    x: index * 2,
    y: difference.difference,
  }));

  const efdDataset: ScatterPoint[] = differencesEfd.map((difference, index) => ({
    x: index * 2 + 1,
    y: difference.difference,
  }));

  // Filtra os erros por planilha
  const cnpjErrorsSiafi = cnpjErrors.filter(
    (error) => error.worksheet === 'siafi'
  );
  const cnpjErrorsEfd = cnpjErrors.filter(
    (error) => error.worksheet === 'efd'
  );

  // Adiciona pontos ao dataset de Siafi com base nos erros
  cnpjErrorsSiafi.forEach((value, index) => {
    if (siafiDataset.length > 0) {
      const lastPoint = siafiDataset[siafiDataset.length - 1];
      const x = lastPoint.x;
      siafiDataset.push({
        x: x + 2 * (index + 1),
        y: siafiValuesByCollectors[value.index].value,
      });
    } else {
      siafiDataset.push({
        x: 2 * (index + 1),
        y: siafiValuesByCollectors[value.index].value,
      });
    }
  });

  // Adiciona pontos ao dataset de Efd com base nos erros
  cnpjErrorsEfd.forEach((value, index) => {
    if (efdDataset.length > 0) {
      const lastPoint = efdDataset[efdDataset.length - 1];
      const x = lastPoint.x;
      efdDataset.push({
        x: x + 2 * (index + 1),
        y: -efdValuesAndCnpjs[value.index].value,
      });
    } else {
      efdDataset.push({
        x: 2 * (index + 1),
        y: -efdValuesAndCnpjs[value.index].value,
      });
    }
  });

  // Dados para o gráfico Scatter
  const dataScatter = {
    datasets: [
      {
        label: 'Siafi',
        data: siafiDataset,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Efd',
        data: efdDataset,
        backgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  return (
    <div className='w-full flex flex-col md:flex-row gap-10 mt-10 mb-10 items-center justify-center'>
      <div>
        <Doughnut data={dataDoughnut} />
      </div>
      <div>
        <Scatter options={optionsScatter} data={dataScatter} />
      </div>
    </div>
  );
}
