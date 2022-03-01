interface LugWidthOverlayProps {
  lugWidth: number;
  lugToLug: number;
  imageWidth: number;
}

export const LugWidthOverlay = ({
  lugWidth,
  lugToLug,
  imageWidth,
}: LugWidthOverlayProps) => {
  return (
    <div
      className="absolute border-x-2 border-black flex items-center justify-center text-xl"
      style={{
        height: `${imageWidth * lugToLug * 0.02}px`,
        width: `${imageWidth * lugWidth * 0.0153}px`,
      }}
    >
      {lugWidth} mm
    </div>
  );
};
