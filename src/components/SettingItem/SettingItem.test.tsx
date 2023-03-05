import { fireEvent, render, screen } from "@testing-library/react";
import toCapitalize from "../../utils/toCapitalize";
import SettingItem from "./SettingItem";

describe("Give a component Setting Item", () => {
  describe("When rendered whit 'skins' array", () => {
    test("Then should show button and image all skins", () => {
      const pathExpect = "/img/settings/skin/";
      const skins = ["asian", "aztec", "black", "mulatto", "white"];

      render(<SettingItem itemKey="skin" items={skins} />);

      skins.forEach((skin) => {
        const buttonsSkin = screen.getByRole("button", { name: skin });
        const imageSkin = screen.getByRole("img", { name: toCapitalize(skin) });
        const pathImage = imageSkin.getAttribute("src");

        fireEvent.click(buttonsSkin);

        expect(buttonsSkin).toBeInTheDocument();
        expect(pathImage).toBe(`${pathExpect + skin}.png`);
      });
    });
  });

  describe("When rendered", () => {
    test("Then should show 'apply all' and 'default' buttons", () => {
      const skins = ["asian", "aztec", "black", "mulatto", "white"];
      const expectButtons = ["Apply all", "Default"];

      render(<SettingItem itemKey="skin" items={skins} />);

      expectButtons.forEach((expectButton) => {
        const button = screen.getByRole("button", { name: expectButton });

        expect(button).toBeInTheDocument();
      });
    });
  });
});
