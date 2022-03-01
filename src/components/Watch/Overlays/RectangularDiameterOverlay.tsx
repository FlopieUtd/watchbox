import { RectangularDiameter } from "src/types";

interface RectangularDiameterOverlayProps {
  detailedDiameter: RectangularDiameter;
  imageWidth: number;
}

export const RectangularDiameterOverlay = ({
  detailedDiameter,
  imageWidth,
}: RectangularDiameterOverlayProps) => {
  const { width, height, offsetX, offsetY } = detailedDiameter;

  return (
    <div
      className="absolute border-2 border-black flex items-center justify-center text-xl"
      style={{
        width: `${width * imageWidth * 0.0153}px`,
        height: `${height * imageWidth * 0.0153}px`,
        transform: `translate(${offsetX / 1.03}%, ${offsetY / 1.03}%)`,
      }}
    >
      {`${width} x ${height} mm`}
    </div>
  );
};
