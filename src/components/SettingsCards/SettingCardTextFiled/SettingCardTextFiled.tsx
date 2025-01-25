import { Stack, TextField, Typography } from "@mui/material";
import { cardTitle } from "../SettingsCards.styled";
import { FormattedMessage } from "react-intl";
import { messages } from "./SettingCardTextFiled.lang";
import React from "react";

interface SettingCardTextFiledProps {
  setting: "customText";
  state: string | undefined;
  setState: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SettingCadTextFiled = ({
  setting,
  state,
  setState,
}: SettingCardTextFiledProps): React.ReactElement => {
  return (
    <Stack
      display={"grid"}
      gridTemplateColumns={"0.5fr 1.5fr"}
      direction={"row"}
      columnGap={2}
    >
      <Typography variant="body1" component="h2" minWidth={120} sx={cardTitle}>
        <FormattedMessage {...messages[setting]} />
      </Typography>
      <TextField
        value={state}
        onChange={(event) => setState(event.target.value)}
        variant="filled"
        fullWidth
        sx={{ ".MuiInputBase-input": { paddingTop: 2 } }}
      />
    </Stack>
  );
};

export default SettingCadTextFiled;
