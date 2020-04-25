import React, { useState, useCallback, useEffect } from 'react';
import "./Keyboard.css";
import { KEYBOARD_KEYS } from '../../constants/Piano';
import { InputActiveKey } from '../../types/Keyboard';

type TKeyboardProps = {
  inputActiveKey: InputActiveKey | null;
  handleKeyboardKeyPress: Function;
};

function Keyboard(props: TKeyboardProps) {

  const [activeKey, setActiveKey] = useState<string>("");
  const { handleKeyboardKeyPress } = props;

  useEffect(() => {
    // Remove active key highlight
    const timerId = setTimeout(() => { 
      setActiveKey("");
    }, 300);
    return () => {
      clearTimeout(timerId);
    }
  }, [activeKey]);

  const keyPress = useCallback((key: string) => {
    // Set active key for highlighting
    setActiveKey(key);

    // Call parent that a key was pressed
    handleKeyboardKeyPress(key);
  }, [handleKeyboardKeyPress]);
  
  return (
    <div data-testid="keyboard" className="keyboard">
      {KEYBOARD_KEYS.map((keyboardKey) => {
        return (
          <div key={keyboardKey.key} 
            data-testid="keyboard-key"
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