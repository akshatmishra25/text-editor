import React from 'react';

interface EditorProps {
  text: string;
  onTextChange: (newText: string) => void;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
}

const Editor: React.FC<EditorProps> = ({ text, onTextChange, fontFamily, fontWeight, fontStyle }) => {
  return (
    <div className="editor flex justify-center w-2/3 sm:w-1/3 h-48 mx-2">
      <textarea
        placeholder='Type in to feel the magic'
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        className='w-full border-2'
        style={{ fontFamily, fontWeight, fontStyle }}
      />
    </div>
  );
};

export default Editor;