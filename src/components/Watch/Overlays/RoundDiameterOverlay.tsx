import { RoundDiameter } from "src/types";

interface RoundDiameterOverlayProps {
  detailedDiameter: RoundDiameter;
  imageWidth: number;
}

export const RoundDiameterOverlay = ({
  detailedDiameter,
  imageWidth,
}: RoundDiameterOverlayProps) => {
  const { diameter } = detailedDiameter;

  return (
    <div
      className="absolute  border-2 border-black flex items-center justify-center text-xl rounded-full aspect-square"
      style={{
        width: `${imageWidth * diameter * 0.0153}px`,
      }}
    >
      {`${diameter} mm`}
    </div>
  );
};
