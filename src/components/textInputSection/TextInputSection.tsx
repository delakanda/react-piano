import React, { useState } from 'react';
import './TextInputSection.css';
import { getInvalidKeys } from '../../utils/Piano';

type TTextInputSectionProps = {
  playKeyboard: Function;
};

function TextInputSection(props: TTextInputSectionProps) {

  const [keyInput, setKeyInput] = useState<string>("");
  const [invalidLetter, setInvalidLetter] = useState<string | null>(null);

  const play = () => {
    setKeyInput('');
    props.playKeyboard(keyInput);
  };

  const saveKeyInput = (e: React.ChangeEvent<HTMLInputElement>) => {

    const nativeInputEvent = e.nativeEvent as InputEvent;

    if(nativeInputEvent.data === ",") return;

    if(nativeInputEvent.inputType === "deleteContentBackward") {
      setKeyInput(keyInput => {
        let splitRes = keyInput.substring(0, keyInput.length - 1);
        splitRes = splitRes.substring(0, splitRes.length - 1);

        return splitRes;
      });

      return;
    }

    const invalidKeys = getInvalidKeys(e.target.value.toLocaleUpperCase().split(','));

    if(invalidKeys.length === 0) {
      setKeyInput(`${e.target.value},`);
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
    <div data-testid="text-input-section" className="text-input-section">
      <input 
        data-testid="key-text-input"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => saveKeyInput(e)}
        type="text" 
        value={keyInput}
        placeholder="Enter comma (,) delimited keyboard letters here..." />

      <button data-testid="play-button" className="play-button" 
        onClick={() => play()}
        disabled={(!keyInput) ? true : false}>
        Play >
      </button>

      {invalidLetter &&
        <div data-testid="error-display" className="error-display">
          Invalid Key : {invalidLetter}
        </div>
      }
    </div>
  )
}

export default TextInputSection;