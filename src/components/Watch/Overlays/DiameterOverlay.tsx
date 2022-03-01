import { RectangularDiameterOverlay } from "src/components/Watch/Overlays/RectangularDiameterOverlay";
import { RoundDiameterOverlay } from "src/components/Watch/Overlays/RoundDiameterOverlay";
import { DetailedDiameter, DiameterType } from "src/types";

interface DiameterOverlayProps {
  detailedDiameter: DetailedDiameter;
  imageWidth: number;
}

export const DiameterOverlay = ({
  detailedDiameter,
  imageWidth,
}: DiameterOverlayProps) => {
  const { type } = detailedDiameter;

  return type === DiameterType.Round ? (
    <RoundDiameterOverlay
      detailedDiameter={detailedDiameter}
      imageWidth={imageWidth}
    />
  ) : (
    <RectangularDiameterOverlay
      detailedDiameter={detailedDiameter}
      imageWidth={imageWidth}
    />
  );
};
