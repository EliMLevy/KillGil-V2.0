const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

canvas.setAttribute('margin', 'auto')

canvas.width = 1000//window.innerWidth;
canvas.height = 600//window.innerHeight;

const width = canvas.width;
const height = canvas.height;

const scl = width / 10;

var socket = io();

let mapKey = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 2, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

]


let p = new Player(width / 2, height / 2, scl);
let globalBullets = new Map();

let xOff = scl * 3;
let yOff = scl;

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
    player.health = data.h;
})

socket.on('shot-fired', (data) => {
    globalBullets.set(data.bulletId, new Bullet(data.x, data.y, data.vx, data.vy, scl, data.id));
})

socket.on('shot-landed', (data) => {
    // console.log("player hit by bullet: " + globalBullets.get(data.bulletId))
    globalBullets.delete(data.bulletId);
    p.gun.bullets.delete(data.bulletId);

})

socket.on('death', (data) => {
    // console.log("player hit by bullet: " + globalBullets.get(data.bulletId))
    let player = otherPlayers.get(data.id);
    player.relativePos.x = 0;
    player.relativePos.y = 0;

})

socket.on('new-kill', (data) => {
    // console.log("player hit by bullet: " + globalBullets.get(data.bulletId))
    if (otherPlayers.get(data.shooter)) {
        otherPlayers.get(data.shooter).score++;
    } else {
        p.score++;
    }
})

var mouseX = undefined;
var mouseY = undefined;

document.addEventListener('mousemove', (event) => {
    mouseX = event.x - window.innerWidth/4;
    mouseY = event.y - window.innerHeight/4;
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

    for (let i = 0; i < mapKey.length; i++) {
        const row = mapKey[i];
        for (let j = 0; j < row.length; j++) {
            const element = row[j];
            if (element == 1) {
                ctx.fillStyle = "black";
            } else if(element == 2) {
                ctx.fillStyle = 'rgb(0,255,0)';
            } else if(element == 0) {
                ctx.fillStyle = 'rgb(199,199,199)';
            }
            ctx.fillRect(j * scl + xOff, i * scl + yOff, scl, scl);
        }
    }

    p.display(ctx, 0, 0);
    p.update(socket);

    otherPlayers.forEach((key, value) => {
        key.display(ctx, xOff, yOff);
    })

    p.gun.bullets.forEach((key, value) => {
        let b = key;
        b.display(ctx, xOff, yOff);
        b.update();

        //Check for bllet collisions
        if (mapKey[Math.floor(b.pos.y / scl)][Math.floor(b.pos.x / scl)] > 0) {
            p.gun.bullets.delete(value);

        }

    })



    globalBullets.forEach((key, value) => {
        let b = key;
        b.display(ctx, xOff, yOff);
        b.update(socket);


        //Check for bllet collisions
        if (mapKey[Math.floor(b.pos.y / scl)][Math.floor(b.pos.x / scl)] > 0) {
            globalBullets.delete(value);

        }

        if (Math.pow(b.pos.x - p.relativePos.x, 2) + Math.pow(b.pos.y - p.relativePos.y, 2) < Math.pow(scl / 5, 2)) {
            socket.emit("shot-landed", { bulletId: value });
            globalBullets.delete(value);
            p.health -= 5;

            if (p.health <= 0) {
                // p.pos.x = width /2;
                // p.pos.y = height/2;
                p.relativePos.x =  width / 2 //- scl * 3;
                p.relativePos.y = height / 2;
                p.health = 100;
                xOff = 0;
                yOff = 0;

                socket.emit('death', { shooter: b.shooter });
            }
        }
    })




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
        a: p.angle,
        h: p.health
    }

    socket.emit('movement', data);


    requestAnimationFrame(animate);
}


animate();