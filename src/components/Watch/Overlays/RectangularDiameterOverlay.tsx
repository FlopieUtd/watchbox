import { RectangularDiameter } from "src/types";

interface RectangularDiameterOverlayProps {
  detailedDiameter: RectangularDiameter;
}

export const RectangularDiameterOverlay = ({
  detailedDiameter,
}: RectangularDiameterOverlayProps) => {
  const { width, height, offsetX, offsetY } = detailedDiameter;

  return (
    <div
      className="absolute border-2 border-black flex items-center justify-center text-xl"
      style={{
        width: `${width / 1.03}%`,
        height: `${height / 1.03}%`,
        transform: `translate(${offsetX / 1.03}%, ${offsetY / 1.03}%)`,
      }}
    >
      {`${width} x ${height} mm`}
    </div>
  );
};
