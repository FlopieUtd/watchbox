interface LugWidthOverlayProps {
  lugWidth: number;
  lugToLug: number;
}

export const LugWidthOverlay = ({
  lugWidth,
  lugToLug,
}: LugWidthOverlayProps) => {
  return (
    <div
      className="absolute border-x-2 border-black flex items-center justify-center text-xl"
      style={{
        height: `${(lugToLug * 1.4) / 1.03}%`,
        width: `${lugWidth / 1.03}%`,
      }}
    >
      {lugWidth} mm
    </div>
  );
};
