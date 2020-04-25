import React from "react";
import { render, cleanup } from "@testing-library/react";
import TextInputSection from "./TextInputSection";
import { KEYBOARD_KEYS } from "../../constants/Piano";
import { fireInputChangeOnTextInput, TEXT_INPUT_SELECTORS } from "../../testHelpers/TextInputSection";

const INVALID_KEY = "//";
const VALID_KEY = KEYBOARD_KEYS[0].key;

const mockFn = jest.fn();

afterEach(cleanup);
beforeEach(() => {
  mockFn.mockClear();
});

test("should display an input field", () => {
  const { getByTestId } = render(<TextInputSection playKeyboard={mockFn} />);

  const textInput = getByTestId(TEXT_INPUT_SELECTORS.textInput);

  expect(textInput).toBeVisible();
});

test("should display the play button and have correct text", () => {
  const { getByTestId } = render(<TextInputSection playKeyboard={mockFn} />);

  const playButton = getByTestId(TEXT_INPUT_SELECTORS.playButton);

  expect(playButton).toBeVisible();
  expect(playButton.textContent).toContain("Play");
});

test("play button should be disabled by default", () => {
  const { getByTestId } = render(<TextInputSection playKeyboard={mockFn} />);

  const playButton = getByTestId(TEXT_INPUT_SELECTORS.playButton);

  expect(playButton).toBeDisabled();
});

test("entering correct keyboard key value shows up in text input", () => {
  const util = render(<TextInputSection playKeyboard={mockFn} />);

  const textInput = fireInputChangeOnTextInput({
    inputValue: VALID_KEY,
    renderedUtil: util
  });

  expect(textInput.value).toBe(`${VALID_KEY},`);
});

test("error prompt is not displayed if correct keyboard value is entered", async () => {
  const util = render(<TextInputSection playKeyboard={mockFn} />);

  fireInputChangeOnTextInput({
    inputValue: VALID_KEY,
    renderedUtil: util
  });
  const errorField = util.queryByTestId(TEXT_INPUT_SELECTORS.errorField);

  expect(errorField).toBeNull();
});

test("play button is enabled after entering a correct keyboard key value", () => {
  const util = render(<TextInputSection playKeyboard={mockFn} />);

  fireInputChangeOnTextInput({
    inputValue: VALID_KEY,
    renderedUtil: util
  });
  const playButton = util.getByTestId(TEXT_INPUT_SELECTORS.playButton);

  expect(playButton).toBeEnabled();
});

test("entering an invalid keyboard key does not show up in text input", () => {
  const util = render(<TextInputSection playKeyboard={mockFn} />);

  const textInput = fireInputChangeOnTextInput({
    inputValue: INVALID_KEY,
    renderedUtil: util
  });

  expect(textInput.value).toBe("");
});

test("entering an invalid keyboard key displays the invalid key prompt", () => {
  const util = render(<TextInputSection playKeyboard={mockFn} />);

  fireInputChangeOnTextInput({
    inputValue: INVALID_KEY,
    renderedUtil: util
  });

  const errorField = util.getByTestId(TEXT_INPUT_SELECTORS.errorField);
  expect(errorField).toBeVisible();

  expect(errorField.textContent).toContain(INVALID_KEY);
});