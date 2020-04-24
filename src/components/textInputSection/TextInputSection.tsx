import React, { useState, useEffect } from 'react';
import './TextInputSection.css';
import { getInvalidKeys } from '../../utils/Piano';

type TTextInputSectionProps = {
  playKeyboard: Function;
};

function TextInputSection(props: TTextInputSectionProps) {

  const [keyInput, setKeyInput] = useState<string>("");
  const [invalidLetters, setInvalidLetters] = useState<string[]>([]);

  // Check if entered keyboard keys are all correct. If not, save error key 
  useEffect(() => {
    if(keyInput) {
      const invalidKeys = getInvalidKeys(keyInput.split(','));
      setInvalidLetters(invalidKeys);
    }
  }, [keyInput])

  const play = () => {
    setKeyInput('');
    props.playKeyboard(keyInput);
  };

  const saveKeyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyInput(e.target.value);
  }
  
  return (
    <div className="text-input-section">
      <input 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveKeyInput(e)}
        type="text" 
        value={keyInput}
        placeholder="Enter comma (,) delimited keyboard letters here..." />

      <button className="play-button" 
        onClick={() => play()}
        disabled={invalidLetters.length > 0 ? true: false}>
        Play >
      </button>

      {invalidLetters.length > 0 &&
        <div>
          Invalid letters : {invalidLetters.join(',')}
        </div>
      }
    </div>
  )
}

export default TextInputSection;