import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import PictogramCard from "../../components/PictogramCard/PictogramCard";
import ViewSequencesSettings from "../../components/ViewSequencesSettings/ViewSequencesSettings";
import { ViewSettings } from "../../types/ui";
import CopyRight from "../../components/CopyRight/CopyRight";
import React from "react";

const ViewSequencePage = (): React.ReactElement => {
  const {
    sequence,
    ui: { viewSettings },
  } = useAppSelector((state) => state);

  const initialViewState: ViewSettings = {
    sizePict: viewSettings.sizePict,
    columnGap: viewSettings.columnGap,
    rowGap: viewSettings.rowGap,
  };
  const [view, setView] = useState(initialViewState);

  const initialAuthor: string = "";
  const [author, setAuthor] = useState(initialAuthor);

  const initialScale = 1;
  const [scale, setScale] = useState(initialScale);

  return (
    <>
      <ViewSequencesSettings
        view={view}
        setView={setView}
        author={author}
        setAuthor={setAuthor}
        scale={scale}
        setScale={setScale}
      >
        {sequence.map((pictogram) => (
          <PictogramCard
            pictogram={pictogram}
            view={"complete"}
            variant="plane"
            size={{
              pictSize: view.sizePict,
              scale: scale,
            }}
            key={`${pictogram.indexSequence}_${pictogram.img.selectedId}`}
          />
        ))}
      </ViewSequencesSettings>
      <CopyRight author={author} />
    </>
  );
};

export default ViewSequencePage;
