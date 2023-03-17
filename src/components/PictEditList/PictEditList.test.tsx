import { SequenceI } from "../../types/sequence";
import { render, screen } from "../../utils/test-utils";
import PictEditList from "./PictEditList";

describe("Give a component PictogramCardList", () => {
  describe("When a rendered with sequence array", () => {
    test("Then should show all results of array", () => {
      const sequence: SequenceI = [
        { index: 0, number: 2333, word: { keyWord: "" } },
        { index: 1, number: 2333, word: { keyWord: "" } },
        { index: 2, number: 2333, word: { keyWord: "" } },
      ];

      render(<PictEditList sequence={sequence} />);
      const images = screen.getAllByRole("img");

      expect(images).toHaveLength(sequence.length);
    });
  });
});