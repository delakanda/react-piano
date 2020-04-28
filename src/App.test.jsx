import React from 'react';
import App from './App';
import { KEYBOARD_KEYS, KEYBOARD_KEY_PRESS_TIMEOUT } from './constants/Piano';
import { clickPlayBtn, fireInputChangeOnElement, TEXT_INPUT_SELECTORS } from './testHelpers/TextInputSection';
import { LOGGER_SELECTORS } from './testHelpers/Logger';
import { KEYBOARD_SELECTORS } from './testHelpers/Keyboard';
import { mount } from 'enzyme';
import { getByTestIdSelection } from './testHelpers/Common';
import { act } from 'react-dom/test-utils';

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());

describe('App Functionality', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);

    const input = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.textInput)).at(0);
    fireInputChangeOnElement({element: input, inputValue: KEYBOARD_KEYS.map(entry => entry.key).join(",")});
  });

  test("should display logs of entered keys to the user in the logger section", async () => {

    clickPlayBtn({ wrapper });
    act(() => {
      jest.advanceTimersByTime(KEYBOARD_KEYS.length * KEYBOARD_KEY_PRESS_TIMEOUT);
    });
    
    wrapper.update();
  
    const loggerElems = wrapper.find(getByTestIdSelection(LOGGER_SELECTORS.logItem));
    expect(loggerElems).toHaveLength(KEYBOARD_KEYS.length);
  
    loggerElems.forEach((logItem, index) => {
      expect(logItem.text()).toBe(KEYBOARD_KEYS[index].key);
    });
  });

  test("should highlight entered keys on the keyboard", async () => {

    expect.hasAssertions();
    
    clickPlayBtn({ wrapper });

    for(let i = 0; i < KEYBOARD_KEYS.length; i++) {
      act(() => {
        jest.advanceTimersByTime(KEYBOARD_KEY_PRESS_TIMEOUT);
      });

      wrapper.update();

      const keyboardKeys = wrapper.find(getByTestIdSelection(KEYBOARD_SELECTORS.key));

      expect(keyboardKeys.at(i).hasClass("highlight")).toBe(true);
    }
  });

});

