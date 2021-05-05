const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

const scl = width / 10;

var socket = io();

let mapKey = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

let p = new Player(width / 2, height / 2, scl);
let globalBullets = new Map();

let xOff = 0;
let yOff = 0;

let keys = {
    w: false,
    a: false,
    s: false,
    d: false
}

document.addEventListener('keydown', (event) => {
    if (event.key == 'w') {
        keys.w = true;
    }
    if (event.key == 'a') {
        keys.a = true;
    }
    if (event.key == 's') {
        keys.s = true;
    }
    if (event.key == 'd') {
        keys.d = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key == 'w') {
        keys.w = false;
    }
    if (event.key == 'a') {
        keys.a = false;
    }
    if (event.key == 's') {
        keys.s = false;
    }
    if (event.key == 'd') {
        keys.d = false;
    }

});

let otherPlayers = new Map();

socket.on('all-players', (obj) => {
    //Message recieved when player joins
    //Client must make a new player object for each of the current players
    for (let player of obj.players) {
        otherPlayers.set(player, new Player(0, 0, scl));
    }
})

socket.on('new-player', (obj) => {
    //Message received when a new player joins
    //Client must make a new player object for him
    let id = obj.id;
    otherPlayers.set(id, new Player(0, 0, scl));
})

socket.on('player-left', (obj) => {
    //Message received when a new player joins
    //Client must make a new player object for him
    let id = obj.id;
    otherPlayers.delete(id);
    console.log(otherPlayers);
})

socket.on('movement', (data) => {
    let id = data.id;
    let player = otherPlayers.get(id);
    player.pos.x = data.x;
    player.pos.y = data.y;
    player.angle = data.a;
})

socket.on('shot-fired', (data) => {
    globalBullets.set(data.bulletId, new Bullet(data.x, data.y, data.vx, data.vy, scl));
})

socket.on('shot-landed', (data) => {
    // console.log("player hit by bullet: " + globalBullets.get(data.bulletId))
    globalBullets.delete(data.bulletId);
    p.gun.bullets.delete(data.bulletId);

})

var mouseX = undefined;
var mouseY = undefined;

document.addEventListener('mousemove', (event) => {
    mouseX = event.x;
    mouseY = event.y;
})

document.addEventListener('mousedown', () => {
    p.shooting = true;
})

document.addEventListener('mouseup', () => {
    p.shooting = false;
})



function animate() {

    ctx.fillStyle = 'rgb(199,199,199)';
    ctx.fillRect(0, 0, width, height);
    ctx.fill();


    p.display(ctx, 0, 0);
    p.update(socket);

    otherPlayers.forEach((key, value) => {
        key.display(ctx, xOff, yOff);
    })

    p.gun.bullets.forEach((key,value) => {
        let b = key;
        b.display(ctx, xOff, yOff);
        b.update();
    
        //Check for bllet collisions
        if (mapKey[Math.floor(b.pos.y / scl)][Math.floor(b.pos.x / scl)] == 1) {
            p.gun.bullets.delete(value);
    
        }

    })
   

    
    globalBullets.forEach((key,value) => {
        let b = key;
        b.display(ctx, xOff, yOff);
        b.update(socket);


        //Check for bllet collisions
        if (mapKey[Math.floor(b.pos.y / scl)][Math.floor(b.pos.x / scl)] == 1) {
            globalBullets.delete(value);

        }

        if(Math.pow(b.pos.x - p.relativePos.x,2) + Math.pow(b.pos.y - p.relativePos.y,2) < Math.pow(scl / 5, 2)) {
            socket.emit("shot-landed", {bulletId:value});
            globalBullets.delete(value);
        }
    })



    for (let i = 0; i < mapKey.length; i++) {
        const row = mapKey[i];
        for (let j = 0; j < row.length; j++) {
            const element = row[j];
            if (element == 1) {
                ctx.fillStyle = "black";
                ctx.fillRect(j * scl + xOff, i * scl + yOff, scl, scl);
            }
        }
    }

    if (keys.w && p.canMove(mapKey, 0, -p.speed)) {
        yOff += p.speed;
        p.relativePos.y -= p.speed;
    }
    if (keys.s && p.canMove(mapKey, 0, p.speed)) {
        yOff -= p.speed;
        p.relativePos.y += p.speed;

    }
    if (keys.a && p.canMove(mapKey, -p.speed, 0)) {
        xOff += p.speed;
        p.relativePos.x -= p.speed;

    }
    if (keys.d && p.canMove(mapKey, p.speed, 0)) {
        xOff -= p.speed;
        p.relativePos.x += p.speed;
    }

    let data = {
        x: p.relativePos.x,
        y: p.relativePos.y,
        a: p.angle
    }

    socket.emit('movement', data);


    requestAnimationFrame(animate);
}


animate();