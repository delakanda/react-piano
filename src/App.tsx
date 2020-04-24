import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Keyboard from './components/keyboard/Keyboard';
import Logger from './components/logger/Logger';
import { KEYBOARD_KEY_PRESS_TIMEOUT } from './constants/Piano';
import TextField from './components/textInputSection/TextInputSection';
import { isCorrentKeyboardKey } from './utils/Piano';

function App() {

  // General key logs
  const [keyLogs, setKeyLogs] = useState<string[]>([]);

  // Current active key being played from the text input
  const [inputActiveKey, setInputActiveKey] = useState<string>("");

  useEffect(() => {
    // update logs ... when input active key is set
    if(inputActiveKey) {
      const _logs = [...keyLogs];
      _logs.push(inputActiveKey);
      setKeyLogs(_logs);
    }
  }, [inputActiveKey])

  // Function to handle any App-wise side effects of keyboard press
  const handleKeyboardKeyPress = useCallback((key: string) => {
    // Append log
    const _logs = [...keyLogs];
    _logs.push(key);
    setKeyLogs(_logs);
  }, [keyLogs]);

  // Function to highlight keys entered in input box
  const highlightKeys = useCallback((inputKeys: string) => {
    let keysSplit = inputKeys.split(',');
    
    
    const hightlightInterval = setInterval(() => {
      if(keysSplit.length > 0) {
        let highlightedKey = keysSplit.shift();
        // highlightedKey possibly undefined
        if(highlightedKey && isCorrentKeyboardKey(highlightedKey)) {
            setInputActiveKey(highlightedKey);
        } else {
          setInputActiveKey("");
        } 

      } else {
        setInputActiveKey("");
        clearInterval(hightlightInterval);
      }
    }, KEYBOARD_KEY_PRESS_TIMEOUT);
  }, [])

  /*
  * Function to play keyboard from letters entered into input box
  */
  const playKeyboard = useCallback((inputKeys: string) => {
    highlightKeys(inputKeys.toLocaleUpperCase());
  }, [highlightKeys])

  return (
    <div className="App">
      <h2>Bleacher Report Piano</h2>
      <Keyboard handleKeyboardKeyPress={handleKeyboardKeyPress} inputActiveKey={inputActiveKey} />

      {/* Testing another piano instance */}
      {/* <Keyboard handleKeyboardKeyPress={handleKeyboardKeyPress} inputActiveKey={inputActiveKey} /> */}

      <Logger keyLogs={keyLogs} />

      <TextField playKeyboard={playKeyboard} />
    </div>
  );
}

export default App;
