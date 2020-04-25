import React from "react";
import { render, cleanup } from "@testing-library/react";
import Logger from "./Logger";
import { LOGGER_SELECTORS } from "../../testHelpers/Logger";

const keyLogs = ["C", "D", "B", "A", "F"];

const setup = () => {
  return render(<Logger keyLogs={keyLogs} />);
};

afterEach(cleanup);

test("should render log heading", () => {
  const { getByTestId } = setup();

  const container = getByTestId("logger-section");

  expect(container.textContent).toContain("Piano Logs");
});

test("should display all log items", () => {
  const { getAllByTestId } = setup();

  expect.hasAssertions();

  getAllByTestId(LOGGER_SELECTORS.logItem).forEach((logItem, index) => {
    expect(logItem.textContent).toBe(keyLogs[index]);
  });
});
