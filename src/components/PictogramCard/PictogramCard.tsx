import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useAppSelector } from "../../app/hooks";
import useAraSaac from "../../hooks/useAraSaac";
import { Border, PictSequence } from "../../types/sequence";
import {
  pictogram__card,
  pictogram__media,
  textContent,
} from "./PictogramCard.styled";
import messages from "./PictogramCart.lang";
import fitzgeraldToBorder from "../../utils/fitzgeraldToBorder";

interface PictogramCardProps {
  pictogram: PictSequence;
  view: "complete" | "header" | "footer" | "none";
  variant?: "plane";
  size?: { pictSize?: number; printPageRatio?: number };
}

const PictogramCard = ({
  pictogram: {
    indexSequence,
    img: {
      selectedId,
      settings: { skin, fitzgerald, hair },
      searched: { word },
    },
    settings: {
      textPosition,
      fontSize,
      borderIn: pictBorderIn,
      borderOut: pictBorderOut,
    },
    text: customText,
  },
  view,
  variant,
  size,
}: PictogramCardProps): JSX.Element => {
  const {
    borderIn: borderInDefaultSetting,
    borderOut: borderOutDefaultSetting,
    numbered,
  } = useAppSelector((state) => state.ui.defaultSettings.pictSequence);
  const { toUrlPath: toUrlPathApiAraSaac } = useAraSaac();
  const intl = useIntl();

  const text = customText ? customText : word;

  const borderIn: Border = pictBorderIn
    ? fitzgeraldToBorder(fitzgerald, pictBorderIn)
    : fitzgeraldToBorder(fitzgerald, borderInDefaultSetting);

  const borderOut: Border = pictBorderOut
    ? fitzgeraldToBorder(fitzgerald, pictBorderOut)
    : fitzgeraldToBorder(fitzgerald, borderOutDefaultSetting);

  const pictSize = size?.pictSize ? size.pictSize : 1;
  const printPageRatio = size?.printPageRatio ? size?.printPageRatio : 1;

  const textFontSize = 20 * fontSize! * printPageRatio * pictSize;

  console.log(textFontSize);

  return (
    <Card
      data-testid="card-pictogram"
      sx={() => pictogram__card(borderOut, variant, pictSize, printPageRatio)}
    >
      {(view === "complete" || view === "header") && (
        <CardContent
          sx={() =>
            textContent(
              textPosition,
              numbered,
              borderOut.size,
              pictSize,
              printPageRatio
            )
          }
        >
          <Typography
            fontSize={textFontSize}
            component="h3"
            sx={{ "@media print": { fontSize: 20 * pictSize } }}
          >
            {textPosition !== "top" && numbered && indexSequence + 1}
            {textPosition === "top" && text}
          </Typography>
        </CardContent>
      )}
      <CardContent sx={{ padding: 0 }}>
        <CardMedia
          component="img"
          image={toUrlPathApiAraSaac(selectedId, skin, hair)}
          height={150 * pictSize * printPageRatio}
          width={150 * pictSize * printPageRatio}
          alt={intl.formatMessage({ ...messages.pictogram })}
          sx={() => pictogram__media(borderIn, view, pictSize, printPageRatio)}
        />
      </CardContent>

      {(view === "complete" || view === "footer") && (
        <CardContent
          sx={() =>
            textContent(
              textPosition,
              numbered,
              borderIn.size,
              pictSize,
              printPageRatio
            )
          }
        >
          <Typography
            fontSize={textFontSize}
            component="h3"
            sx={{ "@media print": { fontSize: 20 * pictSize } }}
          >
            {textPosition === "bottom" && text}
            {textPosition === "top" && numbered && indexSequence + 1}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default PictogramCard;
