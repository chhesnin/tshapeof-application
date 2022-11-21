import '../style/Home.scss';
import { useState, useEffect } from 'react';

function Home() {
  const [currentImgNum, setCurrentImgNum] = useState(0);
  // *避免重複setTimeout
  const [timer, setTimer] = useState(null);
  function getPointClassName(number) {
    return currentImgNum === number ? 'point active' : 'point';
  }
  function hangleClickToggleImg(number) {
    clearTimeout(timer);
    setTimer(null);
    setCurrentImgNum(number);
  }
  const pointElements = [0, 1, 2].map((number) => (
    <div
      key={number}
      className={getPointClassName(number)}
      onClick={() => hangleClickToggleImg(number)}
      role="presentation"
    />
  ));
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentImgNum((prevCurrentImgNum) => (prevCurrentImgNum + 1) % 3);
    }, 10000);
    setTimer(timeout);
  }, [currentImgNum]);
  return (
    <main className="home">
      <div className="banner" style={{ left: `${currentImgNum * -100}%` }}>
        <div className="img-container blue-img" />
        <div className="img-container white-img" />
        <div className="img-container red-img" />
      </div>
      {/* <h4 className="slogan">
        <span>|</span>
        <span> </span>
        <span>實</span>
        <span>用</span>
        <span> </span>
        <span>簡</span>
        <span>單</span>
        <span> </span>
        <span>有</span>
        <span>機</span>
        <span> </span>
      </h4> */}
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
