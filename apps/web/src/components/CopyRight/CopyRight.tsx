import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import React from "react";

/**
 * Classe estable del peu de llicència.
 *
 * A la impressió el peu apareix per la regla `@media print` d'aquí mateix, però
 * la captura del PDF (html2canvas) treballa sempre en `media: screen` i mai no
 * l'aplicaria. Per això `useDownloadPdf` el fa visible al clon, i necessita un
 * ganxo que no depengui de les classes generades per emotion.
 */
export const PRINT_COPYRIGHT_CLASS = "print-copyright";

interface CopyRightProps {
  author: string;
}

const CopyRight = ({ author }: CopyRightProps): React.ReactElement => {
  return (
    <Typography
      component={"p"}
      className={PRINT_COPYRIGHT_CLASS}
      fontSize={10}
      sx={{
        display: "none",
        position: "fixed",
        bottom: 10,
        "@media print": { display: "block" },
      }}
    >
      <FormattedMessage
        id="components.copyRight"
        defaultMessage="Made with: SequenciAAC - Author of the pictograms: Sergio Palao. Origen: ARASAAC
      (http://www.arasaac.org). License: CC (BY-NC-SA)."
        description="License to use the pictograms"
      />{" "}
      {author.trim().length !== 0 && (
        <FormattedMessage
          id="components.sequenceAuthor"
          defaultMessage="Sequence author:"
          description="License to use the pictograms"
        />
      )}{" "}
      {author}
    </Typography>
  );
};

export default CopyRight;
