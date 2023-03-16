import { useState, useEffect, useContext } from 'react';
import Context from '../Context';

function useResizeEventListener() {
  const { toggleNavbarOpen } = useContext(Context);
  // *監聽 resize 事件，setState
  const [isShorterThan576, setIsShorterThan576] = useState(false);
  function handleResize() {
    if (window.innerWidth < 576) {
      setIsShorterThan576(true);
      toggleNavbarOpen(false);
    } else {
      setIsShorterThan576(false);
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.addEventListener('resize', handleResize);
    };
  }, []);
  return { isShorterThan576 };
}

export default useResizeEventListener;
