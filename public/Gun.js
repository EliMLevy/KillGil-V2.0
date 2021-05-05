class Gun {
    constructor(scl) {

        this.bullets = [];

        this.damage = 5;

        this.shotCooldown = 10;
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


    shoot(x,y,a) {
        // let posX = x + this.scl / 4 + this.scl / 13 + Math.cos(a) * 10;
        // let posY = y + this.scl / 100 + this.scl / 40 + Math.sin(a) * 10;
        if(this.timer <= 0) {
            let bulletPos = createVector(Math.cos(a) * scl / 1.8,Math.sin(a) * scl / 1.8);
            bulletPos.rotate(Math.PI/12);
            let posX = x + bulletPos.x;
            let posY = y + bulletPos.y;
            this.bullets.push(new Bullet(posX,posY ,Math.cos(a) * 15, Math.sin(a) * 15, this.scl));
            this.timer = this.shotCooldown;
        } 
    }

    update() {
        if(this.timer > 0) {
            this.timer--;
        }
    }
    // runBulletSystem(ctx) {
    //     for(let b of this.bullets) {
    //         b.display(ctx);
    //         b.update();
    //     }
    // }
}


class Bullet{
    constructor(x,y,vx,vy,scl) {
        this.pos = createVector(x,y);
        this.vel = createVector(vx,vy);

        this.scl = 100;
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
}