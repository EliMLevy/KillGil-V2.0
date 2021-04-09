const rooms = [
    [16, 15, 14, 13, 12],
    [17, 7, 2, 6, 11],
    [18, 3, 0, 1, 10],
    [19, 8, 4, 5, 9],
    [20, 21, 22, 23, 24],
]

var room0 = function (ctx) {
    ctx.fillStyle = 'rgb(199,199,199)'
    ctx.fillRect(0, 0, width, height);

    wallThickness = scl * 0.7;

    ctx.fillStyle = 'black';
    ctx.font = scl/3 + "px Arial";
    ctx.fillText("Room #" + rooms[currentRoom.y][currentRoom.x], wallThickness / 2, wallThickness/2);

    ctx.fillStyle = 'rgb(199,199,199)'
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(wallThickness, wallThickness);

    ctx.moveTo(width, 0);
    ctx.lineTo(width - wallThickness, wallThickness);

    ctx.moveTo(width, height);
    ctx.lineTo(width - wallThickness, height - wallThickness);

    ctx.moveTo(0, height);
    ctx.lineTo(wallThickness, height - wallThickness);
    ctx.lineWidth = 3;
    ctx.stroke();

    quad(ctx,
        width - wallThickness, height - wallThickness,
        width - wallThickness, wallThickness,
        wallThickness, wallThickness,
        wallThickness, height - wallThickness);

    ctx.fillStyle = 'black'
    quad(ctx, -1, height / 2 - scl / 2, -1, height / 2 + scl / 2, wallThickness - 2, height / 2 + scl / 3, wallThickness - 2, height / 2 - scl / 3);
    quad(ctx, width, height / 2 - scl / 2, width, height / 2 + scl / 2, width - wallThickness + 2, height / 2 + scl / 3, width - wallThickness + 2, height / 2 - scl / 3);
    quad(ctx, width/2 - scl/2, 0, width/2 + scl / 2, 0, width/2 + scl/3, wallThickness - 2, width/2 - scl/3, wallThickness - 2);
    quad(ctx, width/2 - scl/2, height, width/2 + scl / 2, height, width/2 + scl/3, height - wallThickness + 2, width/2 - scl/3, height - wallThickness + 2);

}


let roomFuncs = [room0]

function drawRoom(ctx, index) {
    // let roomType = rooms[index.y][index.x];
    // roomFuncs[roomType](ctx);
    // console.log(roomFuncs)


}


class Room {
    constructor() {

    }


}
