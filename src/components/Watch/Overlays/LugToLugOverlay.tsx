interface LugToLugOverlayProps {
  lugToLug: number;
  diameter: number;
  imageWidth: number;
}

export const LugToLugOverlay = ({
  lugToLug,
  diameter,
  imageWidth,
}: LugToLugOverlayProps) => {
  return (
    <div
      className="absolute border-y-2 border-black flex items-center justify-center text-xl"
      style={{
        height: `${imageWidth * lugToLug * 0.0148}px`,
        width: `${imageWidth * diameter * 0.0153}px`,
      }}
    >
      {lugToLug} mm
    </div>
  );
};
