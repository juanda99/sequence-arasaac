import { fireEvent, render, screen } from "../../utils/test-utils";
import DefaultSettings from "./DefaultSettings";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

beforeEach(() => jest.clearAllMocks());

describe("Give a component Setting default card list", () => {
  describe("When it's rendered", () => {
    test("Then should show button to open defaults and close click", () => {
      const expectOpen = "Settings default";
      const expectClose = "close";

      render(<DefaultSettings />);
      const buttonOpen = screen.getByRole("button", { name: expectOpen });
      fireEvent.click(buttonOpen);

      const buttonClose = screen.getByRole("button", { name: expectClose });
      fireEvent.click(buttonClose);

      expect(buttonOpen).toBeInTheDocument();
      expect(buttonClose).toBeInTheDocument();
    });
  });

  describe("When open settings and user click type setting", () => {
    test("Then should call dispatch with action update setting", () => {
      const expectButton = "Black";
      const actionCreator = {
        payload: { setting: "skin", value: "black" },
        type: "uiState/updateSkin",
      };

      render(<DefaultSettings />);
      const buttonOpen = screen.getByRole("button", {
        name: "Settings default",
      });
      fireEvent.click(buttonOpen);

      const button = screen.getByRole("button", { name: expectButton });
      fireEvent.click(button);

      expect(mockDispatch).toBeCalledWith(actionCreator);
    });
  });
});