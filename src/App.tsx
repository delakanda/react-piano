import React, { useState } from 'react';
import './App.css';
import { KEYBOARD_KEYS } from './constants/Piano';
import Keyboard from './components/keyboard/Keyboard';

function App() {

  const [keyInput, setKeyInput] = useState<string>("");
  const [activeKey, setActiveKey] = useState<string>("");

  const setKeyInputHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setKeyInput(e.currentTarget.value);
  }

  const playKeyboard = () => {
    highlightKeys();
  }

  const highlightKeys = () => {
    let keysSplit = keyInput.split('');
    
    let inter = setInterval(() => {
      if(keysSplit.length > 0) {
        let highlight = keysSplit.shift();
        if(highlight) setActiveKey(highlight);
      } else {
        clearInterval(inter);
        setActiveKey("");
      }
    }, 500);
  }

  return (
    <div className="App">
      <h2>Bleacher Report Piano</h2>
      <Keyboard activeKey={activeKey} />
    </div>
  );
}

export default App;
