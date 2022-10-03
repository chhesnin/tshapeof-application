import { useState, useEffect, useRef } from 'react';

function useHover() {
  const [isHover, setIsHover] = useState(false);
  const ref = useRef(null);
  function handleEnter() {
    setIsHover(true);
  }
  function handleLeave() {
    setIsHover(false);
  }
  useEffect(() => {
    const dom = ref.current;
    dom.addEventListener('mouseenter', handleEnter);
    dom.addEventListener('mouseleave', handleLeave);
    return () => {
      dom.removeEventListener('mouseenter', handleEnter);
      dom.removeEventListener('mouseleave', handleLeave);
    };
  }, []);
  return { isHover, ref };
}

export default useHover;
