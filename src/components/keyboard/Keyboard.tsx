import React, { useState, useCallback, useRef, useEffect } from 'react';
import "./Keyboard.css";
import { KEYBOARD_KEYS } from '../../constants/Piano';
import { TKeyboardKey } from '../../types/Keyboard';

type TKeyboardProps = {
  inputActiveKey: string;
  handleKeyboardKeyPress: Function;
};

function Keyboard(props: TKeyboardProps) {

  // Variable Ref to track mounting & unmounting boolean for component
  // To prevent "cannot set state on unmounted component" error
  const mountedRef = useRef<boolean>(false);
  
  const [keyboardKeys] = useState<TKeyboardKey[]>(KEYBOARD_KEYS);
  const [activeKey, setActiveKey] = useState<string>("");

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    }
  }, []);

  const keyPress = useCallback((key: string) => {
    // Set active key for highlighting
    setActiveKey(key);

    // Remove active key highlight
    setTimeout(() => {
      if(mountedRef.current) setActiveKey("");
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
            className={`key ${(activeKey === keyboardKey.key || props.inputActiveKey === keyboardKey.key) ? 'highlight' : ''}`}>
            {keyboardKey.blackKeyOverlap && <div className="black-key"></div> }
            <div className="key-letter">{keyboardKey.key}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Keyboard;