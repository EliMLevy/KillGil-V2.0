class Gun {
    constructor(scl) {
        this.pos;
        this.angle;
        
        this.bullets = []; //These are the fired bullets
        this.ammoCount = 50; //Ammo avaliable
        this.reloadTime = 1000; 
        this.BPS = 5; //Cooldown between shots
        this.timer = -1; //used for fire and reload cooldown
        this.scl = scl;
    }

    display(ctx,x,y,angle) { //Displaying the gun relative to the player that is using it
        this.pos = createVector(x,y);
        this.angle = angle;

        //Displaying all fired bullets
        for(let i = 0; i < this.bullets.length; i++) {
            let b = this.bullets[i];
            b.display(ctx);
        }   
        
        ctx.save(); //Push the matrix
        
        ctx.fillStyle =  'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;

        ctx.translate(this.pos.x,this.pos.y);
        ctx.rotate(this.angle);
        
        //Gun body
        ctx.fillRect(0,0,this.scl * 0.8, this.scl * 0.2);
        ctx.strokeRect(0,0,this.scl * 0.8, this.scl * 0.2);
        //Gun end
        ctx.fillRect(this.scl * 0.8, this.scl * 0.05, this.scl * 0.1, this.scl * 0.1);
        ctx.strokeRect(this.scl * 0.8, this.scl * 0.05, this.scl * 0.1, this.scl * 0.1);
        
        ctx.restore(); //Pop matrix


    }

    update() {
        for(let i = this.bullets.length - 1; i >= 0; i--) {
            let b = this.bullets[i];
            b.update();
        }
    }

    fire() {
        if(this.timer < 0 && this.ammoCount > 0) {
            //Location where the bullet gets initialized
            let gunEnd = createVector(this.pos.x + Math.cos(this.angle + 0.1) * this.scl ,
                                        this.pos.y + Math.sin(this.angle + 0.1) * this.scl);
            
            //Direction of the bullet
            let bulletVel = createVector(Math.cos(this.angle),Math.sin(this.angle));
            bulletVel.normalize();
            bulletVel.mult(10);
            //TODO incoporate the velocity of the player into the velocity of the bullets

            this.bullets.push(new Bullet(this.scl,gunEnd.x,gunEnd.y,bulletVel));
            this.timer = this.BPS; //Reset cooldown timer
            this.ammoCount--;
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

        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,this.scl * 0.1 , 0 , 2 * Math.PI);
        ctx.closePath();
        
        ctx.fill();
    }
    
    update() {
        this.pos.add(this.vel);
    }
}