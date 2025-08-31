import 'katex/dist/katex.min.css';
import {BlockMath} from 'react-katex';
import {SupervisedChart} from './supervisedChart'

export function SupervisedML() {
  var Latex = require('react-latex');
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
  
        <p className='mt-3'>
          As the name states, our line of best fit will be linear - it will follow the standard y = wx + b, with slope w and intercept b. 
          In machine learning, we deal with accuracy a lot. How accurate is our line of best fit? Is it a good representation of our points trend? To combat that, we measure something
          called the Cost Function, or J(w, b). J(w,b) measures the "error" between our actual data points and the predicted points. Our goal is always to minimize J(w, b).
        </p>

        <BlockMath math="J(w, b) = \frac{1}{2m} \sum^{m}_{i=1} {(\hat{y}^{(i)} - y^{(i)})^2} = \frac{1}{2m} \sum^{m}_{i=1} {{(wx^{(i)} + b)} - y^{(i)})^2}" />

        <p className='mt-3'>
          The formula above is one of the simple Square Cost Function. In the formula, <BlockMath math='\hat{y}^{(i)} = wx^{(i)} + b'/> represent the predicted y value when an x value input is given.
          We can alter the values of w and b to change the values of J(w, b), and try to minimize it.
        </p>

      </div>

      {/* Graph */}
      <div className="lg:w-1/2 w-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
        <SupervisedChart/>
      </div>
    </div>
  );
}
