import React from 'react';

interface ItalicToggleProps {
  isItalic: boolean;
  onToggleItalic: (checked: boolean) => void;
  disabled: boolean;
}

const ItalicToggle: React.FC<ItalicToggleProps> = ({ isItalic, onToggleItalic, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggleItalic(e.target.checked);
  };

  return (
    <div className="italic-toggle flex items-center mx-2">
      <label className="switch relative inline-block w-16 h-8">
        <input
          type="checkbox"
          checked={isItalic}
          onChange={handleChange}
          disabled={disabled}
          className="opacity-0 w-0 h-0"
        />
        <span
          className={`slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 transition duration-300 ease-in-out rounded-full
            ${isItalic ? 'bg-green-500' : 'bg-gray-400'} 
            ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
        >
          <span
            className={`absolute content-[''] h-6 w-6 left-1 bottom-1 bg-white transition-transform duration-300 ease-in-out rounded-full
              ${isItalic ? 'transform translate-x-8' : ''}`}
          ></span>
        </span>
      </label>
    </div>
  );
};

export default ItalicToggle;
