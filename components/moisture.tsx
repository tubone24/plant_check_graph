import { useRecoilValue } from 'recoil'
import plantData from '../store/plantData'
import React from 'react'
import { Line } from 'react-chartjs-2'
export const Moisture = (): JSX.Element => {
  // 20200112: dangerouslyAllowMutabilityでできた
  const plant = useRecoilValue(plantData)
  const labels = plant.map((data) => data.timestamp)
  const dataSetPlantMoisture = plant.map((data) => data.moisture)
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Moisture',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'square',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#eee',
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataSetPlantMoisture,
      },
    ],
  }
  const options = {
    title: {
      display: true,
      text: 'Moisture',
      fontSize: 20,
    },
    legend: {
      display: true,
      position: 'bottom',
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            format: 'YYYY-MM-DDTHH:mm:ssZ[Z]',
            unit: 'hour',
            displayFormats: {
              hour: 'YYYY-MM-DD HH:00:00',
            },
          },
          scaleLabel: {
            display: true,
            labelString: 'Time',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  }
  return <Line data={data} options={options} width={400} height={100} />
}

export default Moisture
