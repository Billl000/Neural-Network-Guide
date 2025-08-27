import {SupervisedChart} from './supervisedChart'

export function SupervisedML() {
  return (
    <div className="flex flex-row lg:flex-row w-full min-h-screen px-6 py-8 gap-10">
      {/*Text Box */}
      <div className="lg:w-1/2 w-full bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2x1 font-bold mb-4">Supervised ML</h2>
        <p>Models that use Supervised Learning takes in example cases of both inputs and outputs. These models then predict the output when a new input is given.
          Popular use cases are Classification, Regression, and the foundation of all modern machine learning concepts today: Neural Networks.
        </p>
      </div>

      {/* Graph */}
      <div className="lg:w-1/2 w-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
        <SupervisedChart/>
      </div>
    </div>
  );
}