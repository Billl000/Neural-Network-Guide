'use client';
import {SupervisedChart} from './supervisedChart'; 

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      
      <SupervisedML/>
    </main>
  );
}

export function SupervisedML() {
  return (
    <div className="flex flex-row w-full min-h-screen px-6 py-8 gap-10">
      {/*Text Box */}
      <div className="w-1/2 bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2x1 font-bold mb-4">Supervised ML</h2>
        <p>Models that use Supervised Learning takes in example cases of both inputs and outputs. These models then predict the output when a new input is given.
          Popular use cases are Classification, Regression, and the foundation of all modern machine learning concepts today: Neural Networks.
        </p>
      </div>

      {/* Graph */}
      <div className="w-1/2 bg-black rounded-lg overflow-hidden">
        <SupervisedChart/>
      </div>
    </div>
  );
}

export function NerualDemo() {
  const layers = [
    { size: 3 },
    { size: 5 },
    { size: 4 },
    { size: 2 },
  ];

  const width = window.innerWidth;
  const height = window.innerHeight;
  const layerSpacing = width / (layers.length + 1);
  const neuronRadius = 50;
  const neuronColumnSpace = 30;

  return (
    
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto bg-black rounded-lg"
      preserveAspectRatio="xMidYMid meet"
    >
  
      {/* Connections */}
      {layers.slice(0, -1).map((fromLayer, i) => {
        const toLayer = layers[i + 1];

        const fromX = (i + 1) * layerSpacing + neuronRadius + neuronColumnSpace;
        const toX = (i + 2) * layerSpacing - neuronRadius - neuronColumnSpace;

        const fromYSpacing = height / (fromLayer.size + 1);
        const toYSpacing = height / (toLayer.size + 1);

        const fromCenterY = ((fromLayer.size + 1) / 2) * fromYSpacing;
        const toCenterY = ((toLayer.size + 1) / 2)* toYSpacing;

        
        return (
          <g key={`center-${i}`}>
          <line
            x1={fromX}
            y1={fromCenterY}
            x2={toX}
            y2={toCenterY}
            stroke="#ffffffff"
            strokeWidth={10}
          />

          <circle r={6} fill="red">
            <animate
              attributeName="cx"
              values={`${fromX}; ${toX}`}
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${fromCenterY}; ${toCenterY}`}
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      );

        
      })}

      {/*Line animation*/}

      {/* Neurons */}
      {layers.map((layer, layerIndex) => {
        const x = (layerIndex + 1) * layerSpacing;
        const ySpacing = height / (layer.size + 1);

        // Compute top and bottom Y of neurons
        const topY = ySpacing - neuronRadius - 10;
        const bottomY = layer.size * ySpacing + neuronRadius + 10;

        return (
          <g key={layerIndex}>
            {/* ⬛ Column border around neurons */}
            <rect
              x={x - neuronRadius - neuronColumnSpace}
              y={topY}
              width={neuronRadius * 2 + 60}
              height={bottomY - topY}
              rx={20}
              fill="none"
              stroke="#888"
              strokeDasharray=""
            />
            <text
              x={(layerIndex + 1) * layerSpacing}
              y={40}
              textAnchor="middle"
              fill="white"
              fontSize="16"
              fontFamily="sans-serif"
            >
              {layerIndex === 0
                ? "Input"
                : layerIndex === layers.length - 1
                ? "Output"
                : `Hidden ${layerIndex}`}
            </text>

            {/* 🔵 Neurons */}
            {Array.from({ length: layer.size }).map((_, neuronIndex) => {
              const cy = (neuronIndex + 1) * ySpacing;
              return (
                <circle
                  key={neuronIndex}
                  cx={x}
                  cy={cy}
                  r={neuronRadius}
                  fill="#ffffffff"
                  stroke="black"
                />
              );
            })}
          </g>
        );

        
      })}
    </svg>
  );
}