import React from 'react';
import { render, fireEvent, cleanup, waitForDomChange } from '@testing-library/react';
import TextInputSection from './TextInputSection';
import { KEYBOARD_KEYS } from '../../constants/Piano';

const INVALID_KEY = 'Q';
const VALID_KEY = KEYBOARD_KEYS[0].key;

afterEach(cleanup);

test('Test play button to be disabled by default', () => {
  const { playButton } = setup();
  expect(playButton).toBeDisabled();
});

test('Test Correct Input Value', () => {
  const { textInput } = setup();

  fireEvent.change(textInput, { target: { value: VALID_KEY } });
  expect(textInput.value).toBe(VALID_KEY);
});

test('Test Play Button to be enabled after correct input', () => {
  const { textInput, playButton } = setup();

  fireEvent.change(textInput, { target: { value: VALID_KEY } });
  expect(playButton).toBeEnabled();
});


test('Test if wrong key entry shows up in input', () => {
  const { textInput } = setup();

  fireEvent.change(textInput, { target: { value: INVALID_KEY } });
  expect(textInput.value).toBe('');
});

test('Test if wrong key entry keeps the button disabled', () => {
  const { textInput, playButton } = setup();

  fireEvent.change(textInput, { target: { value: INVALID_KEY } });
  expect(playButton).toBeDisabled();
});

test('Test if wrong key entry displays error message', () => {
  const { textInput, getByTestId } = setup();

  fireEvent.change(textInput, { target: { value: INVALID_KEY } });
  waitForDomChange();
  const errorDisplay = getByTestId('error-display');
  expect(errorDisplay.textContent).toBe(`Invalid Key : ${INVALID_KEY}`);
});

// Functions
function setup() {
  const utils = render(<TextInputSection playKeyboard={() => {}} />)
  const textInput = utils.getByTestId('key-text-input');
  const playButton = utils.getByTestId('play-button');
  return {
    textInput,
    playButton,
    ...utils,
  }
}