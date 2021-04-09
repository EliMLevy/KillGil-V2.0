function quad(ctx,x1,y1,x2,y2,x3,y3,x4,y4) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.lineTo(x4,y4);
    ctx.lineTo(x1,y1);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

}