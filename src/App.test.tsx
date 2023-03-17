import App from "./App";
import { render, screen } from "./utils/test-utils";

jest.mock("./hooks/useAraSaac", () => () => ({
  getSearchPictogram: jest.fn(),
}));

describe("Give a App", () => {
  describe("When it's rendered with title", () => {
    test("Then should show this title", () => {
      const expectTitle = "Sequences - AraSaac";

      render(<App />);
      const title = screen.getByRole("heading", {
        name: expectTitle,
        level: 1,
      });

      expect(title).toBeInTheDocument();
    });
  });
});
