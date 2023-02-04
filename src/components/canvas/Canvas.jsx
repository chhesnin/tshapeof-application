import '../../style/Canvas.scss';
import { useState, useEffect, useRef } from 'react';
import Line from './Line';

function Canvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  // const [isMouseEnter, setIsMouseEnter] = useState(false);
  function initalRecordLineX() {
    const obj = {};
    for (let y = 0; y < window.innerHeight; y += 1) {
      Object.assign(obj, { [y]: 50 });
    }
    return obj;
  }
  const [recordLineX, setRecordLineX] = useState(initalRecordLineX());
  // *紀錄 LineX 是否已經改變
  const [isLineXChange, setIsLineXChange] = useState(false);
  // *取得 canvas 並定義 ctx 為 canvas 2d 畫布
  const canvasRef = useRef(null);
  // *? onMouseMove + onMouseDown 無法使用
  function handleMouseMove(event) {
    setMousePos({ x: event.offsetX, y: event.offsetY });
  }
  function handleMouseDown() {
    setIsMouseDown(true);
  }
  function handleMouseUp() {
    setIsMouseDown(false);
  }
  // function handleMouseEnter() {
  //   setIsMouseEnter(true);
  // }
  // function handleMouseLeave() {
  //   setIsMouseEnter(false);
  // }
  function handleRecordLineX(mousePosY, num) {
    setRecordLineX((prevRecordLineX) => ({
      ...prevRecordLineX,
      [mousePosY]: prevRecordLineX[mousePosY] + num
    }));
  }
  function handleRestart() {
    setRecordLineX(initalRecordLineX());
    setIsLineXChange(false);
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    function render() {
      // *清空背景
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // *初始化
      for (let y = 0; y < canvas.height; y += 1) {
        Line(ctx, y, mousePos, isMouseDown, recordLineX, handleRecordLineX);
      }
      // *單純加深 Line 顏色
      for (let y = 0; y < canvas.height; y += 1) {
        Line(ctx, y, mousePos, isMouseDown, recordLineX, handleRecordLineX);
      }
    }
    render();
  }, [mousePos]);
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  useEffect(() => {
    if (isMouseDown) {
      setIsLineXChange(true);
    }
  }, [isMouseDown]);
  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        id="mycanvas"
        width="200"
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        // className={isMouseEnter && 'borderLeft'}
      />
      <h6 className="alert show">
        靠近右側的陶土<span style={{ color: '#C64A1D' }}>長按滑鼠</span>能捏出形狀喔
        <br />!
      </h6>
      {isLineXChange && (
        <button className="canvas-restart" type="button" onClick={handleRestart}>
          再玩一次
        </button>
      )}
    </div>
  );
}

export default Canvas;
