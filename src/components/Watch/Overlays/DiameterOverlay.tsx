import { RectangularDiameterOverlay } from "src/components/Watch/Overlays/RectangularDiameterOverlay";
import { RoundDiameterOverlay } from "src/components/Watch/Overlays/RoundDiameterOverlay";
import { DetailedDiameter, DiameterType } from "src/types";

interface DiameterOverlayProps {
  detailedDiameter: DetailedDiameter;
}

export const DiameterOverlay = ({ detailedDiameter }: DiameterOverlayProps) => {
  const { type } = detailedDiameter;

  return type === DiameterType.Round ? (
    <RoundDiameterOverlay detailedDiameter={detailedDiameter} />
  ) : (
    <RectangularDiameterOverlay detailedDiameter={detailedDiameter} />
  );
};
