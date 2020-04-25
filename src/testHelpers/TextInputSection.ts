import { RenderResult, fireEvent } from "@testing-library/react";

export const TEST_SELECTORS = {
  playButton: "play-button",
  textInput: "key-text-input",
  errorField: "error-display"
};

export const fireKeyPressOnTextInput = ({inputValue,renderedUtil}: {inputValue: string; renderedUtil: RenderResult;}): HTMLInputElement => {
  const textInput = renderedUtil.getByTestId(
    TEST_SELECTORS.textInput
  ) as HTMLInputElement;

  // keys.forEach(key => {
    // fireEvent.keyDown(textInput, { key });
    fireEvent.change(textInput, { target: { value: inputValue } });
  // });

  return textInput;
};

export const clickPlayBtn = ({
  renderedUtil
}: {
  renderedUtil: RenderResult;
}) => {
  const playBtn = renderedUtil.getByTestId(TEST_SELECTORS.playButton);

  fireEvent.click(playBtn);

  return playBtn;
};