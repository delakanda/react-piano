import React from "react";
import TextInputSection from "./TextInputSection";
import { KEYBOARD_KEYS } from "../../constants/Piano";
import { fireInputChangeOnElement, TEXT_INPUT_SELECTORS, clickPlayBtn } from "../../testHelpers/TextInputSection";
import { mount } from "enzyme";
import { getByTestIdSelection } from "../../testHelpers/Common";

const INVALID_KEY = "//";
const VALID_KEY = KEYBOARD_KEYS[0].key;

const mockFn = jest.fn();

beforeEach(() => {
  mockFn.mockClear();
});


describe('Input section Functionality', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TextInputSection playKeyboard={mockFn} />);
  });

  it("should display an input field", () => {
    const textInput = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.textInput)).at(0);

    expect(textInput.exists()).toBe(true);
  });

  it("should display the play button and have correct text", () => {
    const playButton = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.playButton)).at(0);
  
    expect(playButton.exists()).toBe(true);
    expect(playButton.text()).toContain("Play");
  });

  it("should disable play button by default", () => {
    const playButton = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.playButton)).at(0);
    expect(playButton.prop('disabled')).toBe(true);
  });

  it("should display text in input when entering correct keyboard key value", () => {
    const textInput = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.textInput)).at(0);
    fireInputChangeOnElement({element: textInput, inputValue: VALID_KEY});
    
    // Refind input because of immutability of enzyme v3
    const refoundInput = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.textInput)).at(0);

    expect(refoundInput.prop('value')).toBe(`${VALID_KEY},`);
  });

  it("should not display error prompt if correct keyboard value is entered", async () => {
    const textInput = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.textInput)).at(0);
    fireInputChangeOnElement({element: textInput, inputValue: VALID_KEY});

    const errorField = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.errorField));
    expect(errorField.exists()).toBe(false);
  });

  it("should enable play button after entering a correct keyboard key value", () => {
    const textInput = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.textInput)).at(0);
    fireInputChangeOnElement({element: textInput, inputValue: VALID_KEY});

    const playButton = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.playButton));
    expect(playButton.prop('disabled')).toBe(false);
  });

  it("should not show any value in input after entering an invalid keyboard key", () => {
    const textInput = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.textInput)).at(0);
    fireInputChangeOnElement({element: textInput, inputValue: INVALID_KEY});

    const refoundInput = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.textInput)).at(0);
  
    expect(refoundInput.prop('value')).toBe("");
  });

  it("should display an invalid key error message when an invalid keyboard key is entered", () => {
    const textInput = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.textInput)).at(0);
    fireInputChangeOnElement({element: textInput, inputValue: INVALID_KEY});
  
    const errorField = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.errorField));
    expect(errorField.exists()).toBe(true);
    expect(errorField.text()).toContain(INVALID_KEY);
  });

  it("should clear text input when play button is clicked", () => {
    const textInput = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.textInput)).at(0);
    fireInputChangeOnElement({element: textInput, inputValue: VALID_KEY});

    clickPlayBtn({ wrapper });

    const refoundTextInput = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.textInput)).at(0);
    expect(refoundTextInput.prop('value')).toBe("");
  });
});