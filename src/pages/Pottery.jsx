import '../style/Pottery.scss';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import useHover from '../hooks/useHover';

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
  const [isShapeBlockHover, shapeBlockRef] = useHover();
  const [isColorBlockHover, colorBlockRef] = useHover();
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
  function handleRestart() {
    const finalImgDom = finalImgRef.current;
    finalImgDom.className = 'final';
    setIsStart(false);
    setIsFinish(false);
    setIsShowFinalImg(false);
    setTemp(0);
    setRunTime(1e-30);
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
        setIsFinish(true);
        setIsStart(false);
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
      finalImgDom.className = `final ${selections.shape} ${selections.color}`;
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
          <p>世界上有各式各樣的材質，但唯有土，可以用手塑造成形。</p>
          <p>創作者就隱藏在器皿表面的顏色和形狀之下。</p>
        </div>
        <div className="img-container" />
      </section>
      <section className="shape">
        <div className="container">
          <h3 className="head">1. 練土</h3>
          <p>練土是陶藝很重要的一個動作，主要是讓空氣排出，讓陶土的質地更均勻、乾濕軟硬適中。</p>
          <h3 className="head">2. 塑形</h3>
          <p>
            捏陶與拉胚是將陶土塑出形狀最常見的技法，可以塑出盤子、碗、杯子等。此時的胚體特別脆弱，容易受到損壞，放置在陰涼透氣處陰乾之後形成素胚，可以做陶刻或題字等。
          </p>
          <div className="grid" ref={shapeBlockRef}>
            <div className="options">
              <h6 className={isShapeBlockHover ? 'alert show shape-alert' : 'alert shape-alert'}>
                請選擇形狀&nbsp;&nbsp;
                <FontAwesomeIcon icon={faArrowDown} />
              </h6>
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
            素燒是讓素胚經過700~1000°C不等的燒窯，使胚體產生瓷化作用，可以長久保存。經過素燒之後的胚體毛細孔會張大，有利於之後的上釉。
          </p>
          <h3 className="head">4. 上釉</h3>
          <p>
            釉藥的開發與調配，是陶藝家一生追求不完的課題。不同的釉色會有不同的效果和變化，表現在色調、飽和感、潤澤及觸感上。讓釉藥附著在胚體上叫做上釉。
            <br />
            <p style={{ color: '#425D66' }}>*222綠的釉藥為粉紅色，釉燒後呈現綠色。</p>
          </p>
          <div className="grid" ref={colorBlockRef}>
            <div
              ref={colorImgRef}
              className="color-img-container"
              // style={{ backgroundImage: `url(${colorImgUrl})` }}
            />
            <div className="options">
              <h6 className={isColorBlockHover ? 'alert show color-alert' : 'alert color-alert'}>
                請選擇顏色&nbsp;&nbsp;
                <FontAwesomeIcon icon={faArrowDown} />
              </h6>
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
                518橘
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
        {isFinish ? (
          <button className="restart" type="button" onClick={handleRestart}>
            再燒
            <br />
            一次
          </button>
        ) : (
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
                <br />
                釉燒
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
