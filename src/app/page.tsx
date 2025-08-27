'use client';
import {SupervisedML} from './supervised-learning/supervisedML';
import {NeuralDemo} from './simple-neural-network/neuralVisual';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      
      <SupervisedML/>
    </main>
  );
}



