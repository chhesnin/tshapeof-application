import '../style/Pottery.scss';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Pottery() {
  const initialSelections = {
    shape: 'plate',
    color: 'white'
  };
  const [selections, setSelections] = useState(initialSelections);
  // const [imgData, setImgData] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [isShowFinalImg, setIsShowFinalImg] = useState(false);
  const [temp, setTemp] = useState(0);
  const [runTime, setRunTime] = useState(1e-30);
  const redMaskRef = useRef(null);
  const shapeImgRef = useRef(null);
  const colorImgRef = useRef(null);
  const tempTextRef = useRef(null);
  const finalImgRef = useRef(null);
  function handleChange(event) {
    const { name, value } = event.target;
    setSelections((prevSelections) => ({
      ...prevSelections,
      [name]: value
    }));
  }
  function handleStart() {
    setIsFinish(false);
    setIsStart(true);
  }
  // *將檔案上傳Github, 運用fetch串接
  // useEffect(() => {
  //   fetch(
  //     'https://raw.githubusercontent.com/chhesnin/tshapeof-application-pottery/main/pottery.json'
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setImgData(data);
  //       const initialColorImgUrl = data.find(
  //         (img) => img.shape === selections.shape && img.color === selections.color
  //       ).colorUrl;
  //       const colorImgDom = colorImgRef.current;
  //       colorImgDom.style.backgroundImage = `url(${initialColorImgUrl})`;
  //     });
  // }, []);
  // *監看 shape
  // *可以監看精準的變數
  useEffect(() => {
    const shapeImgDom = shapeImgRef.current;
    shapeImgDom.className = `shape-img-container ${selections.shape}`;
  }, [selections.shape]);
  // *監看 color
  useEffect(() => {
    const colorImgDom = colorImgRef.current;
    // *透過 JS 更新 DOM 的 className
    colorImgDom.className = `color-img-container ${selections.shape} ${selections.color}`;
  }, [selections.shape, selections.color]);
  useEffect(() => {
    if (isStart && temp < 1200) {
      // *控制溫度上升
      setTimeout(() => {
        setTemp((prevTemp) => prevTemp + 1);
      }, runTime);
      // *控制溫度上升速度漸慢
      setTimeout(() => {
        setRunTime((prevRunTime) => prevRunTime * 1.0645);
      }, 1);
    } else if (temp === 1200) {
      setIsShowFinalImg(true);
      setTimeout(() => {
        setIsStart(false);
        setIsFinish(true);
        setTemp(0);
      }, 1200);
    }
  }, [isStart, temp]);
  useEffect(() => {
    if (isStart) {
      const redMaskDom = redMaskRef.current;
      const tempTextDom = tempTextRef.current;
      gsap.to(redMaskDom, {
        duration: 8,
        backgroundColor: '#C64A1D',
        ease: 'power2.out'
      });
      if (tempTextDom) {
        gsap.to(tempTextDom, {
          duration: 8,
          color: '#E9EAE3',
          ease: 'power2.out'
        });
      }
    }
  }, [isStart]);
  useEffect(() => {
    if (isFinish) {
      const redMaskDom = redMaskRef.current;
      gsap.to(redMaskDom, {
        duration: 4,
        backgroundColor: 'transparent',
        ease: 'power2.out'
      });
    }
  }, [isFinish]);
  useEffect(() => {
    const finalImgDom = finalImgRef.current;
    if (isShowFinalImg) {
      finalImgDom.className = isShowFinalImg
        ? `final ${selections.shape} ${selections.color}`
        : `final`;
    }
  }, [isShowFinalImg]);
  return (
    <main className="pottery">
      <section className="intro">
        <div className="container">
          <h1 className="title">
            認識陶器
            <span className="subtitle">| Pottery</span>
          </h1>
          <p>世世上有各式各樣的材質，但只有土是唯一可以用手塑造成形。</p>
          <p>創作者就隱藏在器皿表面的顏色和形狀之下。</p>
        </div>
        <div className="img-container" />
      </section>
      <section className="shape">
        <div className="container">
          <h3 className="head">1. 練土</h3>
          <p>練土是陶藝很重要的一個動作，主要是要讓空氣排出，讓陶土的質地更均勻、乾濕軟硬適中。</p>
          <p>謝工作室以菊練為主。</p>
          <h3 className="head">2. 塑形</h3>
          <p>
            捏陶與拉胚最常見，將陶土塑出一個形狀，它可以是盤子、碗、杯子等。此時的胚體特別脆弱，最容易受到損壞，放置在陰涼透氣處陰乾之後形成素胚，可以做陶刻或是題字等。
          </p>
          <div className="grid">
            <div className="options">
              <label htmlFor="plate">
                <input
                  id="plate"
                  type="radio"
                  name="shape"
                  value="plate"
                  onChange={handleChange}
                  checked={selections.shape === 'plate'}
                />
                盤
              </label>
              <label htmlFor="bowl">
                <input
                  id="bowl"
                  type="radio"
                  name="shape"
                  value="bowl"
                  onChange={handleChange}
                  checked={selections.shape === 'bowl'}
                />
                碗
              </label>
              <label htmlFor="cup">
                <input
                  id="cup"
                  type="radio"
                  name="shape"
                  value="cup"
                  onChange={handleChange}
                  checked={selections.shape === 'cup'}
                />
                杯
              </label>
            </div>
            <div ref={shapeImgRef} className="shape-img-container" />
          </div>
        </div>
      </section>
      <section className="color">
        <div className="container">
          <h3 className="head">3. 素燒</h3>
          <p>
            素燒是讓素胚經過700~1000°C不等的燒窯，讓胚體產生瓷化作用，可以長久保存，經過素燒之後的胚體毛細孔會張大，有利於之後的上釉。
          </p>
          <h3 className="head">4. 上釉</h3>
          <p>
            釉料的開發與與調配，是陶藝家一生追求不完的課題。不同的釉色會有不同的效果和變化，不管是色澤、飽和感、潤澤及觸感等。讓釉料附著在胚體上叫做上釉。
          </p>
          <div className="grid">
            <div
              ref={colorImgRef}
              className="color-img-container"
              // style={{ backgroundImage: `url(${colorImgUrl})` }}
            />
            <div className="options">
              <label htmlFor="white">
                <input
                  id="white"
                  className="white"
                  type="radio"
                  name="color"
                  value="white"
                  onChange={handleChange}
                  checked={selections.color === 'white'}
                />
                132白
              </label>
              <label htmlFor="red">
                <input
                  id="red"
                  className="red"
                  type="radio"
                  name="color"
                  value="red"
                  onChange={handleChange}
                  checked={selections.color === 'red'}
                />
                518紅
              </label>
              <label htmlFor="green">
                <input
                  id="green"
                  className="green"
                  type="radio"
                  name="color"
                  value="green"
                  onChange={handleChange}
                  checked={selections.color === 'green'}
                />
                222綠
              </label>
            </div>
          </div>
        </div>
      </section>
      <section ref={finalImgRef} className="final">
        {!isFinish && (
          <div className="container">
            <h3 className="head">5. 釉燒</h3>
            <p>
              第二次的燒窯叫做釉燒，一般燒到1200°C以上，胚體經過高溫燒製後與釉料結合，質地會更完整。
            </p>
            <div className="color-img-container" />
            {isStart ? (
              <h1 ref={tempTextRef} className="temp">
                {temp}°C
              </h1>
            ) : (
              <button className="start" type="button" onClick={handleStart}>
                開始
              </button>
            )}
          </div>
        )}
        <div ref={redMaskRef} className="redMask" />
      </section>
    </main>
  );
}

export default Pottery;
