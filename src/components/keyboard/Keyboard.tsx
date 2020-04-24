import React, { useState } from 'react';
import "./Keyboard.css";
import { KEYBOARD_KEYS } from '../../constants/Piano';
import { TKeyboardKey } from '../../types/Keyboard';

type TKeyboardProps = {
  activeKey: string;
};

function Keyboard(props: TKeyboardProps) {
  
  const [keyboardKeys] = useState<TKeyboardKey[]>(KEYBOARD_KEYS);
  
  return (
    <div id="keyboard">
      {keyboardKeys.map((keyboardKey) => {
        return (
          <div key={keyboardKey.key} className={`key ${props.activeKey === keyboardKey.key ? 'highlight' : ''}`}>
            {keyboardKey.blackKeyOverlap && <div className="black-key"></div> }
            <div className="key-letter">{keyboardKey.key}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Keyboard;