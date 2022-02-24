import { useState } from "react";

export const useDiameter = () => {
  const [isDiameterActive, setIsDiameterActive] = useState(false);

  const handleDiameterOn = () => {
    setIsDiameterActive(true);
  };

  const handleDiameterOff = () => {
    setIsDiameterActive(false);
  };

  return { isDiameterActive, handleDiameterOn, handleDiameterOff };
};

export const useLugToLug = () => {
  const [isLugToLugActive, setIsLugToLugActive] = useState(false);

  const handleLugToLugOn = () => {
    setIsLugToLugActive(true);
  };

  const handleLugToLugOff = () => {
    setIsLugToLugActive(false);
  };

  return { isLugToLugActive, handleLugToLugOn, handleLugToLugOff };
};

export const useLugWidth = () => {
  const [isLugWidthActive, setIsLugWidthActive] = useState(false);

  const handleLugWidthOn = () => {
    setIsLugWidthActive(true);
  };

  const handleLugWidthOff = () => {
    setIsLugWidthActive(false);
  };

  return { isLugWidthActive, handleLugWidthOn, handleLugWidthOff };
};
