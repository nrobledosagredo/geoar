// use-toggle-click.js
import { useState, useRef } from 'react';

export function useToggleClick(delay: number)  {
  const [isExpanded, setIsExpanded] = useState(false);
  const lastClickTime = useRef(Date.now());

  function handleToggleClick() {
    const now = Date.now();
    if (now - lastClickTime.current > delay) {
      lastClickTime.current = now;
      setIsExpanded(prevIsExpanded => !prevIsExpanded);
    }
  };

  return [isExpanded, handleToggleClick];
};