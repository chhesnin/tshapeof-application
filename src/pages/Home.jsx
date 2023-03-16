import '../style/Home.scss';
import { useState, useEffect } from 'react';
import logoTransWhite from '../assets/tshapeof-logo-trans-132-bold.png';
import useResizeEventListener from '../hooks/useResizeEventListener';

function Home() {
  const [currentImgNum, setCurrentImgNum] = useState(0);
  // *避免重複 setTimeout
  const [timer, setTimer] = useState(null);
  const { isShorterThan576 } = useResizeEventListener();
  function getPointClassName(number) {
    return currentImgNum === number ? 'point active' : 'point';
  }
  function hangleClickToggleImg(number) {
    // *先設定數字，再清除 timer
    setCurrentImgNum(number);
    clearTimeout(timer);
    setTimer(null);
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentImgNum((prevCurrentImgNum) => (prevCurrentImgNum + 1) % 3);
    }, 10000);
    setTimer(timeout);
  }, [currentImgNum]);
  const pointElements = [0, 1, 2].map((number) => (
    <div
      key={number}
      className={getPointClassName(number)}
      onClick={() => hangleClickToggleImg(number)}
      role="presentation"
    />
  ));
  return (
    <main className="home">
      <div className="banner" style={{ left: `${currentImgNum * -100}%` }}>
        <div className="img-container blue-img" />
        <div className="img-container white-img" />
        <div className="img-container red-img" />
      </div>
      {(window.innerWidth < 576 || isShorterThan576) && (
        <img className="logo" src={logoTransWhite} alt="Logo" />
      )}
      <h4 className="slogan">
        <span>實用</span>
        <span>簡單</span>
        <span>有機</span>
      </h4>
      <div className="points">{pointElements}</div>
    </main>
  );
}

export default Home;
