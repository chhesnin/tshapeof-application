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
    // const timeout = setTimeout(() => {
    //   setCurrentImgNum((prevCurrentImgNum) => (prevCurrentImgNum + 1) % 3);
    // }, 10000);
    // setTimer(timeout);
  }, [currentImgNum]);
  return (
    <main className="home">
      <div className="banner" style={{ left: `${currentImgNum * -100}%` }}>
        <div className="img-container img132" />
        <div className="img-container img222" />
        <div className="img-container img518" />
      </div>
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
