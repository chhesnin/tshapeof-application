import '../../style/Canvas.scss';
import { useState, useEffect, useRef } from 'react';
import Line from './Line';

function Canvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  function initalRecordMouseX() {
    const obj = {};
    for (let y = 0; y < window.innerHeight; y += 1) {
      Object.assign(obj, { [y]: 50 });
    }
    return obj;
  }
  const [recordMouseX, setRecordMouseX] = useState(initalRecordMouseX());
  // *定義 ctx 為 canvas 2d 畫布
  const canvasRef = useRef(null);
  // *? onMouseMove
  function handleMouseMove(event) {
    setMousePos({ x: event.offsetX, y: event.offsetY });
  }
  function handleMouseDown() {
    setIsMouseDown(true);
  }
  function handleMouseUp() {
    setIsMouseDown(false);
  }
  function handleMouseEnter() {
    setIsMouseEnter(true);
  }
  function handleMouseLeave() {
    setIsMouseEnter(false);
  }
  function handleRecordMouseX(mousePosY, num) {
    setRecordMouseX((prevRecordMouseX) => ({
      ...prevRecordMouseX,
      [mousePosY]: prevRecordMouseX[mousePosY] + num
    }));
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    function render() {
      // *清空背景
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // *初始化
      for (let y = 0; y < canvas.height; y += 1) {
        Line(ctx, y, mousePos, isMouseDown, recordMouseX, handleRecordMouseX);
      }
      // *單純加深Line顏色
      for (let y = 0; y < canvas.height; y += 1) {
        Line(ctx, y, mousePos, isMouseDown, recordMouseX, handleRecordMouseX);
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
  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        id="mycanvas"
        width="200"
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={isMouseEnter && 'borderLeft'}
      />
      <h6 className={isMouseEnter ? 'alert show' : 'alert'}>
        在<span style={{ color: '#C64A1D' }}>虛線與陶土之間按著滑鼠</span>能將陶土塑型喔
        <br />!
      </h6>
    </div>
  );
}

export default Canvas;
