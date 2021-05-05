class Gun {
    constructor(scl) {

        this.bullets = new Map();

        this.damage = 5;

        this.shotCooldown = 5;
        this.reloadCooldown = 200;
        this.timer = 0;

        this.scl = scl;

        this.pos = {
            x:0,
            y:0
        }

        
    }

    display(ctx, x, y) {
        // ctx.fillStyle = 'white';
        ctx.fillRect(x, y, this.scl / 4, this.scl / 12);
        ctx.strokeRect(x, y, this.scl / 4, this.scl / 12);

        ctx.fillRect  (x + this.scl / 4, y + this.scl / 100, this.scl / 13, this.scl / 20);
        ctx.strokeRect(x + this.scl / 4, y + this.scl / 100, this.scl / 13, this.scl / 20);

        // this.pos.x = x + this.scl / 4 + this.scl / 13;
        // this.pos.y = y + this.scl / 100 + this.scl / 40;

        // ctx.fill();
    }


    shoot(x,y,a,socket) {
        // let posX = x + this.scl / 4 + this.scl / 13 + Math.cos(a) * 10;
        // let posY = y + this.scl / 100 + this.scl / 40 + Math.sin(a) * 10;
        if(this.timer <= 0) {
            let posX = x + Math.cos(a + Math.PI/12) * scl / 1.8;
            let posY = y + Math.sin(a + Math.PI/12) * scl / 1.8;
            let b = new Bullet(posX,posY ,Math.cos(a) * 25, Math.sin(a) * 25, this.scl)
            this.bullets.set(b.id, b);
            this.timer = this.shotCooldown;

            let data = {
                x:posX,
                y:posY,
                vx:Math.cos(a) * 25,
                vy:Math.sin(a) * 25,
                bulletId: b.id
            }
            socket.emit('shot-fired', data);
        } 

    }

    update() {
        if(this.timer > 0) {
            this.timer--;
        }
    }
}


class Bullet{
    constructor(x,y,vx,vy,scl) {
        this.pos = createVector(x,y);
        this.vel = createVector(vx,vy);

        this.scl = 100;

        this.id = this.generateID();
    }

    display(ctx, xOff, yOff) {
        // ctx.fillRect(this.pos.x + xOff,this.pos.y + yOff,100,100);
        ctx.beginPath();
        ctx.arc(this.pos.x + xOff,this.pos.y + yOff,this.scl / 20,0, 2 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = 'black';
        ctx.fill();
    }

    update() {
        this.pos.add(this.vel);
    }

    generateID() {
        let alphabet = ['a','b','c','d','e','f','g',1,2,3,4,5,6,7,8,9];
        let result = "";
        for(let i = 0; i < 10; i++) {
            result += alphabet[Math.floor(Math.random() * alphabet.length)];
        }

        return result;
    }
}