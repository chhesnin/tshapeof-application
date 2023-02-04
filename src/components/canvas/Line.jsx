function Line(ctx, y, mousePos, isMouseDown, recordLineX, handleRecordLineX) {
  const x = recordLineX[y];
  // *弧線塑形效果
  for (let deltaY = 0; deltaY < 45; deltaY += 1) {
    // *將角度換算成弧度
    const radians = deltaY * 2 * (Math.PI / 180);
    // *計算應有的長度(成反比)
    const length = Math.cos(Math.PI * 2 - radians);
    if (isMouseDown) {
      // *滑鼠 y 位置上下產生對稱的弧線效果
      if (mousePos.y === y + deltaY || mousePos.y === y - deltaY) {
        // *限制當滑鼠 x 位置在 line 的左邊時，才能觸發，防止失控
        if (mousePos.x < x) {
          handleRecordLineX(y, length);
        }
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
