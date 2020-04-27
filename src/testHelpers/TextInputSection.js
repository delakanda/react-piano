import { fireEvent } from "@testing-library/react";

export const TEXT_INPUT_SELECTORS = {
  playButton: "play-button",
  textInput: "key-text-input",
  errorField: "error-display"
};

export const fireInputChangeOnTextInput = ({inputValue,renderedUtil}) => {
  const textInput = renderedUtil.getByTestId(TEXT_INPUT_SELECTORS.textInput);

  fireEvent.change(textInput, { target: { value: inputValue } });

  return textInput;
};

export const clickPlayBtn = ({renderedUtil}) => {
  const playBtn = renderedUtil.getByTestId(TEXT_INPUT_SELECTORS.playButton);

  fireEvent.click(playBtn);

  return playBtn;
};