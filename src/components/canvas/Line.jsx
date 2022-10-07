function Line(ctx, y, mousePos, isMouseDown, recordMouseX, handleRecordMouseX) {
  const x = recordMouseX[y];
  // *弧線塑形效果
  for (let deltaY = 0; deltaY < 45; deltaY += 1) {
    // *將角度換算成弧度
    const radians = deltaY * 2 * (Math.PI / 180);
    // *計算應有的長度
    const length = Math.cos(Math.PI * 2 - radians);
    if (isMouseDown) {
      if (mousePos.y === y + deltaY || mousePos.y === y - deltaY) {
        if (mousePos.x < x) {
          handleRecordMouseX(y, length);
        }
        // else {
        //   handleRecordMouseX(y, -length);
        // }
      }
    }
  }
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 200, y);
  ctx.strokeStyle = '#C64A1D';
  ctx.stroke();
}

export default Line;
