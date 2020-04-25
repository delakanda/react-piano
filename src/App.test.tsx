import React from 'react';
import { render, RenderResult, waitForElement } from '@testing-library/react';
import App from './App';
import { KEYBOARD_KEYS, KEYBOARD_KEY_PRESS_TIMEOUT } from './constants/Piano';
import { act } from 'react-dom/test-utils';
import { fireKeyPressOnTextInput, clickPlayBtn } from './testHelpers/TextInputSection';
import { LOGGER_SELECTORS } from './testHelpers/Logger';
import { KEYBOARD_SELECTORS } from './testHelpers/Keyboard';

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());

const setup = (): RenderResult => {
  const app = render(<App />);

  fireKeyPressOnTextInput({
    inputValue: KEYBOARD_KEYS.map(entry => entry.key).join(","),
    renderedUtil: app
  });

  return app;
};

test("displays logs of entered keys to the user", async () => {
  const app = setup();

  act(() => {
    clickPlayBtn({ renderedUtil: app });
    jest.advanceTimersByTime(KEYBOARD_KEYS.length * KEYBOARD_KEY_PRESS_TIMEOUT);
  });

  expect.hasAssertions();

  const loggerElems = await waitForElement(() =>
    app.queryAllByTestId(LOGGER_SELECTORS.logItem)
  );

  expect(loggerElems.length).toBe(KEYBOARD_KEYS.length);

  loggerElems.forEach((logItem, index) => {
    expect(logItem.textContent).toBe(KEYBOARD_KEYS[index].key);
  });
});

test("highlights entered keys on the keyboard", async () => {
  const app = setup();

  expect.hasAssertions();

  const keyboardKeys = app.getAllByTestId(KEYBOARD_SELECTORS.key);

  keyboardKeys.forEach(key => {
    act(() => {
      clickPlayBtn({ renderedUtil: app });
      jest.advanceTimersByTime(KEYBOARD_KEY_PRESS_TIMEOUT);
    });

    expect(key.className).toBe("key highlight");
  });
});