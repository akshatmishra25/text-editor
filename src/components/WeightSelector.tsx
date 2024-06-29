import React from 'react';

interface WeightSelectorProps {
  weights: string[];
  selectedWeight: string;
  onWeightChange: (weight: string) => void;
}

const WeightSelector: React.FC<WeightSelectorProps> = ({ weights, selectedWeight, onWeightChange }) => {
  return (
    <select className='p-2 border-2 border-black mx-2' value={selectedWeight} onChange={(e) => onWeightChange(e.target.value)}>
      {weights.map((weight) => (
        <option key={weight} value={weight}>
          {weight}
        </option>
      ))}
    </select>
  );
};

export default WeightSelector;