import { useState, useEffect, useRef } from 'react';

const useScrollToBottom = () => {
  const ref = useRef(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  useEffect(() => {
    if (!shouldScrollToBottom) return;
    const node = ref.current;
    node.scrollTop = node.scrollHeight;
    setShouldScrollToBottom(false);
  }, [shouldScrollToBottom]);

  const handleContentChange = () => {
    setShouldScrollToBottom(true);
  };

  return [ref, handleContentChange];
};

export default useScrollToBottom;
