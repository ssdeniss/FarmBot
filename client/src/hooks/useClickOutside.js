import { useEffect, useRef } from 'react';

export const useClickOutside = (handler, isOpen) => {
  const domNode = useRef();

  useEffect(() => {
    const mouseHandler = (e) => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        handler(e);
      }
    };

    const keyHandler = (e) => {
      if (e.key === 'Escape') {
        handler(e);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', mouseHandler);
      document.addEventListener('keydown', keyHandler);
    }

    return () => {
      document.removeEventListener('mousedown', mouseHandler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [isOpen, handler]);

  return domNode;
};
