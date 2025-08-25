import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';
import type { ChartOptions } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export function SupervisedChart() {
  const chartRef = useRef<any>(null);

  const [rawPoints, setRawPoints] = useState<{ x: number; y: number }[]>([]);
  const [dataPoints, setDataPoints] = useState([
    { x: 1, y: 0.6 },
    { x: 2, y: 0.72 },
    { x: 3, y: 0.81 },
    { x: 4, y: 0.88 },
  ]);

  const handleClick = (event: any) => {
    const chart = chartRef.current;
    if (!chart) return;

    const canvasPosition = getRelativePosition(event, chart);

    const newX = chart.scales['x'].getValueForPixel(canvasPosition.x);
    const newY = chart.scales['y'].getValueForPixel(canvasPosition.y);

    setRawPoints((prev) => [...prev, { x: newX, y: newY }]);
  };

  const updateGraph = () => {
    const combined = [...dataPoints, ...rawPoints];
    const sorted = combined.sort((a, b) => a.x - b.x);
    setDataPoints(sorted);
    setRawPoints([]);
  };

  const data = {
    datasets: [
      {
        label: 'Accuracy',
        data: dataPoints,
        borderColor: 'rgba(255, 255, 255, 1)',
        tension: 0.4,
        pointBackgroundColor: 'white',
        pointRadius: 5,
      },
      {
        label: 'New Data',
        data: rawPoints,
        borderColor: 'transparent',
        backgroundColor: 'red',
        pointRadius: 4,
        showLine: false,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: 10,
        ticks: {
          color: 'white',
        },
        title: {
          display: true,
          text: 'X Value',
          color: 'white',
        },
      },
      y: {
        min: 0,
        max: 1,
        ticks: {
          color: 'white',
        },
        title: {
          display: true,
          text: 'Y Value (Accuracy)',
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="w-full p-4">
      <Line
        ref={chartRef}
        data={data}
        options={options}
        onClick={handleClick} // Moved here from inside options
      />

      <button
        onClick={updateGraph}
        className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
      >
        Update Graph
      </button>
    </div>
  );
}
