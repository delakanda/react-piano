import React from "react";
import { mount } from 'enzyme';
import Keyboard from "./Keyboard";
import { KEYBOARD_SELECTORS } from "../../testHelpers/Keyboard";
import { getByTestIdSelection } from "../../testHelpers/Common";
import { KEYBOARD_KEYS } from "../../constants/Piano";

const mockFn = jest.fn();
beforeEach(() => {
  mockFn.mockClear();
})

const defaultInptActiveKey = { id: 1, input: "" };

describe('Keyboard display & functionality', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Keyboard 
      handleKeyboardKeyPress={mockFn}
      inputActiveKey={defaultInptActiveKey}
    />);
  });

  it('should be visible', () => {
    const keyboard = wrapper.find(getByTestIdSelection(KEYBOARD_SELECTORS.keyboard)).at(0);

    expect(keyboard.exists()).toBe(true);
  });

  it('should render all keyboard keys', () => {   
    const keyboardKeys = wrapper.find(getByTestIdSelection(KEYBOARD_SELECTORS.key));

    expect(keyboardKeys).toHaveLength(KEYBOARD_KEYS.length);
  });

  it('Keyboard key press should highlight key', () => {

    // expect at least one assertion
    expect.assertions();

    KEYBOARD_KEYS.forEach((key, idx) => {
      const keyboardKey = wrapper.find(getByTestIdSelection(KEYBOARD_SELECTORS.key)).at(idx);
      keyboardKey.simulate('click');

      // refind key because of immutability of enzyme v3
      const reFoundKeyboardKey = wrapper.find(getByTestIdSelection(KEYBOARD_SELECTORS.key)).at(idx);
      expect(reFoundKeyboardKey.hasClass('highlight')).toBe(true);
    });
  });
});