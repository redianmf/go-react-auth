import { useState } from "react";

const useToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle: () => void = () => setIsOpen(!isOpen);

  return [isOpen, handleToggle] as const;
};

export default useToggle;
