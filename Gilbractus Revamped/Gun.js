class Gun {
    constructor(scl) {
        this.pos;
        this.angle;
        
        
        this.ammoCount = 50;
        this.bullets = [];
        this.reloadTime = 1000;
        this.BPS = 5;
        this.scl = scl;
        this.timer = -1;
    }

    display(ctx,x,y,angle) {
        this.pos = createVector(x,y);
        this.angle = angle;

        for(let i = 0; i < this.bullets.length; i++) {
            let b = this.bullets[i];
            b.display(ctx);
        }
        
        ctx.save();
        
        ctx.fillStyle =  'white' //'rgb(100,100,100)';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.translate(this.pos.x,this.pos.y);
        ctx.rotate(this.angle);
        
        ctx.fillRect(0,0,this.scl * 0.8, this.scl * 0.2);
        ctx.strokeRect(0,0,this.scl * 0.8, this.scl * 0.2);
        ctx.fillRect(this.scl * 0.8, this.scl * 0.05, this.scl * 0.1, this.scl * 0.1);
        ctx.strokeRect(this.scl * 0.8, this.scl * 0.05, this.scl * 0.1, this.scl * 0.1);
        
        ctx.restore();


    }

    update() {
        for(let i = this.bullets.length - 1; i >= 0; i--) {
            let b = this.bullets[i];
            b.update();
        }
    }

    fire() {
        if(this.timer < 0 && this.ammoCount > 0) {
            let gunEnd = createVector(this.pos.x + Math.cos(this.angle + 0.1) * this.scl ,
                                        this.pos.y + Math.sin(this.angle + 0.1) * this.scl);
            
            let bulletVel = createVector(Math.cos(this.angle),Math.sin(this.angle));
            bulletVel.normalize();
            bulletVel.mult(10);
            //TODO incoporate the velocity of the player into the velocity of the bullets

            this.bullets.push(new Bullet(this.scl,gunEnd.x,gunEnd.y,bulletVel));
            this.timer = this.BPS;
            this.ammoCount--;
            // console.log(this.bullets)
        }

        if(this.timer >= -1) {
            this.timer--;
        }
    }



}

class Bullet {
    constructor(scl,x,y,vel) {
        this.pos = createVector(x,y);
        this.vel = vel;
        
        this.scl = scl;
    }

    display(ctx) {
        ctx.fillStyle = 'black';
        // ctx.fillRect(this.pos.x,this.pos.y,this.scl,this.scl);
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,this.scl * 0.1 , 0 , 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
    
    update() {
        this.pos.add(this.vel);
    }
}