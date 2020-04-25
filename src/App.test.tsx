import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange } from '@testing-library/react';
import App from './App';
import { KEYBOARD_KEYS } from './constants/Piano';

const FIRST_KEYBOARD_KEY = KEYBOARD_KEYS[0].key;

beforeEach(() => {
  jest.clearAllTimers();
  jest.useFakeTimers();
});

afterEach(() => {
  cleanup();
  // jest.clearAllTimers();
});

test('App renders without crashing', () => {
  render(<App />);
});

test('Test if clicking keyboard keys shows up in logs', () => {
  const {keyboardContainers, logItemContainer} = setup();

  const expectedLogLength = (KEYBOARD_KEYS.length * keyboardContainers.length);

  keyboardContainers.forEach((keyboard) => {
    const keyboardKeys = keyboard.childNodes;

    keyboardKeys.forEach((key) => {
      fireEvent.click(key);
    });
  });

  waitForDomChange();
  expect(logItemContainer.children.length).toBe(expectedLogLength);
});

test('Test if entering input and clicking the play button highlights keyboard keys', () => {

  const {keyboardContainers, textInput, playButton} = setup();

  fireEvent.change(textInput, { target: { value: FIRST_KEYBOARD_KEY } });

  fireEvent.click(playButton);

  jest.runOnlyPendingTimers();

  keyboardContainers.forEach((keyboard) => {
    const firstKey = keyboard.firstChild;
    if(firstKey) expect(firstKey.className).toBe('key highlight')
  });
});

test('Test if entering input and clicking the play button shows keyboard keys in log section', () => {

  const {logItemContainer, textInput, playButton} = setup();

  let inputText = "";

  KEYBOARD_KEYS.forEach((keyboardKey) => {
    inputText += `${keyboardKey.key},`;
  });

  fireEvent.change(textInput, { target: { value: inputText } });

  fireEvent.click(playButton);
  
  jest.runAllTimers();

  expect(logItemContainer.children.length).toBe(KEYBOARD_KEYS.length);
});

// Functions
function setup() {
  const utils = render(<App />)
  const keyboardContainers = utils.getAllByTestId('keyboard');
  const logItemContainer = utils.getByTestId('log-item-container');
  const textInput = utils.getByTestId('key-text-input');
  const playButton = utils.getByTestId('play-button');

  return {
    keyboardContainers,
    logItemContainer,
    textInput,
    playButton,
    ...utils,
  }
}