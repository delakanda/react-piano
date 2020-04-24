import React, { useState } from 'react';
import './TextInputSection.css';
import { getInvalidKeys } from '../../utils/Piano';

type TTextInputSectionProps = {
  playKeyboard: Function;
};

function TextInputSection(props: TTextInputSectionProps) {

  const [keyInput, setKeyInput] = useState<string>("");
  // const [invalidLetters, setInvalidLetters] = useState<string[]>([]);
  const [invalidLetter, setInvalidLetter] = useState<string | null>(null);

  // Check if entered keyboard keys are all correct. If not, save error key 
  // useEffect(() => {
  //   if(keyInput) {
  //     const invalidKeys = getInvalidKeys(keyInput.split(','));
  //     setInvalidLetters(invalidKeys);
  //   }
  // }, [keyInput]);

  const play = () => {
    setKeyInput('');
    props.playKeyboard(keyInput);
  };

  const saveKeyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if(!e.target.value) setInvalidLetters([]);
    const invalidKeys = getInvalidKeys(e.target.value.toLocaleUpperCase().split(','));
    if(invalidKeys.length === 0) {
      setKeyInput(e.target.value);
    } else {
      // Flash an error message showing the user has entered an invalid key
      // error disappears after 1 second
      setInvalidLetter(invalidKeys[0]);
      setTimeout(() => {
        setInvalidLetter(null);
      }, 1000);
    }
  };
  
  return (
    <div className="text-input-section">
      <input 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveKeyInput(e)}
        type="text" 
        value={keyInput}
        placeholder="Enter comma (,) delimited keyboard letters here..." />

      <button className="play-button" 
        onClick={() => play()}
        disabled={(!keyInput) ? true : false}>
        Play >
      </button>

      {invalidLetter &&
        <div className="error-display">
          Invalid Key : {invalidLetter}
        </div>
      }
    </div>
  )
}

export default TextInputSection;