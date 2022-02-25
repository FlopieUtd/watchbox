import { RoundDiameter } from "src/types";

interface RoundDiameterOverlayProps {
  detailedDiameter: RoundDiameter;
}

export const RoundDiameterOverlay = ({
  detailedDiameter,
}: RoundDiameterOverlayProps) => {
  const { diameter } = detailedDiameter;

  return (
    <div
      className="absolute  border-2 border-black flex items-center justify-center text-xl rounded-full aspect-square"
      style={{
        width: `${diameter / 1.03}%`,
      }}
    >
      {`${diameter} mm`}
    </div>
  );
};
