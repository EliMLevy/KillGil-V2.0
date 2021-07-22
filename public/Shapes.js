function triangle(x1,y1,x2,y2,x3,y3, ctx) {
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.lineTo(x3,y3);
  ctx.closePath();
  ctx.fill();
}