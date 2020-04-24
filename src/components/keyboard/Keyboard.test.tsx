import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange } from '@testing-library/react';
import Keyboard from './Keyboard';
import { KEYBOARD_KEYS } from '../../constants/Piano';

// const VALID_KEY = KEYBOARD_KEYS[0].key;
const mockFn = jest.fn();

afterEach(cleanup);

test('Count number of displayed keyboard keys', () => {
  const {keyboardContainers} = setup();

  keyboardContainers.forEach((keyboard) => {
    expect(keyboard.children.length).toBe(KEYBOARD_KEYS.length);
  });
});

test('Keyboard key press should highlight key', () => {
  const {keyboardContainers} = setup();
  
  keyboardContainers.forEach((keyboard) => {
    const firstKey = keyboard.firstChild;
    expect(firstKey).not.toBeNull();

    if(firstKey) {
      fireEvent.click(firstKey);
      waitForDomChange();
      expect(firstKey.className).toBe('key highlight');
    }
  })
});

// Functions
function setup() {
  const utils = render(<Keyboard handleKeyboardKeyPress={mockFn} inputActiveKey={''} />)
  const keyboardContainers = utils.getAllByTestId('keyboard');
  return {
    keyboardContainers,
    ...utils,
  }
}