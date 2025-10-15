import { useState } from 'react';

/**
 * Custom hook for managing hover state
 * Returns hover state and event handlers for onMouseEnter and onMouseLeave
 */
export function useHover() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
}
