import React, { useEffect, useState } from 'react';
import FontSelector from './components/FontSelector';
import WeightSelector from './components/WeightSelector';
//import FontSizeSelector from './components/FontSizeSelector';
import ItalicToggle from './components/ItalicToggle';
import Editor from './components/Editor'
import SaveResetButtons from './components/SaveResetButtons';
import fonts from './assets/fonts.json';


interface Fonts {
  [key: string]: {
    [key: string]: string; 
  };
}

const font: Fonts = fonts;

const App: React.FC = () => {
  const defaultFont = 'ABeeZee';
  const defaultWeight = '400';
  const defaultItalic = false;
  
  const [selectedFont, setSelectedFont] = useState<string>(defaultFont);
  const [selectedWeight, setSelectedWeight] = useState<string>(defaultWeight);
  const [isItalic, setIsItalic] = useState<boolean>(defaultItalic);
  const [text, setText] = useState<string>('');
  

  useEffect(() => {
    const savedFont = localStorage.getItem('selectedFont');
    const savedWeight = localStorage.getItem('selectedWeight');
    const savedItalic = localStorage.getItem('isItalic');
    const savedText = localStorage.getItem('text');
    

    if (savedFont && savedWeight && savedItalic !== null) {
      setSelectedFont(savedFont);
      setSelectedWeight(savedWeight);
      setIsItalic(JSON.parse(savedItalic));
      if (savedText) {
        setText(savedText);
      }
      
      
    }
  }, []);

  useEffect(() => {
    const autoSave = () => {
      localStorage.setItem('selectedFont', selectedFont);
      localStorage.setItem('selectedWeight', selectedWeight);
      localStorage.setItem('isItalic', JSON.stringify(isItalic));
      localStorage.setItem('text', text);
      
    };
    const intervalId = setInterval(autoSave, 7000); 
    return () => clearInterval(intervalId);
  }, [selectedFont, selectedWeight, isItalic, text]);

  const handleSave = () => {
    localStorage.setItem('selectedFont', selectedFont);
    localStorage.setItem('selectedWeight', selectedWeight);
    localStorage.setItem('isItalic', JSON.stringify(isItalic));
    localStorage.setItem('text', text);
   
  };

  const handleReset = () => {
    setSelectedFont(defaultFont);
    setSelectedWeight(defaultWeight);
    setIsItalic(defaultItalic);
    
    setText('');
    localStorage.removeItem('selectedFont');
    localStorage.removeItem('selectedWeight');
    localStorage.removeItem('isItalic');
    localStorage.removeItem('text');
    
  };

  const handleFontChange = (f: string) => {
    setSelectedFont(f);
    const fontVariants = font[f];
    const weightOptions = Object.keys(fontVariants).filter((variant: string) => !variant.includes('italic'));
    const italicOptions = Object.keys(fontVariants).filter((variant: string) => variant.includes('italic'));

    // Reset to default weight and italic if the current selections are not available in the new font
    if (!Object.keys(fontVariants).includes(selectedWeight + (isItalic ? 'italic' : ''))) {
      if (isItalic && italicOptions.length > 0) {
        setSelectedWeight(italicOptions[0].replace('italic', ''));
        setIsItalic(true);
      } else {
        setSelectedWeight(weightOptions[0]);
        setIsItalic(false);
      }
    }
  };

  const fontVariants = font[selectedFont];
  const weightOptions = Object.keys(fontVariants).filter((variant: string) => !variant.includes('italic'));
  const italicOptions = Object.keys(fontVariants).filter((variant: string) => variant.includes('italic'));

  useEffect(() => {
    const fontUrl = fontVariants[selectedWeight + (isItalic ? 'italic' : '')];
    const newFontFace = new FontFace(selectedFont, `url(${fontUrl})`);
    document.fonts.add(newFontFace);
    newFontFace.load().then(() => {
      const Editor = document.querySelector('.text-editor textarea') as HTMLTextAreaElement;
      if (Editor) {
        Editor.style.fontFamily = selectedFont;
      }
    });
  }, [selectedFont, selectedWeight, isItalic, fontVariants]);

  

  return (
    <>
    <div className='flex w-full justify-center items-center bg-black h-16 mb-10'>
      <h1 className='text-white font-bold p-2'>Text Editor</h1>
    </div>

    <div className="app flex flex-col items-center w-full">
      <div className="controls flex flex-row gap-2 my-2">
        <div className="control-group mx-2">
          <label htmlFor="font-family">Font Family</label>
          <FontSelector
            fonts={fonts}
            selectedFont={selectedFont}
            onFontChange={handleFontChange}
          />
        </div>
        <div className="control-group">
          <label htmlFor="font-weight">Font Variant</label>
          <WeightSelector
            weights={weightOptions}
            selectedWeight={selectedWeight}
            onWeightChange={(weight) => setSelectedWeight(weight)}
          />
        </div>
        <div className="control-group italic-toggle flex flex-row mx-2 items-center">
          <label htmlFor="italic-toggle mr-2">Italics</label>
          <ItalicToggle
            isItalic={isItalic}
            onToggleItalic={(checked) => setIsItalic(checked)}
            disabled={!italicOptions.length}
          />
        </div>
        
        
        
      </div>
      <Editor
        text={text}
        onTextChange={(newText) => setText(newText)}
        fontFamily={selectedFont}
        fontWeight={selectedWeight}
        fontStyle={isItalic ? 'italic' : 'normal'}
      />
      <SaveResetButtons
        onSave={handleSave}
        onReset={handleReset}
      />

{/*<div className="control-group dark-mode-toggle">
          <DarkModeToggle
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        </div>*/}
    </div>
    </>
  );
};

export default App;