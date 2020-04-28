import { getByTestIdSelection } from "./Common";

export const TEXT_INPUT_SELECTORS = {
  playButton: "play-button",
  textInput: "key-text-input",
  errorField: "error-display"
};

export const fireInputChangeOnElement = ({inputValue,element}) => {
  element.simulate('change', { target: { value: inputValue } });
};

export const clickPlayBtn = ({wrapper}) => {
  const playBtn = wrapper.find(getByTestIdSelection(TEXT_INPUT_SELECTORS.playButton)).at(0);
  playBtn.simulate('click');
};