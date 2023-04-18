import {
  Box,
  Button,
  Divider,
  FormGroup,
  FormLabel,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import NotPrint from "../../components/NotPrint/NotPrint";
import { AiFillPrinter } from "react-icons/ai";
import { MdScreenRotation } from "react-icons/md";
import { ViewSettings } from "../../types/ui";
import { viewSettingsActionCreator } from "../../app/slice/uiSlice";
import { FormattedMessage } from "react-intl";
import messages from "./ViewSequencesSettings.lang";

interface ViewSequencesSettingsProps {
  children: JSX.Element | JSX.Element[];
  view: ViewSettings;
  setView: React.Dispatch<React.SetStateAction<ViewSettings>>;
}

const ViewSequencesSettings = ({
  children,
  view,
  setView,
}: ViewSequencesSettingsProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [isLandscape, setIsLandscape] = useState(true);

  const handlerView = (event: any, value: number | number[]) => {
    const newView: ViewSettings = {
      ...view,
      [event.target.name]: value,
    };

    setView(newView);
  };

  const handlerBlur = () => {
    const newViewSettings: ViewSettings = {
      sizePict: view.sizePict,
      columnGap: view.columnGap,
      rowGap: view.rowGap,
    };

    dispatch(viewSettingsActionCreator(newViewSettings));
    setView(newViewSettings);
  };

  return (
    <>
      <NotPrint>
        <form onBlur={handlerBlur}>
          <Stack spacing={2} direction={"row"} marginTop={2}>
            <FormGroup sx={{ width: 200 }}>
              <FormLabel>
                <FormattedMessage {...messages.size} />
                <Slider
                  defaultValue={view.sizePict}
                  name="sizePict"
                  step={0.05}
                  min={0.5}
                  max={2}
                  value={view.sizePict}
                  onChange={handlerView}
                />
              </FormLabel>
            </FormGroup>
            <FormGroup sx={{ width: 200 }}>
              <FormLabel>
                <FormattedMessage {...messages.columnGap} />
                <Slider
                  name="columnGap"
                  step={0.5}
                  min={-2}
                  max={10}
                  value={view.columnGap}
                  onChange={handlerView}
                />
              </FormLabel>
            </FormGroup>
            <FormGroup sx={{ width: 200 }}>
              <FormLabel>
                <FormattedMessage {...messages.rowGap} />
                <Slider
                  name="rowGap"
                  step={0.5}
                  min={0}
                  max={10}
                  value={view.rowGap}
                  onChange={handlerView}
                />
              </FormLabel>
            </FormGroup>
            <Button
              aria-label={"view"}
              variant="text"
              color="primary"
              sx={{ fontSize: "2rem" }}
              onClick={() => setIsLandscape(!isLandscape)}
            >
              <MdScreenRotation />
            </Button>
            <Button
              aria-label={"view"}
              variant="text"
              color="primary"
              sx={{ fontSize: "2rem" }}
              onClick={() => window.print()}
            >
              <AiFillPrinter />
            </Button>
          </Stack>
        </form>
        <Divider
          variant="inset"
          sx={{ marginBlock: 2, marginInlineStart: 0 }}
        />
        <Box
          sx={{
            display: "flex",
            width: 100,
            height: 40,
            backgroundColor: "green",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color={"primary.contrastText"}>A4</Typography>
        </Box>
      </NotPrint>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        alignContent={"start"}
        alignItems={"start"}
        columnGap={view.columnGap}
        rowGap={view.rowGap}
        width={isLandscape ? 1080 : 750}
        height={isLandscape ? 750 : 1080}
        overflow={"hidden"}
        sx={{
          border: "2px solid green",
          padding: 2,
          marginBottom: 3,
          "@media print": {
            "@page": { size: `A4 ${isLandscape ? "landscape" : "portrait"}` },
            border: "none",
          },
        }}
      >
        {children}
      </Stack>
    </>
  );
};

export default ViewSequencesSettings;