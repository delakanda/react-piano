import React, { useState } from 'react';
import './TextInputSection.css';

type TTextInputSectionProps = {
  playKeyboard: Function;
};

function TextInputSection(props: TTextInputSectionProps) {

  const [keyInput, setKeyInput] = useState<string>("");

  const play = () => {
    setKeyInput('');
    props.playKeyboard(keyInput);
  };
  
  return (
    <div className="text-input-section">
      <input 
        onChange={(e: any) => setKeyInput(e.target.value)}
        type="text" 
        value={keyInput}
        placeholder="Enter comma (,) delimited keyboard letters here..." />

      <button className="play-button" onClick={() => play()}>
        Play >
      </button>
    </div>
  )
}

export default TextInputSection;