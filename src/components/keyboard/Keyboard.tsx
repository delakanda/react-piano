import React, { useState, useCallback } from 'react';
import "./Keyboard.css";
import { KEYBOARD_KEYS } from '../../constants/Piano';
import { TKeyboardKey, InputActiveKey } from '../../types/Keyboard';

type TKeyboardProps = {
  inputActiveKey: InputActiveKey | null;
  handleKeyboardKeyPress: Function;
};

function Keyboard(props: TKeyboardProps) {

  const [keyboardKeys] = useState<TKeyboardKey[]>(KEYBOARD_KEYS);
  const [activeKey, setActiveKey] = useState<string>("");

  const keyPress = useCallback((key: string) => {
    // Set active key for highlighting
    setActiveKey(key);

    // Remove active key highlight
    setTimeout(() => { 
      setActiveKey("");
    }, 300);

    // Call parent that a key was pressed
    props.handleKeyboardKeyPress(key);
  }, [props]);
  
  return (
    <div data-testid="keyboard" className="keyboard">
      {keyboardKeys.map((keyboardKey) => {
        return (
          <div key={keyboardKey.key} 
            onClick={() => keyPress(keyboardKey.key)} 
            className={`key ${(activeKey === keyboardKey.key || props.inputActiveKey?.input === keyboardKey.key) ? 'highlight' : ''}`}>
            {keyboardKey.blackKeyOverlap && <div className="black-key"></div> }
            <div className="key-letter">{keyboardKey.key}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Keyboard;