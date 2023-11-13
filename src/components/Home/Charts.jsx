import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, PointElement, LineElement } from "chart.js";
import { Doughnut, Scatter } from "react-chartjs-2";
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
// import formatBrlCurrency from '../../utils/formatBrlCurrency';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, PointElement, LineElement);





export function Charts() {
  const appContext = useContext(AppContext);
  const {
    appState: {
      siafiTotalValue,
      efdTotalValue,
      differentValues,
      cnpjErrors,
      siafiValuesByCollectors,
      efdValuesAndCnpjs,
    },
  } = appContext;

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
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 4
      },
    ],
  };

  const optionsScatter = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: 'linear',
        position: 'bottom'
      }
    },
  };

  const differencesSiafi = differentValues.filter(difference => {
    if (difference.difference > 0) return difference.difference
  })

  const differencesEfd = differentValues.filter(difference => {
    if (difference.difference < 0) return difference.difference
  })

  const siafiDataset = differencesSiafi.map((difference, index) => {
    return {
      x: index * 2,
      y: difference.difference
    }
  })

  const efdDataset = differencesEfd.map((difference, index) => {
    return {
      x: (index * 2) + 1,
      y: difference.difference
    }
  })

  const cnpjErrorsSiafi = cnpjErrors.filter(error => {
    if (error.worksheet === 'siafi') return error
  })

  const cnpjErrorsEfd = cnpjErrors.filter(error => {
    if (error.worksheet === 'efd') return error
  })



  cnpjErrorsSiafi.forEach((value, index) => {
    let x = siafiDataset.slice(-1)[0].x
    siafiDataset.push({
      x: x + (2 * (index + 1)),
      y: siafiValuesByCollectors[value.index].value
    })
  })

  cnpjErrorsEfd.forEach((value, index) => {
    let x = efdDataset.slice(-1)[0].x
    efdDataset.push({
      x: x + (2 * (index + 1)),
      y: -efdValuesAndCnpjs[value.index].value
    })
  })

  console.log(siafiDataset)


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
    <>
      <Doughnut data={dataDoughnut} />
      <Scatter options={optionsScatter} data={dataScatter} /></>
  );
}



