import React from "react";
import {
  render,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import Keyboard from "./Keyboard";
import { KEYBOARD_KEYS } from "../../constants/Piano";
import { act } from "react-dom/test-utils";

// const VALID_KEY = KEYBOARD_KEYS[0].key;
const mockFn = jest.fn();
const defaultInptActiveKey = { id: 1, input: "" };


// Functions
const setup = () => {
  return render(
    <Keyboard
      handleKeyboardKeyPress={mockFn}
      inputActiveKey={defaultInptActiveKey}
    />
  );
};

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());
afterEach(cleanup);

test("renders all keyboard keys", () => {
  const { getAllByTestId, getByTestId } = setup();

  expect(getByTestId("keyboard")).toBeVisible();
  expect(getAllByTestId("keyboard-key")).toHaveLength(KEYBOARD_KEYS.length);
});

test("Keyboard key press should highlight key", () => {
  const { getAllByTestId } = setup();

  const keyboardKeys = getAllByTestId("keyboard-key");

  expect.hasAssertions();

  keyboardKeys.forEach(key => {
    act(() => {
      fireEvent.click(key);
    });
    
    expect(key.className).toBe("key highlight");

    act(() => {
      jest.advanceTimersByTime(300);
    });

  });
});