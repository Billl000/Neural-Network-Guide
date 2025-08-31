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

import {Matrix} from 'ml-matrix';
import {SimpleLinearRegression} from 'ml-regression-simple-linear';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export function SupervisedChart() {
  const [mode, setMode] = useState<'auto' | 'manual'>('manual'); //Setup dropdown box
  const [cost, setCost] = useState<number | null>(0);
  const wRef = useRef<HTMLInputElement>(null);
  const bRef = useRef<HTMLInputElement>(null);

  const chartRef = useRef<any>(null);

  const [rawPoints, setRawPoints] = useState<{ x: number; y: number }[]>([]);
  const [dataPoints, setDataPoints] = useState([
    { x: 1, y: 0.11 },
    { x: 2, y: 0.30 },
    { x: 5, y: 0.54 },
    { x: 9, y: 0.88 },
  ]);

  const [regressionPoints, setRegressionPoints] = useState<{x: number; y:number}[]>([]);

  const handleClick = (event: any) => { //When plot points on graph
    const chart = chartRef.current;
    if (!chart) return;

    const canvasPosition = getRelativePosition(event, chart);

    const newX = chart.scales['x'].getValueForPixel(canvasPosition.x);
    const newY = chart.scales['y'].getValueForPixel(canvasPosition.y);

    setRawPoints((prev) => [...prev, { x: newX, y: newY }]);
  };

  const updateGraph = () => {  //When "Update Graph" clicked
    const combined = [...dataPoints, ...rawPoints];
    const sorted = combined.sort((a, b) => a.x - b.x);
    setDataPoints(sorted);
    setRawPoints([]);

    //Generate lstsq line
    const x = combined.map(p => p.x);
    const y = combined.map(p => p.y);
    const regression = new SimpleLinearRegression(x, y);

    const minX = Math.min(...x);
    const maxX = Math.max(...x);

    const regressionLine = [
      {x: minX, y: regression.predict(minX)},
      {x: maxX, y: regression.predict(maxX)}
    ];

    setRegressionPoints(regressionLine);
  };

  const resetGraph = () => { //Reset the graph
    setDataPoints([]);
    setRawPoints([]);
    setRegressionPoints([]);
  }

  const generateLine = (event:React.FormEvent) => {
    event.preventDefault();

    const combined = [...dataPoints, ...rawPoints];
    const sorted = combined.sort((a, b) => a.x - b.x);
    setDataPoints(sorted);
    setRawPoints([]);

    //Generate lstsq line
    const x = combined.map(p => p.x);
    const y = combined.map(p => p.y);
    const regression = new SimpleLinearRegression(x, y);

    const minX = Math.min(...x);
    const maxX = Math.max(...x);

    const w_input = parseFloat(wRef.current?.value || "0")
    const b_input = parseFloat(bRef.current?.value || "0")


    const regressionLine = [
      {x: minX, y:  w_input * minX + b_input},
      {x: maxX, y: w_input * maxX + b_input}
    ];

    const m = x.length;
    let temp_cost = 0
    for (let i = 0; i < m; i++) {
      temp_cost += (w_input * x[i] + b_input - y[i])**2;
    }
    const newCost = 1/(2 * m) * temp_cost;
    setCost(newCost);

    setRegressionPoints(regressionLine);
  }

  const data = {
    datasets: [
       {
        label: 'Data Points',
        data: dataPoints,
        borderColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'white',
        tension: 0.4,
        pointBackgroundColor: 'white',
        pointRadius: 5,
        showLine: false,
      }, 
      {
        label: 'New Data',
        data: rawPoints,
        borderColor: 'transparent',
        backgroundColor: 'red',
        pointRadius: 5,
        showLine: false,
      },
      {
        label: 'Regression Line',
        data: regressionPoints,
        borderColor: 'rgba(255, 0, 0, 1)',
        showLine: true,
        pointRadius: 0,
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
        onClick={handleClick} 
      />

      <select //Dropdown box
        value={mode}
        onChange={(e) => setMode(e.target.value as 'auto' | 'manual')}
        className="mb-4 p-2 rounded"
      >
        <option value="auto">Auto Best Fit</option>
        <option value="manual"> Manual Input</option>
      </select>

      {mode === 'auto' && ( //python switch equivalent
        <>
          <button
          onClick={updateGraph}
          className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
          >
            Update Graph
          </button>

          <button
            onClick={resetGraph}
            className="mt-4 mx-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
          >
            Reset Graph
          </button>
        </>
      )}

      {mode === 'manual' && (
        <>
          <form onSubmit={generateLine}>
            <div className='flex flex-row items-center'>
              <label>w Value: </label>
              <input ref={wRef} className="mx-10" id="w_input" type="number" placeholder="Input w value" />
              
              <label>b Value: </label>
              <input ref={bRef} className="mx-10" id="b_input" type="number" placeholder="Input b value" />

              <button 
                onClick={generateLine}
                id='genLine'
                className="mt-4 mx-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
              >Generate Line</button>

              
            </div>

            <p>Cost: {cost}</p>
          </form>
          <button 
              onClick={generateLine}
              className="mt-4 mx-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
            >Perform Gradient Descent</button>
        </>
      )}

      
    </div>
  );
}

/*
function LinearRegression(x: number[], y: number[]) {
  const sumX = x.reduce((prev, curr) => prev + curr, 0);
  const sumY = y.reduce((prev, curr) => prev + curr, 0);

  const avgX = sumX / x.length;
  const avgY = sumY / y.length;
  
  const newAvgX = x.map(p => avgX - p);
  const newAvgY = y.map(p => avgY - p);

  const varianceX = (newAvgX.map((p) => p ** 2)).reduce((prev, curr) => prev + curr, 0);
  const varianceY = (newAvgY.map((p) => p ** 2)).reduce((prev, curr) => prev + curr, 0);

  const slope = varianceY / varianceX;
  const intercept = avgY - slope * avgX;

  return (x: any) => intercept + slope * x;
} */
