interface LugToLugOverlayProps {
  lugToLug: number;
  diameter: number;
}

export const LugToLugOverlay = ({
  lugToLug,
  diameter,
}: LugToLugOverlayProps) => {
  return (
    <div
      className="absolute border-y-2 border-black flex items-center justify-center text-xl"
      style={{
        height: `${lugToLug / 1.03}%`,
        width: `${diameter / 1.03}%`,
      }}
    >
      {lugToLug} mm
    </div>
  );
};
