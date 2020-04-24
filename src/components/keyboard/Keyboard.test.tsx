import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange } from '@testing-library/react';
import Keyboard from './Keyboard';
import { KEYBOARD_KEYS } from '../../constants/Piano';

// const VALID_KEY = KEYBOARD_KEYS[0].key;

afterEach(cleanup);

test('Count number of displayed keyboard keys', () => {
  const {keyboardContainer} = setup();

  expect(keyboardContainer.children.length).toBe(KEYBOARD_KEYS.length);
});

test('Count number of displayed keyboard keys', () => {
  const {keyboardContainer} = setup();

  expect(keyboardContainer.children.length).toBe(KEYBOARD_KEYS.length);
});

test('Keyboard key press should highlight key', () => {
  const {keyboardContainer} = setup();
  
  const firstKey = keyboardContainer.firstChild;
  expect(firstKey).not.toBeNull();

  if(firstKey) {
    fireEvent.click(firstKey);
    waitForDomChange();
    expect(firstKey.className).toBe('key highlight');
  }
});

// Functions
function setup() {
  const utils = render(<Keyboard handleKeyboardKeyPress={() => {}} inputActiveKey={''} />)
  const keyboardContainer = utils.getByTestId('keyboard');
  return {
    keyboardContainer,
    ...utils,
  }
}