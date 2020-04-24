import React from 'react';
import { render, fireEvent, cleanup, waitForDomChange, wait } from '@testing-library/react';
import TextInputSection from './TextInputSection';
import { KEYBOARD_KEYS } from '../../constants/Piano';

const INVALID_KEY = 'Q';
const VALID_KEY = KEYBOARD_KEYS[0].key;

const mockFn = jest.fn();

afterEach(cleanup);

test('Test if play button is disabled by default', () => {
  const { playButton } = setup();
  expect(playButton).toBeDisabled();
});

test('Test if entering correct keyboard key value shows up in text input', () => {
  const { textInput } = setup();

  fireEvent.change(textInput, { target: { value: VALID_KEY } });
  expect(textInput.value).toBe(VALID_KEY);
});

test('Test if play button is enabled after entering a correct keyboard key value', () => {
  const { textInput, playButton } = setup();

  fireEvent.change(textInput, { target: { value: VALID_KEY } });
  expect(playButton).toBeEnabled();
});


test('Test if entering an invalid keyboard key shows up in text input', () => {
  const { textInput } = setup();

  fireEvent.change(textInput, { target: { value: INVALID_KEY } });
  expect(textInput.value).toBe('');
});

test('Test if invalid keyboard key entry makes the button disabled', () => {
  const { textInput, playButton } = setup();

  fireEvent.change(textInput, { target: { value: INVALID_KEY } });
  expect(playButton).toBeDisabled();
});

test('Test if invalid keyboard key entry displays error message', () => {
  const { textInput, getByTestId } = setup();

  fireEvent.change(textInput, { target: { value: INVALID_KEY } });
  waitForDomChange();
  const errorDisplay = getByTestId('error-display');
  expect(errorDisplay.textContent).toBe(`Invalid Key : ${INVALID_KEY}`);
});

test('Test if entering input and clicking the play button clears the text input value', () => {
  const { textInput, playButton } = setup();

  fireEvent.change(textInput, { target: { value: VALID_KEY } });
  fireEvent.click(playButton);

  waitForDomChange();

  expect(textInput.value).toBe('');
});

// Functions
function setup() {
  const utils = render(<TextInputSection playKeyboard={mockFn} />)
  const textInput = utils.getByTestId('key-text-input');
  const playButton = utils.getByTestId('play-button');
  return {
    textInput,
    playButton,
    ...utils,
  }
}