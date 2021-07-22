function displayBlock(type, x, y, w, h, ctx) {
  switch (type) {
    case 0: // Empty
      ctx.fillStyle = 'rgb(199,199,199)'
      ctx.fillRect(x, y, w, h)
      break;
    case 1: // Wall
      ctx.fillStyle = 'black'
      ctx.fillRect( x, y, w, h)
      break;
    case 2: // Safe zone
      ctx.fillStyle = 'rgb(0,255,0)'
      ctx.fillRect(x, y, w, h)
      ctx.font = '18px serif';
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'
      ctx.fillText('safe zone', x + w / 2, y + h / 2);
      break;
    case 3.1: // West east block
      ctx.fillStyle = 'rgb(150,150,150)'
      ctx.fillRect(x, y, w, h)
      ctx.fillStyle = 'black'
      triangle(x + w / 4, y + h / 4,
        x + w / 2, y + h / 2,
        x + w / 4, y + h / 4 * 3, ctx)
      triangle(x + w / 2, y + h / 4,
        x + w / 4 * 3, y + h / 2,
        x + w / 2,y + h / 4 * 3, ctx)
      break;
    case 3.2: // North south block
      ctx.fillStyle = 'rgb(150,150,150)'
      ctx.fillRect(x, y, w, h)
      ctx.fillStyle = 'black'
      triangle(x + w / 4, y + h / 4,
        x + w / 2, y + h / 2,
        x + w / 4 * 3, y + h / 4, ctx)
      triangle(x + w / 4, y + h / 2,
        x + w / 2, y + h / 4 * 3,
        x + w / 4 * 3,y + h / 2, ctx)
      break;
    case 3.3: // East west block
      ctx.fillStyle = 'rgb(150,150,150)'
      ctx.fillRect(x, y, w, h)
      ctx.fillStyle = 'black'
      triangle(x + w / 4 * 3, y + h / 4,
        x + w / 2, y + h / 2,
        x + w / 4 * 3, y + h / 4 * 3, ctx)
      triangle(x + w / 2, y + h / 4,
        x + w / 4, y + h / 2,
        x + w / 2 ,y + h / 4 * 3, ctx)

      break;
    case 3.4: // South north block
      ctx.fillStyle = 'rgb(150,150,150)'
      ctx.fillRect(x, y, w, h)
      ctx.fillStyle = 'black'
      triangle(x + w / 4, y + h / 4 * 3,
        x + w / 2, y + h / 2,
        x + w / 4 * 3, y + h / 4 * 3, ctx)
      triangle(x + w / 4, y + h / 2,
        x + w / 2, y + h / 4,
        x + w / 4 * 3,y + h / 2, ctx)

      break;
    case 3.5:
      ctx.fillStyle = 'rgb(199,199,199)'
      ctx.fillRect(x, y, w, h)
      ctx.font = '15px serif';
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'
      ctx.fillText('These blocks >>', x + w / 2, y + h / 4);
      ctx.fillText('only allow', x + w / 2, y + h / 4 * 2);
      ctx.fillText('motion one way', x + w / 2, y + h / 4 * 3);


      break;

    default:
      break;
  }
}