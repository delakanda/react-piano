import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Keyboard from './components/keyboard/Keyboard';
import Logger from './components/logger/Logger';
import { KEYBOARD_KEY_PRESS_TIMEOUT } from './constants/Piano';
import TextField from './components/textInputSection/TextInputSection';
import { InputActiveKey } from './types/Keyboard';

function App() {

  // General key logs
  const [keyLogs, setKeyLogs] = useState<string[]>([]);

  // Current active key being played from the text input
  const [inputActiveKey, setInputActiveKey] = useState<InputActiveKey | null>(null);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    // update logs ... when input active key is set
    if(inputActiveKey) {
      setKeyLogs(keyLogs => [...keyLogs, inputActiveKey.input]);
    }
  }, [inputActiveKey]);

  useEffect(() => {
    let keys = textInput.toUpperCase().split(",").filter(key => key !== "");

    const intervalId = setInterval(() => {
      if (keys.length === 0) {
        clearInterval(intervalId);
        setInputActiveKey(null);
        return;
      }

      let highlightedKey = keys.shift() as string;

      setInputActiveKey(inputActiveKey => ({
        input: highlightedKey,
        id: inputActiveKey ? inputActiveKey.id + 1 : 1
      }));

    }, KEYBOARD_KEY_PRESS_TIMEOUT);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [textInput]);

  // Function to handle any App-wise side effects of keyboard press
  const handleKeyboardKeyPress = useCallback((key: string) => {
    // Append log
    setKeyLogs(keyLogs => [...keyLogs, key]);
  }, []);

  /*
  * Function to play keyboard from letters entered into input box
  */
  const playKeyboard = (textInputValue: string) => {
    setTextInput(textInputValue);
  };

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
