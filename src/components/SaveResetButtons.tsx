import { GrPowerReset } from "react-icons/gr";

import { FaRegSave } from "react-icons/fa";

interface SaveResetButtonsProps {
  onSave: () => void;
  onReset: () => void;
}

const SaveResetButtons: React.FC<SaveResetButtonsProps> = ({ onSave, onReset }) => {
  return (
    <div className="flex justify-center my-2 w-full sm:w-1/3">
      <button  className="flex items-center justfiy-center rounded-sm h-full text-black bg-green-400 text-md p-2" onClick={onSave}>  Save      
        <span><FaRegSave /></span>
      </button>
      <button  className="flex items-center h-full rounded-sm text-black bg-blue-400 mx-2 text-md p-2" onClick={onReset}>  Reset      
        <span><GrPowerReset /></span>
      </button>
    </div>
  );
};

export default SaveResetButtons;