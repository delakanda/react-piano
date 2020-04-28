import React from "react";
import { shallow } from 'enzyme';
import Logger from "./Logger";
import { LOGGER_SELECTORS } from "../../testHelpers/Logger";
import { getByTestIdSelection } from "../../testHelpers/Common";

const KEY_LOGS = ["C", "D", "B", "A", "F"];

const setup = () => {
  return shallow(<Logger keyLogs={KEY_LOGS} />);
}

describe('Logger display & functionality', () => {

  it('should render log heading', () => {   
    const wrapper = setup();
    const loggerSection = wrapper.find(getByTestIdSelection(LOGGER_SELECTORS.loggerHeading)).at(0);

    expect(loggerSection.text()).toContain("Piano Logs");
  });

  it('renders the Titles children', () => { 
    const wrapper = setup();

    const loggerItems = wrapper.find(getByTestIdSelection(LOGGER_SELECTORS.logItem));

    loggerItems.forEach((logItem, index) => {
      expect(logItem.text()).toBe(KEY_LOGS[index]);
    });
  });
  
});