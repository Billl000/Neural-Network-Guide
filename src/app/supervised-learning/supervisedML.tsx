import {SupervisedChart} from './supervisedChart'

export function SupervisedML() {
  return (
    <div className="flex flex-row lg:flex-row w-full min-h-screen px-6 py-8 gap-10">
      {/*Text Box */}
      <div className="lg:w-1/2 w-full bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2x1 font-bold mb-4">Linear Regression</h2>
        <p>Linear Regression is probably the simplest and most basic model there is, and it will be a good foundation to future concepts that we will learn.
          Linear Regression is a sub-branch of Supervised Learning, where it will predict the output of any given input based on the training data it is given.
          Popular usage of this concept are predicting trends or understanding relationships of two variables - how changing x will affect y.
        </p>
        <p className='mt-3'>
          The variables which are put in a linear regression model are often continuous, numbers of a range. One of the most popular example of linear regression
          usage is predicting housing prices: analysing the relationship between housing prices and its size.
        </p>

        <p className='mt-3'>
          The idea of linear regression comes from the concept of line of best fit, used in many scientific fields more than just computer science: Chemistry, Physics,
          Economics, Psychology, etc. Any fields that has experimented with data has heard of drawing line of best fit to simplify the relationship between two continuous
          variables.

        </p>
      </div>

      {/* Graph */}
      <div className="lg:w-1/2 w-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
        <SupervisedChart/>
      </div>
    </div>
  );
}