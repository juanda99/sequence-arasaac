import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import BarNavigation from "../../components/BarNavigation/BarNavigation";
import PictogramCard from "../../components/PictogramCard/PictogramCard";
import ViewSequencesSettings from "../../components/ViewSequencesSettings/ViewSequencesSettings";
import { ViewSettings } from "../../types/ui";
import CopyRight from "../../components/CopyRight/CopyRight";

const ViewSequencePage = (): JSX.Element => {
  const {
    sequence,
    ui: { viewSettings },
  } = useAppSelector((state) => state);

  const screen = {
    height: window.screen.availHeight,
    width: window.screen.availWidth,
  };

  let screenRatioForViewPrintPage: number = 1;

  if (screen.height < screen.width) {
    screenRatioForViewPrintPage = (screen.height / 750) * 0.4;
  }
  if (screen.width < screen.height) {
    screenRatioForViewPrintPage = (screen.width / 1020) * 0.8;
  }

  const initialViewState: ViewSettings = {
    sizePict: viewSettings.sizePict,
    columnGap: viewSettings.columnGap,
    rowGap: viewSettings.rowGap,
  };
  const [view, setView] = useState(initialViewState);

  const initialProducedBy: string = "";
  const [producedBy, setProducedBy] = useState(initialProducedBy);

  return (
    <BarNavigation title="view">
      <>
        <ViewSequencesSettings
          view={view}
          setView={setView}
          printPageRatio={screenRatioForViewPrintPage}
          producedBy={producedBy}
          setProducedBy={setProducedBy}
        >
          {sequence.map((pictogram) => (
            <PictogramCard
              pictogram={pictogram}
              view={"complete"}
              variant="plane"
              size={{
                pictSize: view.sizePict,
                printPageRatio: screenRatioForViewPrintPage,
              }}
              key={`${pictogram.indexSequence}_${pictogram.img.selectedId}`}
            />
          ))}
        </ViewSequencesSettings>
        <CopyRight producedBy={producedBy} />
      </>
    </BarNavigation>
  );
};

export default ViewSequencePage;
